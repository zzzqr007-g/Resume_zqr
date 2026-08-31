/* Canonical, bilingual resume content. Keep this file free of private evidence. */
(function () {
  "use strict";

  window.RESUME_DATA = {
    version: 4,
    updated: "2026-09-01",
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
        value: { zh: "前 7%", en: "Top 7%" },
        label: { zh: "专业排名", en: "Major ranking" }
      },
      {
        id: "cet4",
        value: { zh: "CET-4 / 530", en: "CET-4 / 530" },
        label: { zh: "大学英语四级", en: "College English Test" }
      }
    ],
    about: {
      zh: "北京邮电大学电信工程及管理专业 2025 级本科生。大一学年保研加权平均分 90.85/100，专业排名前 7%，大学英语四级 530 分。目前围绕 AI、具身智能与机器人系统积累研究和工程能力：在 PRIS Lab 参与具身智能科研训练，独立完成 LSTM 共享单车短期需求预测实验，并主要承担蓝莓采摘机器人从环境配置、串口与遥操作开发到视觉控制联调和实机集成的工作。",
      en: "Undergraduate at BUPT, Class of 2029, majoring in Telecommunications Engineering with Management. My first-year weighted academic average is 90.85/100, ranking in the top 7% of the major, with a CET-4 score of 530. I am building research and engineering experience across AI, embodied intelligence, and robotic systems through PRIS Lab training, an independently completed LSTM bike-demand forecasting experiment, and system development for a blueberry-picking robot."
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
          zh: "保研加权平均分 90.85/100 / 专业前 7% / 四级 530",
          en: "Weighted average 90.85/100 / Top 7% / CET-4 530"
        },
        status: { zh: "2025级本科生", en: "Class of 2029" },
        details: [
          {
            label: { zh: "成绩", en: "Academics" },
            text: {
              zh: "大一学年保研加权平均分 90.85/100，专业排名前 7%。",
              en: "First-year weighted academic average of 90.85/100, ranking in the top 7% of the major."
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
          zh: "基于瑞萨 RA8P1 的蓝莓采摘机器人嵌入式控制系统",
          en: "Embedded Control System for a Blueberry-picking Robot Based on Renesas RA8P1"
        },
        role: {
          zh: "主要开发成员 / 负责嵌入式、视觉控制联调与交付材料",
          en: "Primary Developer / Embedded, Vision-control Integration, and Delivery"
        },
        meta: {
          zh: "环境配置 / 串口通信 / 机械臂遥操作 / YOLO 集成 / 实机联调",
          en: "Environment setup / Serial communication / Arm teleoperation / YOLO integration / Hardware testing"
        },
        status: { zh: "项目获省级二等奖", en: "Project received a provincial second prize" },
        details: [
          {
            label: { zh: "目标", en: "Goal" },
            text: {
              zh: "面向蓝莓目标识别与抓取场景，完成机械臂、视觉检测与可移动小车底盘的系统集成。",
              en: "Integrated a robotic arm, visual detection, and a mobile chassis for blueberry target recognition and grasping."
            }
          },
          {
            label: { zh: "个人职责", en: "Contribution" },
            text: {
              zh: "承担项目大部分工程开发：完成前期环境配置与串口通信，编写机械臂遥操作控制代码，并持续进行实机调试。",
              en: "Handled most of the engineering implementation, including environment setup, serial communication, robotic-arm teleoperation code, and iterative hardware debugging."
            }
          },
          {
            label: { zh: "视觉与控制", en: "Vision and control" },
            text: {
              zh: "接入已有 YOLO 检测模型，将识别结果转换为机械臂转动数据与抓取指令，并配合图像识别和抓取流程采集数据；本阶段未完成模型训练。",
              en: "Integrated an existing YOLO detector, converted detections into arm-rotation data and grasp commands, and collected data through recognition and grasp trials; model training was not completed at this stage."
            }
          },
          {
            label: { zh: "系统与交付", en: "System and delivery" },
            text: {
              zh: "将机械臂安装到可移动小车底盘，完成目标检测、控制数据返回与抓取链路联调，并负责后续项目计划书和答辩 PPT 制作。",
              en: "Mounted the arm on a mobile chassis, tested the target-detection, control-data, and grasping pipeline, and prepared the project proposal and presentation deck."
            }
          },
          {
            label: { zh: "结果边界", en: "Result boundary" },
            text: {
              zh: "项目获得省级二等奖。奖项属于项目成果，本人未作为证书署名获奖者，个人贡献按实际分工单独陈述。",
              en: "The project received a provincial second prize. The award belongs to the project outcome; personal contribution is stated separately because I was not a named certificate recipient."
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
