/* Canonical, bilingual resume content. Keep this file free of private evidence. */
(function () {
  "use strict";

  window.RESUME_DATA = {
    version: 4,
    updated: "2026-10-09",
    profile: {
      name: { zh: "章权瑞", en: "Zhang Quanrui" },
      academicLine: {
        zh: "北京邮电大学 / 电信工程及管理 / 2025级本科生",
        en: "BUPT / Telecommunications Engineering with Management / Class of 2029"
      },
      direction: {
        zh: "AI / 具身智能 / 嵌入式系统",
        en: "AI / Embodied Intelligence / Embedded Systems"
      },
      stage: { zh: "2025级本科生", en: "Undergraduate, Class of 2029" },
      positioning: {
        zh: "把模型理解、科研阅读与机器人控制实践连接起来。",
        en: "Connecting model understanding, research reading, and robot control practice."
      },
      email: "zzzqr007@gmail.com",
      github: "https://github.com/zzzqr007-g",
      studyRoom: "https://zzzqr007-g.github.io/study-room/",
      studyRoomRepo: "https://github.com/zzzqr007-g/study-room",
      photo: "photo.jpg"
    },
    metrics: [
      {
        id: "average",
        value: { zh: "90.85/100", en: "90.85/100" },
        label: { zh: "大一学年保研加权", en: "First-year weighted average" }
      },
      {
        id: "rank",
        value: { zh: "前 5%", en: "Top 5%" },
        label: { zh: "专业排名", en: "Major ranking" }
      },
      {
        id: "cet4",
        value: { zh: "CET-4 / 530", en: "CET-4 / 530" },
        label: { zh: "大学英语四级", en: "College English Test" }
      }
    ],
    about: {
      zh: "北京邮电大学电信工程及管理专业 2025 级本科生。大一学年保研加权平均分 90.85/100，专业排名前 5%，大学英语四级 530 分。在 PRIS Lab 参与具身智能科研训练，独立完成 LSTM 共享单车短期需求预测实验；主要承担蓝莓采摘机器人嵌入式开发与视觉控制联调，并参与完成自主采摘仿真系统、评测与计算机应用大赛交付材料。",
      en: "Undergraduate at BUPT, Class of 2029, majoring in Telecommunications Engineering with Management. My first-year weighted average is 90.85/100, ranking in the top 5% of the major, with a CET-4 score of 530. My experience includes PRIS Lab embodied AI training, an independent LSTM bike-demand forecasting study, embedded development and vision-control integration for a blueberry-picking robot, and contributions to its autonomous picking simulation, evaluation, and competition deliverables."
    },
    education: [
      {
        id: "edu-bupt",
        featured: false,
        badge: { zh: "教育背景", en: "Education" },
        title: {
          zh: "北京邮电大学 / 电信工程及管理",
          en: "BUPT / Telecommunications Engineering with Management"
        },
        role: {
          zh: "本科在读 / 2025.09 - 2029.06（预期）",
          en: "B.Eng. Candidate / Sep 2025 - Jun 2029 (Expected)"
        },
        meta: {
          zh: "保研加权平均分 90.85/100 / 专业前 5% / 四级 530",
          en: "Weighted average 90.85/100 / Top 5% / CET-4 530"
        },
        status: { zh: "2025级本科生", en: "Class of 2029" },
        details: [
          {
            label: { zh: "成绩", en: "Academics" },
            text: {
              zh: "大一学年保研加权平均分 90.85/100，专业排名前 5%。",
              en: "First-year weighted academic average of 90.85/100, ranking in the top 5% of the major."
            }
          },
          {
            label: { zh: "课程", en: "Coursework" },
            text: {
              zh: "高等数学上（88）、高等数学下（89）、线性代数（90）、计算机导论与程序设计（91）、计算机导论与程序设计实验（99）、电子系统基础（98）。",
              en: "Advanced Mathematics I (88), Advanced Mathematics II (89), Linear Algebra (90), Introduction to Computing and Programming (91), Introduction to Computing and Programming Lab (99), and Fundamentals of Electronic Systems (98)."
            }
          },
          {
            label: { zh: "英语", en: "English" },
            text: {
              zh: "大学英语四级（CET-4）530 分。",
              en: "College English Test Band 4 (CET-4): 530."
            }
          }
        ],
        links: []
      }
    ],
    research: [
      {
        id: "research-pris",
        featured: true,
        badge: { zh: "科研训练", en: "Research Training" },
        title: {
          zh: "模式识别与智能系统实验室（PRIS Lab）",
          en: "Pattern Recognition and Intelligent Systems Lab (PRIS Lab)"
        },
        role: {
          zh: "本科生研究员 / 导师：高升教授",
          en: "Undergraduate Researcher / Advisor: Prof. Gao Sheng"
        },
        meta: {
          zh: "具身智能论文研读 / 蓝莓采摘机器人 / 系统联调",
          en: "Embodied AI reading / Blueberry-picking robot / System integration"
        },
        status: { zh: "持续进行", en: "Ongoing" },
        details: [
          {
            label: { zh: "目标", en: "Focus" },
            text: {
              zh: "围绕智能体与具身智能开展科研训练，建立从模型机制到机器人系统约束的连续理解。",
              en: "Develop a connected understanding of agents and embodied intelligence, from model mechanisms to robotic system constraints."
            }
          },
          {
            label: { zh: "工作", en: "Work" },
            text: {
              zh: "正在研读 π0.5 等视觉-语言-动作模型资料，已完成部分章节阅读与笔记整理，后续继续补充模型机制与实验设计。",
              en: "Currently studying vision-language-action models including π0.5, with partial paper reading and notes completed while continuing to examine model mechanisms and experimental design."
            }
          },
          {
            label: { zh: "产出", en: "Outcome" },
            text: {
              zh: "在实验室蓝莓采摘机器人竞赛项目中，将论文研读延伸到环境配置、串口与遥操作开发、视觉控制联调及移动底盘实机集成。",
              en: "Applied the lab training in a blueberry-picking robot competition project, covering environment setup, serial and teleoperation development, vision-control integration, and mobile-platform testing."
            }
          }
        ],
        links: [
          { label: { zh: "关联机器人项目", en: "Related robot project" }, url: "#projects" }
        ]
      },
      {
        id: "research-lstm",
        featured: true,
        badge: { zh: "独立实验研究", en: "Independent Study" },
        title: {
          zh: "基于 LSTM 的共享单车短期需求预测",
          en: "Short-term Bike-sharing Demand Forecasting with LSTM"
        },
        role: { zh: "独立完成实验、分析与报告撰写", en: "Independent Experiment, Analysis, and Report" },
        meta: {
          zh: "Python / LSTM / 24 小时输入 / 未来 8 小时预测",
          en: "Python / LSTM / 24-hour input / 8-hour forecast"
        },
        status: { zh: "实验报告已完成", en: "Experimental report completed" },
        details: [
          {
            label: { zh: "问题", en: "Problem" },
            text: {
              zh: "面向共享单车小时级需求波动，使用过去 24 小时租赁量直接预测未来 8 小时，按时间顺序划分训练、验证与测试集。",
              en: "Forecasted the next eight hours of bike demand from the preceding 24 hours, using chronological training, validation, and test splits."
            }
          },
          {
            label: { zh: "方法", en: "Method" },
            text: {
              zh: "先处理上海摩拜约 10 万条订单并聚合为 713 个小时样本，完成缺失补齐、归一化和双层 LSTM 建模；后续在深圳开放数据中截取约 100 万条订单，加入周期、周末与高峰特征。",
              en: "Processed about 100,000 Shanghai Mobike orders into 713 hourly samples for imputation, normalization, and a two-layer LSTM; later evaluated about one million Shenzhen open-data orders with cyclical, weekend, and peak-hour features."
            }
          },
          {
            label: { zh: "结果与边界", en: "Results and limits" },
            text: {
              zh: "首轮优化将 MAE 从 77.82 降至 61.45、RMSE 从 105.26 降至 91.61；扩展数据实验的 R² 约为 0.3-0.4，并识别出稀疏脉冲与 28.6% 零值占比是主要限制，未把有限效果包装成高精度成果。",
              en: "Initial tuning reduced MAE from 77.82 to 61.45 and RMSE from 105.26 to 91.61. The expanded-data experiment reached an R² of roughly 0.3-0.4; sparse spikes and a 28.6% zero-value share were documented as major limitations."
            }
          }
        ],
        links: []
      },
      {
        id: "research-knowledge-base",
        featured: false,
        badge: { zh: "知识库", en: "Knowledge Base" },
        title: {
          zh: "北邮-清华具身智能知识库构建",
          en: "BUPT-Tsinghua Embodied Intelligence Knowledge Base"
        },
        role: {
          zh: "核心参与者 / 高校具身智能联盟框架下",
          en: "Core Contributor / University Embodied Intelligence Alliance"
        },
        meta: {
          zh: "124 位核心学者 / 122 个核心实验室 / 结构化学术资源",
          en: "124 scholars / 122 labs / Structured academic resources"
        },
        status: { zh: "内部知识库", en: "Internal knowledge base" },
        details: [
          {
            label: { zh: "职责", en: "Role" },
            text: {
              zh: "独立负责核心学者和核心实验室两个板块的信息收集、人工校对与结构化录入。",
              en: "Owned information collection, manual verification, and structured entry for the Core Scholars and Core Labs modules."
            }
          },
          {
            label: { zh: "规模", en: "Scale" },
            text: {
              zh: "完成 124 位学者与 122 个实验室的结构化条目，为联盟提供可检索、可扩展的学术资源底座。",
              en: "Completed structured records for 124 scholars and 122 laboratories, supporting a searchable and extensible academic resource base."
            }
          },
          {
            label: { zh: "边界", en: "Boundary" },
            text: {
              zh: "项目为内部知识库，公开简历仅展示工作范围和统计规模，不公开内部页面与条目内容。",
              en: "The knowledge base is internal; this public resume discloses only work scope and aggregate counts."
            }
          }
        ],
        links: []
      }
    ],
    projects: [
      {
        id: "project-blueberry",
        featured: true,
        badge: { zh: "核心工程", en: "Featured Engineering" },
        title: {
          zh: "蓝莓采摘机器人：嵌入式控制与自主采摘仿真系统",
          en: "Blueberry-picking Robot: Embedded Control and Picking Simulation"
        },
        role: {
          zh: "主要开发成员 / 嵌入式开发、系统联调与比赛交付",
          en: "Primary Developer / Embedded Control, Integration, and Delivery"
        },
        meta: {
          zh: "Renesas RA8P1 / Python / YOLO11n / Blender / MuJoCo / Panda",
          en: "Renesas RA8P1 / Python / YOLO11n / Blender / MuJoCo / Panda"
        },
        status: { zh: "仿真系统与比赛材料已完成", en: "Simulation delivered" },
        details: [
          {
            label: { zh: "目标", en: "Goal" },
            text: {
              zh: "在蓝莓采摘机器人嵌入式控制与实机联调基础上，拓展自主采摘仿真系统，用于华北五省计算机应用大赛，贯通识别、定位、采摘、投放与结果复核。",
              en: "Extended prior embedded control and hardware integration work into an autonomous picking simulation for the Huabei Five-Province Computer Application Competition, connecting detection, localization, picking, placement, and outcome verification."
            }
          },
          {
            label: { zh: "嵌入式与实机", en: "Embedded and hardware" },
            text: {
              zh: "承担前期主要工程开发：完成 RA8P1 环境配置、串口通信与机械臂遥操作；接入已有 YOLO 检测模型，将识别结果转换为控制指令，完成机械臂与移动底盘集成及实机联调。",
              en: "Developed RA8P1 serial communication and arm teleoperation; integrated an existing YOLO detector into control commands and tested the arm on a mobile chassis."
            }
          },
          {
            label: { zh: "自主采摘仿真", en: "Autonomous simulation" },
            text: {
              zh: "参与构建 Blender 合成数据与 YOLO11n 微调检测驱动的 MuJoCo/Panda 仿真闭环，结合目标定位、逆运动学、状态机与接触反馈，实现桌面抓取及简化灌木采摘、转移和入盘复核。",
              en: "Contributed to a Blender/YOLO11n/MuJoCo/Panda loop using localization, inverse kinematics, state control, and contact feedback for grasping, shrub picking, transfer, and tray verification."
            }
          },
          {
            label: { zh: "量化评测", en: "Evaluation" },
            text: {
              zh: "团队冻结场景评测：桌面可抓场景成功 30/30，无目标正确拒绝 6/6；简化灌木场景成功 17/20，未成熟外观代理误采为 0。以上为合成场景仿真结果。",
              en: "Frozen simulation evaluation: 30/30 tabletop grasps, 6/6 no-target refusals, and 17/20 shrub scenes succeeded; no unripe-appearance proxies detached. Team results on synthetic scenes."
            }
          },
          {
            label: { zh: "比赛交付", en: "Competition delivery" },
            text: {
              zh: "负责项目计划书与答辩 PPT，并参与完成华北五省计算机应用大赛的软件设计文档、源码包、桌面运行包、功能图与演示视频，整理运行日志和评测记录，形成可演示、可复核的交付成果。",
              en: "Prepared the proposal and slides; contributed to the Huabei competition design document, source and runtime packages, feature images, demo video, and evaluation records."
            }
          },
          {
            label: { zh: "结果边界", en: "Result boundary" },
            text: {
              zh: "前期嵌入式机器人项目获省级二等奖，本人未作为证书署名获奖者。此次新增成果为自主采摘仿真与比赛交付，不代表真实蓝莓成熟度识别或实物自主采摘能力。",
              en: "The earlier embedded robot project received a provincial second prize; I was not a named certificate recipient. The new work demonstrates simulation and competition delivery, without establishing real-fruit ripeness recognition or autonomous physical picking."
            }
          }
        ],
        links: []
      },
      {
        id: "project-navigoose",
        featured: false,
        badge: { zh: "校级立项", en: "University Project" },
        title: {
          zh: "雏雁计划 / 领航雁视障辅助传感系统",
          en: "NaviGoose Assistive Sensing System for the Visually Impaired"
        },
        role: {
          zh: "AI 场景识别方案设计 / 指导教师：章洋副教授",
          en: "AI Scene-recognition Design / Advisor: Assoc. Prof. Zhang Yang"
        },
        meta: {
          zh: "LiDAR / 77GHz 毫米波雷达 / 边缘-云端协同",
          en: "LiDAR / 77GHz mmWave / Edge-cloud architecture"
        },
        status: { zh: "雏雁计划已结项", en: "Nestling Plan project completed" },
        details: [
          {
            label: { zh: "目标", en: "Goal" },
            text: {
              zh: "为视障用户设计智能眼镜与触觉手环协同的多模态出行辅助系统。",
              en: "Design a multimodal mobility-assistance system combining smart glasses and a haptic wristband."
            }
          },
          {
            label: { zh: "个人职责", en: "Contribution" },
            text: {
              zh: "在 5 人团队中负责 AI 场景识别方案和系统架构分析，独立完成技术方案、竞品调研与答辩材料整理。",
              en: "In a five-person team, owned AI scene-recognition planning and architecture analysis, and independently prepared the technical proposal, competitor research, and defense materials."
            }
          },
          {
            label: { zh: "方案", en: "Approach" },
            text: {
              zh: "比较纯边缘端、纯云端和边缘-云端混合架构，提出边缘端实时避障、云端三维重建与路径规划的协同方案。",
              en: "Compared edge-only, cloud-only, and hybrid architectures, proposing edge-side real-time avoidance with cloud-side 3D reconstruction and path planning."
            }
          }
        ],
        links: []
      },
      {
        id: "project-harmony",
        featured: false,
        badge: { zh: "课程实践", en: "Course Practice" },
        title: {
          zh: "鸿蒙嵌入式应用开发 / 计算器 App",
          en: "HarmonyOS Embedded App Development / Calculator"
        },
        role: { zh: "国际学院繁星工程实践", en: "International School Starlight Project" },
        meta: {
          zh: "HarmonyOS / 嵌入式应用 / 前端交互",
          en: "HarmonyOS / Embedded application / Frontend interaction"
        },
        status: { zh: "已完成", en: "Completed" },
        details: [
          {
            label: { zh: "实践", en: "Practice" },
            text: {
              zh: "完成计算器应用的基础设计与开发，熟悉 HarmonyOS 应用开发流程、界面组织和嵌入式应用调试方式。",
              en: "Designed and developed a basic calculator application, learning the HarmonyOS workflow, UI organization, and embedded-app debugging process."
            }
          }
        ],
        links: []
      },
      {
        id: "project-study-room",
        featured: false,
        badge: { zh: "个人作品", en: "Side Project" },
        title: {
          zh: "Study Room / 沉浸式网页自习空间",
          en: "Study Room / Immersive Web Study Space"
        },
        role: {
          zh: "独立产品设计与前端开发 / GitHub Pages 部署",
          en: "Independent Product and Frontend Development / GitHub Pages"
        },
        meta: {
          zh: "React 19 / TypeScript / Vite / Zustand / PWA",
          en: "React 19 / TypeScript / Vite / Zustand / PWA"
        },
        status: { zh: "在线运行", en: "Live" },
        details: [
          {
            label: { zh: "定位", en: "Positioning" },
            text: {
              zh: "把今日任务、专注计时、环境音、学习统计和完成反馈组织在同一个低干扰学习界面中。",
              en: "Combines daily tasks, focus timers, ambient audio, study statistics, and completion feedback in one low-distraction interface."
            }
          },
          {
            label: { zh: "功能", en: "Features" },
            text: {
              zh: "支持任务与当前目标、专注和休息计时、倒计时和正计时、环境音、趋势统计、成就徽章、场景与主题切换、移动端抽屉和 PWA 安装。",
              en: "Supports task and goal management, focus and break timing, countdown and count-up modes, ambient audio, trend statistics, achievements, scenes and themes, a mobile drawer, and PWA installation."
            }
          },
          {
            label: { zh: "工程闭环", en: "Delivery" },
            text: {
              zh: "覆盖用户场景、交互状态、响应式适配、持久化和 GitHub Actions 自动部署。",
              en: "Covers user scenarios, interaction states, responsive behavior, persistence, and GitHub Actions deployment."
            }
          }
        ],
        links: [
          { label: { zh: "在线体验", en: "Live demo" }, url: "https://zzzqr007-g.github.io/study-room/" },
          { label: { zh: "GitHub 仓库", en: "GitHub repository" }, url: "https://github.com/zzzqr007-g/study-room" }
        ]
      }
    ],
    competitions: [],
    learning: {
      id: "learning-ml-notes",
      title: {
        zh: "机器学习与深度学习学习笔记",
        en: "Machine Learning and Deep Learning Notes"
      },
      summary: {
        zh: "以机制理解、公式推导、可运行实践和闭卷复述为主线，持续整理从机器学习基础到 Transformer 与 BERT 的学习成果。",
        en: "A growing set of mechanism-first notes combining formulas, runnable practice, misconception checks, and closed-book review from ML fundamentals to Transformers and BERT."
      },
      status: { zh: "公开精选版", en: "Public curated edition" },
      url: "https://sequoia-profit-c67.notion.site/3cd3e6f3bcdd8113a3d6d6483c2cfbae?source=copy_link",
      topics: [
        { zh: "机器学习基础", en: "ML fundamentals" },
        { zh: "神经网络与深度学习", en: "Neural networks and deep learning" },
        { zh: "Self-Attention", en: "Self-Attention" },
        { zh: "Transformer", en: "Transformer" },
        { zh: "BERT", en: "BERT" },
        { zh: "实践与自测", en: "Practice and review" }
      ]
    },
    skills: [
      {
        id: "skill-languages",
        label: { zh: "编程与数据", en: "Programming and Data" },
        text: {
          zh: "C/C++、Python；NumPy、Pandas、PyTorch、Scikit-learn。",
          en: "C/C++, Python; NumPy, Pandas, PyTorch, and Scikit-learn."
        }
      },
      {
        id: "skill-models",
        label: { zh: "模型与算法", en: "Models and Algorithms" },
        text: {
          zh: "LSTM、Transformer 与注意力机制；持续学习 VLA 模型和具身智能基础。",
          en: "LSTM, Transformers, and attention mechanisms; continuing study of VLA models and embodied intelligence."
        }
      },
      {
        id: "skill-embedded",
        label: { zh: "嵌入式", en: "Embedded Systems" },
        text: {
          zh: "瑞萨 RA8P1、e2 studio、串口通信、机械臂遥操作、YOLO 推理接入与实机联调。",
          en: "Renesas RA8P1, e2 studio, serial communication, robotic-arm teleoperation, YOLO inference integration, and hardware testing."
        }
      },
      {
        id: "skill-research",
        label: { zh: "研究与开发方法", en: "Research and Development Practice" },
        text: {
          zh: "文献检索、论文阅读与实验记录；Zotero、Anaconda、Markdown，以及 AI 辅助编程、调试和技术文档整理。",
          en: "Literature search, paper reading, and experiment logging; Zotero, Anaconda, Markdown, plus AI-assisted programming, debugging, and technical documentation."
        }
      }
    ],
    awards: {
      technical: [
        {
          id: "award-cspj",
          text: {
            zh: "CSP-J 信息学奥林匹克竞赛 / 省级二等奖",
            en: "CSP-J Olympiad in Informatics / Provincial Second Prize"
          }
        },
        {
          id: "award-lab4ai",
          text: {
            zh: "Lab4AI × 北邮 AI 赋能论文写作实战训练营 / 结业认证",
            en: "Lab4AI × BUPT AI-powered Academic Writing Workshop / Completion Certificate"
          }
        },
        {
          id: "award-nestling",
          text: {
            zh: "北京邮电大学 2025 年雏雁计划 / 结项项目参与者",
            en: "BUPT 2025 Nestling Plan / Contributor to a Completed Project"
          }
        }
      ],
      activities: [
        {
          id: "activity-class",
          text: {
            zh: "班级劳动委员兼组织委员",
            en: "Class Labor and Organization Committee Member"
          }
        },
        {
          id: "activity-debate",
          text: {
            zh: "国际学院博弈杯新生辩论赛 / 六强",
            en: "International School Freshman Debate Tournament / Top 6"
          }
        },
        {
          id: "activity-basketball",
          text: {
            zh: "2025 年篮俱杯篮球赛 / 首发队员，随学院队进入八强",
            en: "2025 BUPT Basketball Cup / Starter, advanced to the Top 8"
          }
        },
        {
          id: "activity-service",
          text: {
            zh: "运动会集体跳绳冠军及第三名 / 开学典礼举旗手 / 图书馆志愿者",
            en: "Sports-meet team rope-jumping champion and third place / Ceremony flag bearer / Library volunteer"
          }
        }
      ]
    }
  };
})();
