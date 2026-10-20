(function () {
  "use strict";

  const STORAGE_KEY = "_resume_public_v4";
  const LEGACY_KEY = "_resume_public_v3";
  const DEFAULT_DATA = structuredClone(window.RESUME_DATA);
  const expandedCards = new Set();
  const expandableAnimations = new WeakMap();
  let resumeData = loadData();
  let lang = loadLanguage();
  let theme = loadTheme();

  function clone(value) {
    return structuredClone(value);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeUrl(value) {
    const url = String(value ?? "").trim();
    if (url.startsWith("#") || url.startsWith("mailto:")) return url;
    try {
      const parsed = new URL(url, window.location.href);
      return ["http:", "https:"].includes(parsed.protocol) ? url : "#";
    } catch (_) {
      return "#";
    }
  }

  function text(value) {
    if (value && typeof value === "object") return value[lang] ?? value.zh ?? value.en ?? "";
    return value ?? "";
  }

  function validateData(candidate) {
    return Boolean(
      candidate &&
      Number(candidate.version) >= 4 &&
      candidate.profile &&
      Array.isArray(candidate.education) &&
      Array.isArray(candidate.research) &&
      Array.isArray(candidate.projects) &&
      (!candidate.competitions || Array.isArray(candidate.competitions)) &&
      Array.isArray(candidate.skills) &&
      candidate.awards
    );
  }

  function normalizeData(candidate) {
    const normalized = clone(candidate);
    if (!Array.isArray(normalized.competitions)) normalized.competitions = [];
    if (!Array.isArray(normalized.metrics)) normalized.metrics = clone(DEFAULT_DATA.metrics);
    normalized.metrics = normalized.metrics
      .filter((metric) => metric.id !== "orders")
      .map((metric) => {
        const fallback = DEFAULT_DATA.metrics.find((item) => item.id === metric.id);
        const scalarValue = String(metric.value ?? "");
        const value = metric.value && typeof metric.value === "object"
          ? metric.value
          : (scalarValue ? { zh: scalarValue, en: scalarValue } : clone(fallback?.value || { zh: "", en: "" }));
        const label = metric.label && typeof metric.label === "object"
          ? metric.label
          : clone(fallback?.label || { zh: String(metric.label ?? ""), en: String(metric.label ?? "") });
        return { ...metric, value, label };
      });
    return normalized;
  }

  function extractLegacyExperience(html, id) {
    const doc = new DOMParser().parseFromString(`<article>${html}</article>`, "text/html");
    const pick = (selector, fallbackZh, fallbackEn) => {
      const node = doc.querySelector(selector);
      return {
        zh: node?.dataset?.cn || node?.textContent?.trim() || fallbackZh,
        en: node?.dataset?.en || fallbackEn
      };
    };
    const description = doc.querySelector(".c-desc");
    const detailsText = {
      zh: description?.dataset?.cn
        ? new DOMParser().parseFromString(description.dataset.cn, "text/html").body.textContent.trim()
        : description?.textContent?.trim() || "请在新编辑器中补充内容。",
      en: description?.dataset?.en
        ? new DOMParser().parseFromString(description.dataset.en, "text/html").body.textContent.trim()
        : "Complete this entry in the new editor."
    };
    return {
      id,
      featured: false,
      badge: { zh: "迁移条目", en: "Migrated Entry" },
      title: pick(".c-title [data-cn], .c-title", "新条目", "New Entry"),
      role: pick(".c-sub [data-cn], .c-sub", "副标题", "Subtitle"),
      meta: pick(".c-meta [data-cn], .c-meta", "标签", "Tags"),
      status: { zh: "从旧版草稿迁移", en: "Migrated from legacy draft" },
      details: [{ label: { zh: "内容", en: "Details" }, text: detailsText }],
      links: []
    };
  }

  function migrateLegacy(base) {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return base;
    try {
      const legacy = JSON.parse(raw);
      const migrated = clone(base);
      Object.entries(legacy).forEach(([key, html]) => {
        if (typeof html !== "string") return;
        let collection = null;
        if (key.startsWith("education-")) collection = migrated.education;
        if (key.startsWith("research-")) collection = migrated.research;
        if (key.startsWith("projects-")) collection = migrated.projects;
        if (!collection) return;
        const stableId = `legacy-${key.replace(/[^a-zA-Z0-9_-]/g, "")}`;
        if (!collection.some((item) => item.id === stableId)) {
          collection.push(extractLegacyExperience(html, stableId));
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      localStorage.setItem("resume:legacy-migrated", new Date().toISOString());
      return migrated;
    } catch (_) {
      return base;
    }
  }

  function loadData() {
    if (new URLSearchParams(location.search).get("source") === "default") {
      return normalizeData(clone(DEFAULT_DATA));
    }
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (validateData(stored)) return normalizeData(stored);
    } catch (_) {
      // Invalid local drafts never prevent the public resume from loading.
    }
    return normalizeData(migrateLegacy(clone(DEFAULT_DATA)));
  }

  function loadLanguage() {
    const stored = localStorage.getItem("resume:lang") || localStorage.getItem("lang");
    return stored === "en" ? "en" : "zh";
  }

  function loadTheme() {
    const stored = localStorage.getItem("resume:theme");
    if (stored === "dark" || stored === "light") return stored;
    if (localStorage.getItem("t") === "d") return "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function externalAttrs(url) {
    return /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  function linkMarkup(link, className = "text-link") {
    const url = safeUrl(link.url);
    return `<a class="${className}" href="${escapeHtml(url)}"${externalAttrs(url)}>${escapeHtml(text(link.label))}</a>`;
  }

  function sectionHeading(id, titleZh, titleEn, introZh = "", introEn = "") {
    const intro = lang === "zh" ? introZh : introEn;
    return `
      <header class="section-heading">
        <h2 id="${id}-title">${escapeHtml(lang === "zh" ? titleZh : titleEn)}</h2>
        ${intro ? `<p>${escapeHtml(intro)}</p>` : ""}
      </header>`;
  }

  function experienceMarkup(item) {
    const isOpen = expandedCards.has(item.id);
    const detailsId = `details-${item.id}`;
    const links = (item.links || []).map((link) => linkMarkup(link)).join("");
    return `
      <article class="experience${item.featured ? " experience-featured" : ""}${isOpen ? " is-expanded" : ""}" data-card-id="${escapeHtml(item.id)}">
        <div class="experience-main">
          <div class="experience-copy">
            <p class="experience-badge">${escapeHtml(text(item.badge))}</p>
            <h3>${escapeHtml(text(item.title))}</h3>
            <p class="experience-role">${escapeHtml(text(item.role))}</p>
            <p class="experience-meta">${escapeHtml(text(item.meta))}</p>
          </div>
          <div class="experience-actions">
            <span class="status-label">${escapeHtml(text(item.status))}</span>
            <button class="expand-button" type="button" data-toggle-card="${escapeHtml(item.id)}" aria-expanded="${isOpen}" aria-controls="${detailsId}">
              <span>${isOpen ? (lang === "zh" ? "收起" : "Collapse") : (lang === "zh" ? "展开" : "Details")}</span>
              <span aria-hidden="true">${isOpen ? "−" : "+"}</span>
            </button>
          </div>
        </div>
        <div class="experience-detail" id="${detailsId}"${isOpen ? "" : " hidden"}>
          <dl>
            ${(item.details || []).map((detail) => `
              <div>
                <dt>${escapeHtml(text(detail.label))}</dt>
                <dd>${escapeHtml(text(detail.text))}</dd>
              </div>`).join("")}
          </dl>
          ${links ? `<div class="experience-links">${links}</div>` : ""}
        </div>
      </article>`;
  }

  function metricsMarkup() {
    return `
      <section class="evidence-strip" aria-label="${lang === "zh" ? "关键数据" : "Key evidence"}">
        ${resumeData.metrics.map((metric) => `
          <div class="metric">
            <strong>${escapeHtml(text(metric.value))}</strong>
            <span>${escapeHtml(text(metric.label))}</span>
          </div>`).join("")}
      </section>`;
  }

  function competitionsMarkup() {
    if (!resumeData.competitions.length) return "";
    return `
      <section class="section" id="competitions" aria-labelledby="competitions-title">
        ${sectionHeading("competitions", "竞赛成果", "Competitions", "只呈现本人角色、实际工作与可核验结果。", "Only verifiable roles, work, and outcomes are shown.")}
        <div class="experience-list">${resumeData.competitions.map(experienceMarkup).join("")}</div>
      </section>`;
  }

  function learningMarkup() {
    const learning = resumeData.learning;
    const hasUrl = Boolean(String(learning.url || "").trim());
    const action = hasUrl
      ? `<a class="button button-primary" href="${escapeHtml(safeUrl(learning.url))}" target="_blank" rel="noopener noreferrer">${lang === "zh" ? "阅读公开精选版" : "Read the curated edition"}</a>`
      : `<span class="button button-disabled" aria-disabled="true">${lang === "zh" ? "精选版待发布" : "Curated edition pending"}</span>`;
    return `
      <section class="section learning-section" id="learning" aria-labelledby="learning-title">
        ${sectionHeading("learning", "学习成果", "Learning", "持续学习本身不是技能证明，能复述、能运行、能校对的产出才是。", "Learning becomes evidence when it can be explained, run, and reviewed.")}
        <div class="learning-layout">
          <div class="learning-copy">
            <p class="learning-status">${escapeHtml(text(learning.status))}</p>
            <h3>${escapeHtml(text(learning.title))}</h3>
            <p>${escapeHtml(text(learning.summary))}</p>
            ${action}
          </div>
          <ul class="topic-grid" aria-label="${lang === "zh" ? "笔记主题" : "Note topics"}">
            ${learning.topics.map((topic) => `<li>${escapeHtml(text(topic))}</li>`).join("")}
          </ul>
        </div>
      </section>`;
  }

  function skillsMarkup() {
    return `
      <section class="section" id="skills" aria-labelledby="skills-title">
        ${sectionHeading("skills", "能力与工具", "Skills and Tools")}
        <div class="skills-grid">
          ${resumeData.skills.map((skill) => `
            <article class="skill-item">
              <h3>${escapeHtml(text(skill.label))}</h3>
              <p>${escapeHtml(text(skill.text))}</p>
            </article>`).join("")}
        </div>
      </section>`;
  }

  function awardsMarkup() {
    return `
      <section class="section awards-section" id="awards" aria-labelledby="awards-title">
        ${sectionHeading("awards", "荣誉与活动", "Awards and Activities")}
        <button class="awards-toggle" id="awards-toggle" type="button" aria-expanded="false" aria-controls="awards-content">
          <span>${lang === "zh" ? "查看精选荣誉与学生工作" : "View selected awards and activities"}</span>
          <span aria-hidden="true">+</span>
        </button>
        <div class="awards-content" id="awards-content" hidden>
          <div>
            <h3>${lang === "zh" ? "专业相关" : "Academic and Technical"}</h3>
            <ul>${resumeData.awards.technical.map((item) => `<li>${escapeHtml(text(item.text))}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>${lang === "zh" ? "学生工作与活动" : "Leadership and Activities"}</h3>
            <ul>${resumeData.awards.activities.map((item) => `<li>${escapeHtml(text(item.text))}</li>`).join("")}</ul>
          </div>
        </div>
      </section>`;
  }

  function render() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.theme = theme;
    document.title = `${text(resumeData.profile.name)} | Resume`;
    const skipLink = document.querySelector(".skip-link");
    if (skipLink) skipLink.textContent = lang === "zh" ? "跳到主要内容" : "Skip to main content";
    const pageTools = document.querySelector(".page-tools");
    if (pageTools) pageTools.setAttribute("aria-label", lang === "zh" ? "页面工具" : "Page tools");
    const languageControl = document.querySelector(".language-control");
    if (languageControl) {
      languageControl.setAttribute("aria-label", lang === "zh" ? "语言" : "Language");
      languageControl.dataset.activeLang = lang;
    }
    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
    });
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      const label = lang === "zh" ? "切换明暗主题" : "Toggle color theme";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.title = label;
    }
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀" : "◐";
      themeIcon.dataset.theme = theme;
    }

    const profile = resumeData.profile;
    const main = document.getElementById("main-content");
    main.innerHTML = `
      <div class="site-shell">
        <header class="hero" id="top">
          <div class="hero-photo-wrap">
            <img class="hero-photo" src="${escapeHtml(safeUrl(profile.photo))}" alt="${escapeHtml(lang === "zh" ? `${text(profile.name)}的证件照` : `Portrait of ${text(profile.name)}`)}" width="280" height="392">
          </div>
          <div class="hero-content">
            <p class="hero-stage">${escapeHtml(text(profile.stage))}</p>
            <h1>${escapeHtml(text(profile.name))}</h1>
            <p class="hero-academic">${escapeHtml(text(profile.academicLine))}</p>
            <p class="hero-positioning">${escapeHtml(text(profile.positioning))}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="mailto:${escapeHtml(profile.email)}">${lang === "zh" ? "邮件联系" : "Email"}</a>
              <a class="button" href="${escapeHtml(safeUrl(profile.github))}" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a class="button" href="${escapeHtml(safeUrl(profile.studyRoom))}" target="_blank" rel="noopener noreferrer">Study Room</a>
            </div>
            <div class="download-links" aria-label="${lang === "zh" ? "打印简历" : "Printable resumes"}">
              <a href="downloads/resume-zh-1page.pdf" download>${lang === "zh" ? "中文一页 PDF" : "Chinese 1-page PDF"}</a>
              <a href="downloads/resume-zh-2page.pdf" download>${lang === "zh" ? "中文两页 PDF" : "Chinese 2-page PDF"}</a>
              <a href="downloads/resume-en-2page.pdf" download>${lang === "zh" ? "英文两页 PDF" : "English 2-page PDF"}</a>
            </div>
          </div>
        </header>

        ${metricsMarkup()}

        <nav class="section-nav" aria-label="${lang === "zh" ? "简历目录" : "Resume sections"}">
          <a href="#research">${lang === "zh" ? "科研" : "Research"}</a>
          <a href="#projects">${lang === "zh" ? "工程" : "Engineering"}</a>
          ${resumeData.competitions.length ? `<a href="#competitions">${lang === "zh" ? "竞赛" : "Competitions"}</a>` : ""}
          <a href="#learning">${lang === "zh" ? "学习" : "Learning"}</a>
          <a href="#skills">${lang === "zh" ? "技能" : "Skills"}</a>
          <a href="#awards">${lang === "zh" ? "荣誉" : "Awards"}</a>
        </nav>

        <section class="section about-section" id="about" aria-labelledby="about-title">
          ${sectionHeading("about", "个人概况", "Profile")}
          <div class="about-layout">
            <p>${escapeHtml(text(resumeData.about))}</p>
            <div class="education-list">${resumeData.education.map(experienceMarkup).join("")}</div>
          </div>
        </section>

        <section class="section" id="research" aria-labelledby="research-title">
          ${sectionHeading("research", "科研经历", "Research", "重点展示可验证的研究训练、独立实验与领域资源建设。", "Verifiable research training, independent work, and field-resource building.")}
          <div class="experience-list">${resumeData.research.map(experienceMarkup).join("")}</div>
        </section>

        <section class="section" id="projects" aria-labelledby="projects-title">
          ${sectionHeading("projects", "工程项目", "Engineering Projects", "把模型理解落实到自主导航、嵌入式控制与完整产品交付。", "Turning model understanding into autonomous navigation, embedded control, and product delivery.")}
          <div class="experience-list">${resumeData.projects.map(experienceMarkup).join("")}</div>
        </section>

        ${competitionsMarkup()}
        ${learningMarkup()}
        ${skillsMarkup()}
        ${awardsMarkup()}

        <footer class="site-footer">
          <div>
            <strong>${escapeHtml(text(profile.name))}</strong>
            <span>${escapeHtml(text(profile.direction))}</span>
          </div>
          <div>
            <a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>
            <span>${lang === "zh" ? "更新于" : "Updated"} ${escapeHtml(resumeData.updated)}</span>
          </div>
        </footer>
      </div>`;
  }

  function withPageTransition(update) {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && document.startViewTransition) {
      document.startViewTransition(update);
      return;
    }
    update();
    if (reduceMotion) return;
    document.getElementById("main-content")?.animate([
      { opacity: 0.72, transform: "translateY(5px) scale(0.997)", filter: "blur(1.5px)" },
      { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" }
    ], {
      duration: 360,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)"
    });
  }

  function setLanguage(next) {
    lang = next === "en" ? "en" : "zh";
    localStorage.setItem("resume:lang", lang);
    withPageTransition(render);
  }

  function setTheme(next) {
    theme = next === "dark" ? "dark" : "light";
    localStorage.setItem("resume:theme", theme);
    withPageTransition(render);
  }

  function setData(next) {
    if (!validateData(next)) throw new Error("Invalid resume data");
    resumeData = normalizeData(next);
    render();
  }

  function saveData(next = resumeData) {
    if (!validateData(next)) throw new Error("Invalid resume data");
    resumeData = normalizeData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    render();
  }

  function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    resumeData = clone(DEFAULT_DATA);
    render();
    return clone(resumeData);
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = filename;
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(anchor.href), 1000);
  }

  document.addEventListener("click", (event) => {
    const langButton = event.target.closest("[data-set-lang]");
    if (langButton) {
      setLanguage(langButton.dataset.setLang);
      return;
    }
    if (event.target.closest("#theme-toggle")) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }
    const toggle = event.target.closest("[data-toggle-card]");
    if (toggle) {
      const id = toggle.dataset.toggleCard;
      const shouldOpen = !expandedCards.has(id);
      shouldOpen ? expandedCards.add(id) : expandedCards.delete(id);
      updateCardState(toggle.closest(".experience"), shouldOpen);
      return;
    }
    const awardsToggle = event.target.closest("#awards-toggle");
    if (awardsToggle) {
      const content = document.getElementById("awards-content");
      const isOpen = awardsToggle.getAttribute("aria-expanded") === "true";
      awardsToggle.setAttribute("aria-expanded", String(!isOpen));
      awardsToggle.lastElementChild.textContent = isOpen ? "+" : "−";
      awardsToggle.classList.toggle("is-expanded", !isOpen);
      animateExpandable(content, !isOpen);
    }
  });

  function animateExpandable(element, isOpen) {
    if (!element) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const startHeight = element.hidden ? 0 : element.getBoundingClientRect().height;
    expandableAnimations.get(element)?.cancel();
    if (isOpen) element.hidden = false;
    const endHeight = isOpen ? element.scrollHeight : 0;

    if (reduceMotion || Math.abs(endHeight - startHeight) < 1) {
      element.hidden = !isOpen;
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      expandableAnimations.delete(element);
      return;
    }

    element.style.height = `${startHeight}px`;
    element.style.overflow = "hidden";
    const animation = element.animate([
      {
        height: `${startHeight}px`,
        opacity: isOpen ? 0.18 : 1,
        transform: isOpen ? "translateY(-8px) scale(0.995)" : "translateY(0) scale(1)"
      },
      {
        height: `${endHeight}px`,
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.996)"
      }
    ], {
      duration: isOpen ? 430 : 300,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "both"
    });
    expandableAnimations.set(element, animation);
    animation.onfinish = () => {
      if (expandableAnimations.get(element) !== animation) return;
      element.hidden = !isOpen;
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      expandableAnimations.delete(element);
      animation.cancel();
    };
  }

  function updateCardState(card, isOpen) {
    const button = card?.querySelector("[data-toggle-card]");
    const detail = card?.querySelector(".experience-detail");
    if (!button || !detail) return;
    button.setAttribute("aria-expanded", String(isOpen));
    card.classList.toggle("is-expanded", isOpen);
    animateExpandable(detail, isOpen);
    const labels = button.querySelectorAll("span");
    if (labels[0]) labels[0].textContent = isOpen
      ? (lang === "zh" ? "收起" : "Collapse")
      : (lang === "zh" ? "展开" : "Details");
    if (labels[1]) labels[1].textContent = isOpen ? "−" : "+";
  }

  document.addEventListener("pointerover", (event) => {
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    const card = event.target.closest(".experience");
    if (!card || card.contains(event.relatedTarget)) return;
    updateCardState(card, true);
  });

  document.addEventListener("pointerout", (event) => {
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    const card = event.target.closest(".experience");
    if (!card || card.contains(event.relatedTarget)) return;
    updateCardState(card, expandedCards.has(card.dataset.cardId));
  });

  window.ResumeApp = {
    storageKey: STORAGE_KEY,
    getData: () => clone(resumeData),
    getDefaultData: () => clone(DEFAULT_DATA),
    getLanguage: () => lang,
    setData,
    saveData,
    resetData,
    render,
    validateData,
    downloadFile
  };

  render();
})();
