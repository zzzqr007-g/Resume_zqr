(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") === "en" ? "en" : "zh";
  const pages = params.get("pages") === "1" ? 1 : 2;
  const root = document.getElementById("print-root");
  let data = structuredClone(window.RESUME_DATA);

  try {
    const saved = JSON.parse(localStorage.getItem("_resume_public_v4") || "null");
    if (saved?.version === 4 && saved.profile && Array.isArray(saved.research)) data = saved;
  } catch (error) {
    console.warn("Unable to load local resume draft for printing.", error);
  }

  if (!Array.isArray(data.competitions)) data.competitions = [];

  const t = (value) => {
    if (value && typeof value === "object") return value[lang] ?? value.zh ?? value.en ?? "";
    return value ?? "";
  };
  const labelSeparator = lang === "zh" ? "：" : ": ";
  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function header(compact = false) {
    const profile = data.profile;
    return `
      <header class="resume-header${compact ? " is-compact" : ""}">
        <img class="resume-photo" src="${esc(profile.photo)}" alt="${esc(lang === "zh" ? `${t(profile.name)}的证件照` : `Portrait of ${t(profile.name)}`)}">
        <div class="identity">
          <p class="target-line">${esc(t(profile.direction))}</p>
          <h1>${esc(t(profile.name))}</h1>
          <p class="headline">${esc(t(profile.academicLine))}</p>
        </div>
        <address>
          <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
          <a href="${esc(profile.github)}">github.com/zzzqr007-g</a>
          <a href="${esc(profile.studyRoom)}">Study Room</a>
        </address>
      </header>`;
  }

  function sectionTitle(zh, en) {
    return `<h2>${lang === "zh" ? zh : en}</h2>`;
  }

  function education(compact = false) {
    const item = data.education[0];
    const details = compact ? item.details.slice(0, 3) : item.details;
    return `
      <section class="education-section">
        ${sectionTitle("教育背景", "Education")}
        <article class="entry education-entry">
          <div class="entry-heading">
            <div><h3>${esc(t(item.title))}</h3><p>${esc(t(item.role))}</p></div>
            <strong>${esc(t(item.status))}</strong>
          </div>
          <p class="entry-meta">${esc(t(item.meta))}</p>
          <ul>${details.map((detail) => `<li><b>${esc(t(detail.label))}${labelSeparator}</b>${esc(t(detail.text))}</li>`).join("")}</ul>
        </article>
      </section>`;
  }

  function entry(item, detailSelection = item.details.length, options = {}) {
    const details = Array.isArray(detailSelection)
      ? detailSelection.map((index) => item.details[index]).filter(Boolean)
      : item.details.slice(0, detailSelection);
    return `
      <article class="entry${options.compact ? " is-compact" : ""}">
        <div class="entry-heading">
          <div><h3>${esc(t(item.title))}</h3><p>${esc(t(item.role))}</p></div>
          <strong>${esc(t(item.status))}</strong>
        </div>
        ${options.hideMeta ? "" : `<p class="entry-meta">${esc(t(item.meta))}</p>`}
        <ul>${details.map((detail) => `<li><b>${esc(t(detail.label))}${labelSeparator}</b>${esc(t(detail.text))}</li>`).join("")}</ul>
      </article>`;
  }

  function skills(compact = false) {
    const selected = compact ? data.skills.slice(0, 4) : data.skills;
    return `
      <section class="skills-section">
        ${sectionTitle("能力与工具", "Skills and Tools")}
        <dl>${selected.map((skill) => `<div><dt>${esc(t(skill.label))}</dt><dd>${esc(t(skill.text))}</dd></div>`).join("")}</dl>
      </section>`;
  }

  function learning(compact = false) {
    const topics = data.learning.topics.map(t).join(lang === "zh" ? "、" : ", ");
    const summary = compact
      ? (lang === "zh"
        ? "按模型机制、公式推导、代码实践与复习自测组织学习笔记。"
        : "Mechanism-first notes with formulas, runnable practice, and review checks.")
      : t(data.learning.summary);
    return `
      <section class="learning-section">
        ${sectionTitle("机器学习学习成果", "Machine Learning Portfolio")}
        <p><b>${esc(t(data.learning.title))}${labelSeparator}</b>${esc(summary)}</p>
        <p class="support-line">${esc(topics)} / ${esc(t(data.learning.status))}</p>
      </section>`;
  }

  function highlights() {
    const items = data.awards.technical.slice(0, 2);
    return `
      <section class="highlights-section">
        ${sectionTitle("精选荣誉", "Selected Recognition")}
        <ul>${items.map((item) => `<li>${esc(t(item.text))}</li>`).join("")}</ul>
      </section>`;
  }

  function awards() {
    const items = [...data.awards.technical, data.awards.activities[1]].filter(Boolean);
    return `
      <section class="awards-section">
        ${sectionTitle("精选荣誉与活动", "Selected Awards and Activities")}
        <ul class="compact-list">${items.map((item) => `<li>${esc(t(item.text))}</li>`).join("")}</ul>
      </section>`;
  }

  function competitions() {
    if (!data.competitions.length) return "";
    return `<section>${sectionTitle("竞赛成果", "Competitions")}${data.competitions.map((item) => entry(item, item.details.length, { compact: true })).join("")}</section>`;
  }

  function page(content, number) {
    return `<article class="print-page" data-page="${number}">${content}<footer>${esc(t(data.profile.name))} / ${number} of ${pages}</footer></article>`;
  }

  function onePage() {
    const pris = data.research.find((item) => item.id === "research-pris") || data.research[0];
    const lstm = data.research.find((item) => ["research-lstm", "research-bilstm"].includes(item.id)) || data.research[1];
    const blueberry = data.projects.find((item) => item.id === "project-blueberry") || data.projects[0];
    return page(`
      ${header(true)}
      ${education(true)}
      <section class="primary-experience">
        ${sectionTitle("科研与代表项目", "Research and Selected Engineering")}
        ${entry(pris, [0], { compact: true })}
        ${entry(lstm, [0, 1, 2], { compact: true })}
        ${entry(blueberry, [1, 2, 3], { compact: true })}
      </section>
      <div class="bottom-grid">${skills(true)}${highlights()}</div>
    `, 1);
  }

  function twoPages() {
    const profileSummary = lang === "zh"
      ? t(data.about)
      : "BUPT undergraduate with a first-year weighted average of 90.85/100 (top 7%). Building research and engineering experience in embodied intelligence, time-series forecasting, and robotic systems through PRIS Lab training and independent experimentation.";
    const researchDetails = {
      "research-pris": lang === "en" ? [0, 2] : [0, 1, 2],
      "research-lstm": [0, 1, 2],
      "research-bilstm": [0, 1, 2],
      "research-knowledge-base": [0, 1]
    };
    const first = page(`
      ${header()}
      <section class="summary-section">${sectionTitle("个人概况", "Profile")}<p>${esc(profileSummary)}</p></section>
      ${education()}
      <section class="research-section">${sectionTitle("科研经历", "Research Experience")}${data.research.map((item) => entry(item, researchDetails[item.id] || item.details.length)).join("")}</section>
    `, 1);

    const projectDetails = {
      "project-blueberry": [1, 2, 3],
      "project-navigoose": [1, 2],
      "project-harmony": [0],
      "project-study-room": [0]
    };
    const second = page(`
      ${header(true)}
      <section class="projects-section">${sectionTitle("工程项目", "Engineering Projects")}${data.projects.map((item) => entry(item, projectDetails[item.id] || 1, { compact: true })).join("")}</section>
      ${competitions()}
      <div class="support-grid">${learning(true)}${skills()}</div>
      ${awards()}
    `, 2);
    return first + second;
  }

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = `${t(data.profile.name)} / ${lang === "zh" ? "中文" : "English"} ${pages}${lang === "zh" ? "页简历" : "-page Resume"}`;
  document.body.dataset.lang = lang;
  document.body.dataset.pages = String(pages);
  document.getElementById("print-description").textContent = lang === "zh"
    ? `中文 ${pages} 页简历 / A4`
    : `English ${pages}-page resume / A4`;
  root.innerHTML = pages === 1 ? onePage() : twoPages();
  document.getElementById("print-button").addEventListener("click", () => window.print());
}());
