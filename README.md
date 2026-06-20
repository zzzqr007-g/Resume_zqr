# 章权瑞 · 在线简历

这是我的个人网页版简历，用于集中展示教育背景、科研训练、工程项目、技能栈与个人作品。

在线访问：

```text
https://zzzqr007-g.github.io/Resume_zqr/
```

## 页面定位

这份简历面向科研导师、实验室、技术项目合作与综合展示场景。主线聚焦：

- AI / 具身智能 / 嵌入式系统
- PRIS Lab 科研训练
- 双向 LSTM 共享单车需求预测论文
- 蓝莓采摘机器人嵌入式控制系统
- 个人产品化前端项目 Study Room

## 本轮优化

- 重写首屏定位语，让读者快速理解方向与优势。
- 增加项目可验证入口，例如 GitHub 仓库、在线体验和项目状态说明。
- 强化精选项目视觉层级，突出科研、论文和工程主线。
- 添加个人自习室 Study Room 项目，展示完整前端产品交付能力。
- 优化中英文表达，减少直译感和冗余描述。
- 保留公开页面的纯展示体验，默认隐藏编辑入口。
- 保留打印样式，方便导出 A4 简历版本。

## 页面功能

- 中英文切换
- 明暗主题切换
- 快速目录跳转
- 卡片式经历展示
- 底部折叠式荣誉与活动区
- 隐藏编辑模式
- A4 打印适配

## 代表项目入口

- 在线简历：<https://zzzqr007-g.github.io/Resume_zqr/>
- GitHub 主页：<https://github.com/zzzqr007-g>
- Study Room 在线体验：<https://zzzqr007-g.github.io/study-room/>
- Study Room 仓库：<https://github.com/zzzqr007-g/study-room>

## 本地预览

这是一个静态页面项目，不需要构建步骤。直接打开 `index.html` 即可预览。

文件结构：

```text
.
├── index.html
├── styles_v2.css
├── styles.css
├── photo.jpg
└── README.md
```

当前页面实际引用的是 `styles_v2.css`。

## 维护说明

公开页面默认隐藏编辑按钮。需要进入编辑模式时，在页面中按：

```text
Ctrl + Alt + E
```

首次进入会设置编辑密码，之后同一浏览器会使用本地存储保存编辑内容。正式发布前建议直接修改 `index.html` 中的源内容，避免只存在于浏览器本地存储。

## 部署

本项目通过 GitHub Pages 发布。推送到 `main` 分支后，GitHub Pages 会使用仓库中的静态文件更新在线页面。

常用流程：

```bash
git add index.html styles_v2.css README.md
git commit -m "优化在线简历展示与项目入口"
git push origin main
```

