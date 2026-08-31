(function () {
  "use strict";

  const app = window.ResumeApp;
  const panel = document.getElementById("editor-panel");
  const backdrop = document.getElementById("editor-backdrop");
  const form = document.getElementById("editor-form");
  const tabs = document.getElementById("editor-tabs");
  const status = document.getElementById("editor-status");
  const importFile = document.getElementById("editor-import-file");

  const tabDefinitions = [
    ["profile", "基本信息"],
    ["metrics", "关键数据"],
    ["about", "个人概况"],
    ["education", "教育"],
    ["research", "科研"],
    ["projects", "项目"],
    ["competitions", "竞赛"],
    ["learning", "学习成果"],
    ["skills", "技能"],
    ["awards", "荣誉活动"]
  ];

  let activeTab = "profile";
  let draft = app.getData();
  let openSnapshot = structuredClone(draft);
  let dirty = false;
  let dragState = null;

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

  function pathParts(path) {
    return String(path).split(".").map((part) => /^\d+$/.test(part) ? Number(part) : part);
  }

  function getAtPath(object, path) {
    return pathParts(path).reduce((value, key) => value?.[key], object);
  }

  function setAtPath(object, path, value) {
    const parts = pathParts(path);
    const last = parts.pop();
    const target = parts.reduce((current, key) => current[key], object);
    target[last] = value;
  }

  function uid(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }

  function markDirty() {
    dirty = true;
    setStatus("存在未保存修改。页面预览已更新，但刷新浏览器会恢复到上一次保存的草稿。");
  }

  function preview() {
    try {
      app.setData(draft);
      markDirty();
    } catch (error) {
      setStatus(`预览失败：${error.message}`, true);
    }
  }

  function bilingualField(label, path, multiline = false) {
    const value = getAtPath(draft, path) || { zh: "", en: "" };
    const className = multiline ? "editor-textarea" : "editor-input";
    const control = (lang) => multiline
      ? `<textarea class="${className}" data-path="${escapeHtml(path)}" data-lang="${lang}">${escapeHtml(value[lang])}</textarea>`
      : `<input type="text" class="${className}" data-path="${escapeHtml(path)}" data-lang="${lang}" value="${escapeHtml(value[lang])}">`;
    return `
      <fieldset class="editor-fieldset">
        <legend>${escapeHtml(label)}</legend>
        <div class="editor-bilingual">
          <label class="editor-language-field">
            <span>中文</span>
            ${control("zh")}
          </label>
          <label class="editor-language-field">
            <span>English</span>
            ${control("en")}
          </label>
        </div>
      </fieldset>`;
  }

  function scalarField(label, path, type = "text") {
    return `
      <label class="editor-language-field">
        <span class="editor-label">${escapeHtml(label)}</span>
        <input class="editor-input" type="${escapeHtml(type)}" data-path="${escapeHtml(path)}" value="${escapeHtml(getAtPath(draft, path) ?? "")}">
      </label>`;
  }

  function itemActions(collection, index, total) {
    return `
      <div class="editor-item-actions">
        <span class="editor-drag-handle" data-drag-collection="${collection}" data-drag-index="${index}" aria-hidden="true" title="拖动排序">⋮⋮</span>
        <button type="button" class="editor-mini-button" data-action="move-up" data-collection="${collection}" data-index="${index}" ${index === 0 ? "disabled" : ""}>上移</button>
        <button type="button" class="editor-mini-button" data-action="move-down" data-collection="${collection}" data-index="${index}" ${index === total - 1 ? "disabled" : ""}>下移</button>
        <button type="button" class="editor-mini-button" data-action="duplicate" data-collection="${collection}" data-index="${index}">复制</button>
        <button type="button" class="editor-mini-button is-danger" data-action="delete" data-collection="${collection}" data-index="${index}">删除</button>
      </div>`;
  }

  function detailEditor(collection, itemIndex, detail, detailIndex) {
    const base = `${collection}.${itemIndex}.details.${detailIndex}`;
    return `
      <div class="editor-section">
        <div class="editor-item-header">
          <h3>详情 ${detailIndex + 1}</h3>
          <button type="button" class="editor-mini-button is-danger" data-action="delete-detail" data-collection="${collection}" data-index="${itemIndex}" data-subindex="${detailIndex}">删除详情</button>
        </div>
        ${bilingualField("标签", `${base}.label`)}
        ${bilingualField("内容", `${base}.text`, true)}
      </div>`;
  }

  function linkEditor(collection, itemIndex, link, linkIndex) {
    const base = `${collection}.${itemIndex}.links.${linkIndex}`;
    return `
      <div class="editor-section">
        <div class="editor-item-header">
          <h3>链接 ${linkIndex + 1}</h3>
          <button type="button" class="editor-mini-button is-danger" data-action="delete-link" data-collection="${collection}" data-index="${itemIndex}" data-subindex="${linkIndex}">删除链接</button>
        </div>
        ${bilingualField("链接文字", `${base}.label`)}
        ${scalarField("URL", `${base}.url`, "url")}
      </div>`;
  }

  function experienceEditor(collection, item, index, total) {
    const base = `${collection}.${index}`;
    return `
      <article class="editor-item" data-sort-collection="${collection}" data-sort-index="${index}">
        <header class="editor-item-header">
          <h3>${escapeHtml(item.title?.zh || `条目 ${index + 1}`)}</h3>
          ${itemActions(collection, index, total)}
        </header>
        <div class="editor-item-body">
          <label class="editor-checkbox">
            <input type="checkbox" data-path="${base}.featured" ${item.featured ? "checked" : ""}>
            作为重点条目显示
          </label>
          ${bilingualField("标签", `${base}.badge`)}
          ${bilingualField("标题", `${base}.title`)}
          ${bilingualField("身份或职责", `${base}.role`)}
          ${bilingualField("技术或数据摘要", `${base}.meta`, true)}
          ${bilingualField("状态", `${base}.status`)}
          ${(item.details || []).map((detail, detailIndex) => detailEditor(collection, index, detail, detailIndex)).join("")}
          <button type="button" class="editor-add-button" data-action="add-detail" data-collection="${collection}" data-index="${index}">添加详情</button>
          ${(item.links || []).map((link, linkIndex) => linkEditor(collection, index, link, linkIndex)).join("")}
          <button type="button" class="editor-add-button" data-action="add-link" data-collection="${collection}" data-index="${index}">添加链接</button>
        </div>
      </article>`;
  }

  function newExperience(prefix) {
    return {
      id: uid(prefix),
      featured: false,
      badge: { zh: "新条目", en: "New Entry" },
      title: { zh: "请输入标题", en: "Enter title" },
      role: { zh: "请输入职责", en: "Enter role" },
      meta: { zh: "请输入技术或数据摘要", en: "Enter technical or evidence summary" },
      status: { zh: "进行中", en: "In progress" },
      details: [
        {
          label: { zh: "目标", en: "Goal" },
          text: { zh: "请输入内容", en: "Enter details" }
        }
      ],
      links: []
    };
  }

  function profilePanel() {
    return `
      <section class="editor-section">
        ${bilingualField("姓名", "profile.name")}
        ${bilingualField("学校、专业与年级", "profile.academicLine")}
        ${bilingualField("研究方向", "profile.direction")}
        ${bilingualField("当前阶段", "profile.stage")}
        ${bilingualField("一句话定位", "profile.positioning", true)}
        ${scalarField("邮箱", "profile.email", "email")}
        ${scalarField("GitHub", "profile.github", "url")}
        ${scalarField("Study Room 在线地址", "profile.studyRoom", "url")}
        ${scalarField("Study Room 仓库", "profile.studyRoomRepo", "url")}
        ${scalarField("头像路径", "profile.photo")}
        ${scalarField("内容更新时间", "updated", "date")}
      </section>`;
  }

  function aboutPanel() {
    return `<section class="editor-section">${bilingualField("个人概况", "about", true)}</section>`;
  }

  function metricsPanel() {
    return `
      ${(draft.metrics || []).map((metric, index) => `
        <article class="editor-item" data-sort-collection="metrics" data-sort-index="${index}">
          <header class="editor-item-header">
            <h3>${escapeHtml(metric.label?.zh || `关键数据 ${index + 1}`)}</h3>
            ${itemActions("metrics", index, draft.metrics.length)}
          </header>
          <div class="editor-item-body">
            ${bilingualField("数值", `metrics.${index}.value`)}
            ${bilingualField("说明", `metrics.${index}.label`)}
          </div>
        </article>`).join("")}
      <button type="button" class="editor-add-button" data-action="add-metric">添加关键数据</button>`;
  }

  function collectionPanel(collection, addLabel) {
    const items = draft[collection] || [];
    return `
      ${items.map((item, index) => experienceEditor(collection, item, index, items.length)).join("")}
      <button type="button" class="editor-add-button" data-action="add-item" data-collection="${collection}">${escapeHtml(addLabel)}</button>`;
  }

  function learningPanel() {
    return `
      <section class="editor-section">
        ${bilingualField("标题", "learning.title")}
        ${bilingualField("摘要", "learning.summary", true)}
        ${bilingualField("状态", "learning.status")}
        ${scalarField("公开精选版 URL（留空显示待发布）", "learning.url", "url")}
      </section>
      ${(draft.learning.topics || []).map((topic, index) => `
        <article class="editor-item" data-sort-collection="learning.topics" data-sort-index="${index}">
          <header class="editor-item-header">
            <h3>主题 ${index + 1}</h3>
            ${itemActions("learning.topics", index, draft.learning.topics.length)}
          </header>
          <div class="editor-item-body">${bilingualField("主题名称", `learning.topics.${index}`)}</div>
        </article>`).join("")}
      <button type="button" class="editor-add-button" data-action="add-topic">添加主题</button>`;
  }

  function skillsPanel() {
    return `
      ${draft.skills.map((skill, index) => `
        <article class="editor-item" data-sort-collection="skills" data-sort-index="${index}">
          <header class="editor-item-header">
            <h3>${escapeHtml(skill.label?.zh || `技能 ${index + 1}`)}</h3>
            ${itemActions("skills", index, draft.skills.length)}
          </header>
          <div class="editor-item-body">
            ${bilingualField("分类", `skills.${index}.label`)}
            ${bilingualField("技能内容", `skills.${index}.text`, true)}
          </div>
        </article>`).join("")}
      <button type="button" class="editor-add-button" data-action="add-skill">添加技能分类</button>`;
  }

  function simpleListEditor(path, title) {
    const items = getAtPath(draft, path) || [];
    return `
      <section class="editor-section"><h3>${escapeHtml(title)}</h3></section>
      ${items.map((item, index) => `
        <article class="editor-item" data-sort-collection="${path}" data-sort-index="${index}">
          <header class="editor-item-header">
            <h3>${escapeHtml(item.text?.zh || `条目 ${index + 1}`)}</h3>
            ${itemActions(path, index, items.length)}
          </header>
          <div class="editor-item-body">${bilingualField("内容", `${path}.${index}.text`, true)}</div>
        </article>`).join("")}
      <button type="button" class="editor-add-button" data-action="add-simple" data-collection="${path}">添加${escapeHtml(title)}</button>`;
  }

  function awardsPanel() {
    return `${simpleListEditor("awards.technical", "专业荣誉")}${simpleListEditor("awards.activities", "学生工作与活动")}`;
  }

  function renderTabs() {
    tabs.innerHTML = tabDefinitions.map(([id, label]) => `
      <button type="button" class="editor-tab" role="tab" data-editor-tab="${id}" aria-selected="${activeTab === id}">${label}</button>`).join("");
  }

  function renderForm() {
    const panels = {
      profile: profilePanel,
      metrics: metricsPanel,
      about: aboutPanel,
      education: () => collectionPanel("education", "添加教育经历"),
      research: () => collectionPanel("research", "添加科研经历"),
      projects: () => collectionPanel("projects", "添加工程项目"),
      competitions: () => collectionPanel("competitions", "添加竞赛成果"),
      learning: learningPanel,
      skills: skillsPanel,
      awards: awardsPanel
    };
    form.innerHTML = panels[activeTab]();
  }

  function renderEditor() {
    renderTabs();
    renderForm();
  }

  function openEditor() {
    if (sessionStorage.getItem("resume:editor-confirmed") !== "1") {
      const confirmed = window.confirm("打开本地简历编辑器？修改只保存在当前浏览器，不会自动同步 GitHub。");
      if (!confirmed) return;
      sessionStorage.setItem("resume:editor-confirmed", "1");
    }
    draft = app.getData();
    openSnapshot = clone(draft);
    dirty = false;
    renderEditor();
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.classList.add("editor-open");
    setStatus("修改会即时预览，点击“保存草稿”后才会写入本地存储，不会自动同步 GitHub。");
    document.getElementById("editor-close").focus();
  }

  function closeEditor() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.classList.remove("editor-open");
  }

  function mutateCollection(path, callback) {
    const collection = getAtPath(draft, path);
    if (!Array.isArray(collection)) return;
    callback(collection);
    preview();
    renderEditor();
  }

  function handleStructureAction(button) {
    const action = button.dataset.action;
    const collectionPath = button.dataset.collection;
    const index = Number(button.dataset.index);
    const subindex = Number(button.dataset.subindex);
    if (action === "add-item") {
      mutateCollection(collectionPath, (items) => items.push(newExperience(collectionPath.slice(0, 3))));
      return;
    }
    if (action === "add-topic") {
      mutateCollection("learning.topics", (items) => items.push({ zh: "新主题", en: "New topic" }));
      return;
    }
    if (action === "add-skill") {
      mutateCollection("skills", (items) => items.push({
        id: uid("skill"),
        label: { zh: "新技能分类", en: "New skill category" },
        text: { zh: "请输入内容", en: "Enter details" }
      }));
      return;
    }
    if (action === "add-metric") {
      mutateCollection("metrics", (items) => items.push({
        id: uid("metric"),
        value: { zh: "请输入数值", en: "Enter value" },
        label: { zh: "请输入说明", en: "Enter label" }
      }));
      return;
    }
    if (action === "add-simple") {
      mutateCollection(collectionPath, (items) => items.push({
        id: uid("item"),
        text: { zh: "新条目", en: "New entry" }
      }));
      return;
    }
    if (action === "add-detail") {
      mutateCollection(`${collectionPath}.${index}.details`, (items) => items.push({
        label: { zh: "新详情", en: "New detail" },
        text: { zh: "请输入内容", en: "Enter details" }
      }));
      return;
    }
    if (action === "delete-detail") {
      mutateCollection(`${collectionPath}.${index}.details`, (items) => items.splice(subindex, 1));
      return;
    }
    if (action === "add-link") {
      mutateCollection(`${collectionPath}.${index}.links`, (items) => items.push({
        label: { zh: "新链接", en: "New link" },
        url: "https://"
      }));
      return;
    }
    if (action === "delete-link") {
      mutateCollection(`${collectionPath}.${index}.links`, (items) => items.splice(subindex, 1));
      return;
    }
    mutateCollection(collectionPath, (items) => {
      if (!items[index]) return;
      if (action === "move-up" && index > 0) [items[index - 1], items[index]] = [items[index], items[index - 1]];
      if (action === "move-down" && index < items.length - 1) [items[index + 1], items[index]] = [items[index], items[index + 1]];
      if (action === "duplicate") {
        const copy = clone(items[index]);
        copy.id = uid(copy.id?.split("-")[0] || "item");
        items.splice(index + 1, 0, copy);
      }
      if (action === "delete") items.splice(index, 1);
    });
  }

  form.addEventListener("submit", (event) => event.preventDefault());

  form.addEventListener("input", (event) => {
    const input = event.target.closest("[data-path]");
    if (!input) return;
    const path = input.dataset.path;
    if (input.type === "checkbox") {
      setAtPath(draft, path, input.checked);
    } else if (input.dataset.lang) {
      const current = getAtPath(draft, path) || { zh: "", en: "" };
      current[input.dataset.lang] = input.value;
      setAtPath(draft, path, current);
    } else {
      setAtPath(draft, path, input.value);
    }
    preview();
  });

  form.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (button) handleStructureAction(button);
  });

  form.addEventListener("pointerdown", (event) => {
    const handle = event.target.closest("[data-drag-collection]");
    if (!handle || event.button !== 0) return;
    event.preventDefault();
    dragState = {
      collection: handle.dataset.dragCollection,
      index: Number(handle.dataset.dragIndex),
      pointerId: event.pointerId,
      handle
    };
    handle.setPointerCapture?.(event.pointerId);
    handle.closest(".editor-item")?.classList.add("is-dragging");
  });

  form.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-sort-collection]");
    if (!dragState || !target || target.dataset.sortCollection !== dragState.collection) return;
    event.preventDefault();
    form.querySelectorAll(".is-drag-target").forEach((item) => item.classList.remove("is-drag-target"));
    target.classList.add("is-drag-target");
  });

  form.addEventListener("pointerup", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-sort-collection]");
    const { collection, index, handle } = dragState;
    handle.releasePointerCapture?.(event.pointerId);
    dragState = null;
    form.querySelectorAll(".is-dragging, .is-drag-target").forEach((item) => {
      item.classList.remove("is-dragging", "is-drag-target");
    });
    if (!target || target.dataset.sortCollection !== collection) return;
    const targetIndex = Number(target.dataset.sortIndex);
    mutateCollection(collection, (items) => {
      if (!items[index] || index === targetIndex) return;
      const [moved] = items.splice(index, 1);
      items.splice(targetIndex, 0, moved);
    });
  });

  form.addEventListener("pointercancel", () => {
    dragState = null;
    form.querySelectorAll(".is-dragging, .is-drag-target").forEach((item) => {
      item.classList.remove("is-dragging", "is-drag-target");
    });
  });

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-editor-tab]");
    if (!button) return;
    activeTab = button.dataset.editorTab;
    renderEditor();
    form.querySelector("input, textarea, button")?.focus();
  });

  document.getElementById("editor-save").addEventListener("click", () => {
    try {
      app.saveData(draft);
      openSnapshot = clone(draft);
      dirty = false;
      setStatus("草稿已保存到当前浏览器。线上 GitHub 页面尚未改变。");
    } catch (error) {
      setStatus(`保存失败：${error.message}`, true);
    }
  });

  document.getElementById("editor-undo").addEventListener("click", () => {
    draft = clone(openSnapshot);
    app.setData(draft);
    dirty = false;
    renderEditor();
    setStatus("已撤销本次打开编辑器后的修改。");
  });

  document.getElementById("editor-reset").addEventListener("click", () => {
    if (!window.confirm("恢复仓库默认内容？已保存的本地 v4 草稿会被清除，旧版备份仍会保留。")) return;
    draft = app.resetData();
    openSnapshot = clone(draft);
    dirty = false;
    renderEditor();
    setStatus("已恢复仓库默认内容。");
  });

  document.getElementById("editor-export-json").addEventListener("click", () => {
    app.downloadFile("resume-data-backup.json", `${JSON.stringify(draft, null, 2)}\n`, "application/json;charset=utf-8");
    setStatus("已导出 JSON 备份。");
  });

  document.getElementById("editor-export-js").addEventListener("click", () => {
    const content = `/* Exported from the local structured resume editor. */\nwindow.RESUME_DATA = ${JSON.stringify(draft, null, 2)};\n`;
    app.downloadFile("resume-data.js", content, "text/javascript;charset=utf-8");
    setStatus("已导出可替换仓库中 resume-data.js 的数据文件。");
  });

  document.getElementById("editor-import").addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", async () => {
    const file = importFile.files?.[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (!app.validateData(imported)) throw new Error("文件不是有效的 v4 简历数据");
      draft = imported;
      app.setData(draft);
      markDirty();
      renderEditor();
      setStatus("JSON 已导入并预览。确认无误后请点击“保存草稿”。");
    } catch (error) {
      setStatus(`导入失败：${error.message}`, true);
    } finally {
      importFile.value = "";
    }
  });

  document.getElementById("editor-close").addEventListener("click", closeEditor);
  backdrop.addEventListener("click", closeEditor);

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "e") {
      event.preventDefault();
      panel.classList.contains("is-open") ? closeEditor() : openEditor();
    }
    if (event.key === "Escape" && panel.classList.contains("is-open")) closeEditor();
  });

  window.ResumeEditor = { open: openEditor, close: closeEditor, isDirty: () => dirty };
})();
