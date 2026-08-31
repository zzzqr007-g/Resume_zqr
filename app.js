(function () {
  "use strict";

  const STORAGE_KEY = "_resume_public_v4";
  const LEGACY_KEY = "_resume_public_v3";
  const DEFAULT_DATA = structuredClone(window.RESUME_DATA);
  const expandedCards = new Set();
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
      Array.isArray(candidate.skills) &&
      candidate.awards
    );
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
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (validateData(stored)) return stored;
    } catch (_) {
      // Invalid local drafts never prevent the public resume from loading.
    }
    return migrateLegacy(clone(DEFAULT_DATA));
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
      <article class="experience${item.featured ? " experience-featured" : ""}" data-card-id="${escapeHtml(item.id)}">
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
            <strong>${escapeHtml(metric.value)}</strong>
            <span>${escapeHtml(text(metric.label))}</span>
          </div>`).join("")}
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
    if (languageControl) languageControl.setAttribute("aria-label", lang === "zh" ? "语言" : "Language");
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
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀" : "◐";

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
          ${sectionHeading("research", "科研经历", "Research", "重点展示可验证的研究训练、独立论文与领域资源建设。", "Verifiable research training, independent work, and field-resource building.")}
          <div class="experience-list">${resumeData.research.map(experienceMarkup).join("")}</div>
        </section>

        <section class="section" id="projects" aria-labelledby="projects-title">
          ${sectionHeading("projects", "工程项目", "Engineering Projects", "把模型理解落实到嵌入式控制、系统方案与完整产品交付。", "Turning model understanding into embedded control, systems planning, and product delivery.")}
          <div class="experience-list">${resumeData.projects.map(experienceMarkup).join("")}</div>
        </section>

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

  function setLanguage(next) {
    lang = next === "en" ? "en" : "zh";
    localStorage.setItem("resume:lang", lang);
    render();
  }

  function setTheme(next) {
    theme = next === "dark" ? "dark" : "light";
    localStorage.setItem("resume:theme", theme);
    render();
  }

  function setData(next) {
    if (!validateData(next)) throw new Error("Invalid resume data");
    resumeData = clone(next);
    render();
  }

  function saveData(next = resumeData) {
    if (!validateData(next)) throw new Error("Invalid resume data");
    resumeData = clone(next);
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
      expandedCards.has(id) ? expandedCards.delete(id) : expandedCards.add(id);
      render();
      document.querySelector(`[data-toggle-card="${CSS.escape(id)}"]`)?.focus();
      return;
    }
    const awardsToggle = event.target.closest("#awards-toggle");
    if (awardsToggle) {
      const content = document.getElementById("awards-content");
      const isOpen = awardsToggle.getAttribute("aria-expanded") === "true";
      awardsToggle.setAttribute("aria-expanded", String(!isOpen));
      awardsToggle.lastElementChild.textContent = isOpen ? "+" : "−";
      content.hidden = isOpen;
    }
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
