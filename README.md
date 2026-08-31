# 章权瑞 / 双语科研作品主页

面向科研导师与实验室的静态个人主页，集中展示教育背景、科研训练、工程项目、机器学习学习成果、技能与精选活动。

在线访问：<https://zzzqr007-g.github.io/Resume_zqr/>

## 主要功能

- 中英文切换、明暗主题与移动端适配；
- 桌面端悬停展开，触摸端与键盘端使用显式按钮，并支持焦点样式与减少动画偏好；
- 基于稳定 ID 和双语字段的结构化简历数据；
- 本地侧边编辑器，可修改全部原始内容并管理条目；
- 中文一页、中文两页、英文两页三种 A4 打印版本；
- 保留 `noindex`，不主动进入搜索引擎索引。

## 编辑快捷键

- 打开或关闭编辑器：`Ctrl + Alt + E`
- 浏览器打印：`Ctrl + P`

编辑器提供即时预览、保存草稿、撤销本次修改、恢复仓库默认值、导入 JSON、导出 JSON 和导出数据文件。草稿只保存在当前浏览器的 `localStorage` 中，不会自动写入 GitHub 或线上网页。

仓库默认内容维护在 `resume-data.js`。编辑器导出的 `resume-data.export.js` 可以在人工审阅后替换该文件。

## 打印入口

- 中文一页：`print.html?lang=zh&pages=1`
- 中文两页：`print.html?lang=zh&pages=2`
- 英文两页：`print.html?lang=en&pages=2`

预生成 PDF 位于 `downloads/`：

- `resume-zh-1page.pdf`
- `resume-zh-2page.pdf`
- `resume-en-2page.pdf`

打印页会优先读取浏览器中已保存的 v4 草稿，便于在本地修改后立即导出新版 PDF。

## 本地预览

这是原生 HTML、CSS 和 JavaScript 项目，不需要构建。为确保下载和浏览器存储行为一致，建议在项目目录运行静态服务器：

```powershell
python -m http.server 4173
```

然后访问 <http://localhost:4173/>。

## 文件结构

```text
.
├── index.html
├── app.js
├── editor.js
├── resume-data.js
├── styles_v2.css
├── print.html
├── print.js
├── print.css
├── downloads/
├── photo.jpg
└── README.md
```

## 隐私边界

- 机器学习 Notion 笔记在公开精选版完成前只显示“待发布”，不包含原始私有链接；
- 北邮-清华具身智能知识库只公开工作范围与统计规模；
- 蓝莓机器人奖项按项目成果表述，个人贡献与奖项归属分开；
- 仓库不存放证书、内部材料、班级号或私有 Notion 内容。

Notion 公开精选版的完整发布与验收步骤见 [`NOTION-PUBLISHING.md`](NOTION-PUBLISHING.md)。
