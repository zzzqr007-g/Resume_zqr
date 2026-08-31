/* Canonical, bilingual resume content. Keep this file free of private evidence. */
(function () {
  "use strict";

  window.RESUME_DATA = {
    version: 4,
    updated: "2026-08-31",
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
        value: "90.83/100",
        label: { zh: "大一上学期保研均分", en: "First-semester average" }
      },
      {
        id: "rank",
        value: "前 6%",
        label: { zh: "专业排名", en: "Major ranking" }
      },
      {
        id: "orders",
        value: "约 100 万",
        label: { zh: "论文实验订单数据", en: "Paper dataset records" }
      },
      {
        id: "knowledge",
        value: "124 + 122",
        label: { zh: "学者与实验室条目", en: "Scholar and lab records" }
      }
    ],
    about: {
      zh: "北京邮电大学电信工程及管理专业 2025 级本科生。大一上学期保研均分 90.83/100，专业排名前 6%。目前围绕 AI、具身智能与嵌入式系统积累研究和工程能力：在 PRIS Lab 参与具身智能科研训练，独立完成双向 LSTM 共享单车需求预测论文，并主要承担蓝莓采摘机器人嵌入式软件架构、核心功能开发与实机联调。",
      en: "Undergraduate at BUPT, Class of 2029, majoring in Telecommunications Engineering with Management. My first-semester average was 90.83/100, ranking in the top 6% of the major. I am building research and engineering depth across AI, embodied intelligence, and embedded systems through PRIS Lab research training, a sole-authored BiLSTM forecasting paper, and embedded software development for a blueberry-picking robot."
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
          zh: "保研均分 90.83/100 / 专业前 6%",
          en: "Average 90.83/100 / Top 6% in major"
        },
        status: { zh: "2025级本科生", en: "Class of 2029" },
        details: [
          {
            label: { zh: "成绩", en: "Academics" },
            text: {
              zh: "大一上学期保研均分 90.83/100，专业排名前 6%。",
              en: "First-semester average of 90.83/100, ranking in the top 6% of the major."
            }
          },
          {
            label: { zh: "课程", en: "Coursework" },
            text: {
              zh: "高等数学上（88）、线性代数（90）、计算机导论与程序设计（91）。",
              en: "Advanced Mathematics I (88), Linear Algebra (90), and Introduction to Computing and Programming (91)."
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
          zh: "本科生研究员 / 导师：高深教授",
          en: "Undergraduate Researcher / Advisor: Prof. Gao Shen"
        },
        meta: {
          zh: "具身智能论文研读 / 组会汇报 / 机器人技术论证",
          en: "Embodied AI papers / Lab presentations / Robotics technical research"
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
              zh: "独立研读 π0.5 等视觉-语言-动作模型论文并完成组会汇报；围绕蓝莓采摘机器人调研机械臂、底盘与嵌入式控制方案。",
              en: "Independently studied vision-language-action models including π0.5, presented findings in lab meetings, and evaluated robotic-arm, chassis, and embedded-control options for a blueberry-picking robot."
            }
          },
          {
            label: { zh: "产出", en: "Outcome" },
            text: {
              zh: "形成论文拆解、技术路线比较和工程落地约束分析的研究工作流。",
              en: "Built a repeatable workflow for paper decomposition, technical route comparison, and implementation-constraint analysis."
            }
          }
        ],
        links: [
          { label: { zh: "关联机器人项目", en: "Related robot project" }, url: "#projects" }
        ]
      },
      {
        id: "research-bilstm",
        featured: true,
        badge: { zh: "独立论文", en: "Independent Paper" },
        title: {
          zh: "基于双向 LSTM 的共享单车短期需求预测",
          en: "Short-term Bike-sharing Demand Forecasting with Bidirectional LSTM"
        },
        role: { zh: "独立研究者 / 第一作者", en: "Independent Researcher / Sole Author" },
        meta: {
          zh: "Python / PyTorch / 约 100 万条订单 / MAE 55.50",
          en: "Python / PyTorch / About 1M orders / MAE 55.50"
        },
        status: { zh: "英文稿件审稿中", en: "Manuscript under review" },
        details: [
          {
            label: { zh: "问题", en: "Problem" },
            text: {
              zh: "面向城市共享单车小时级需求波动，构建双层双向 LSTM 短期预测模型。",
              en: "Built a two-layer bidirectional LSTM model for hourly urban bike-sharing demand forecasting."
            }
          },
          {
            label: { zh: "方法", en: "Method" },
            text: {
              zh: "处理深圳市政府开放数据平台约 100 万条订单记录（2017.04-2021.02），完成小时级聚合、周期性时间编码、周末和高峰标记等特征构造。",
              en: "Processed about one million Shenzhen open-data order records from Apr 2017 to Feb 2021, with hourly aggregation, cyclical time encoding, weekend indicators, and peak-hour features."
            }
          },
          {
            label: { zh: "结果", en: "Result" },
            text: {
              zh: "采用多步输出、Huber 损失与双向结构，将 MAE 从 77.82 降至 61.45；随机森林融合模型进一步降至 55.50，RMSE 为 85.55。",
              en: "Multi-step outputs, Huber loss, and bidirectional modeling reduced MAE from 77.82 to 61.45; a random-forest fusion model further reduced it to 55.50, with RMSE 85.55."
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
          zh: "核心开发成员 / 主要负责嵌入式软件",
          en: "Core Developer / Primary Embedded Software Contributor"
        },
        meta: {
          zh: "C/C++ / RA8P1 / J-Link SWD / UART/CAN / FSM",
          en: "C/C++ / RA8P1 / J-Link SWD / UART/CAN / FSM"
        },
        status: { zh: "项目获省级二等奖", en: "Project received a provincial second prize" },
        details: [
          {
            label: { zh: "目标", en: "Goal" },
            text: {
              zh: "面向农业自动化采摘场景，基于瑞萨 RA8P1 微控制器实现机器人底层控制与采摘流程调度。",
              en: "Implement low-level robot control and picking-workflow orchestration for automated agriculture using the Renesas RA8P1 MCU."
            }
          },
          {
            label: { zh: "个人职责", en: "Contribution" },
            text: {
              zh: "在 3 人团队中主要负责嵌入式软件架构、核心功能开发与实机联调，并参与机械臂和底盘硬件选型。",
              en: "In a three-person team, primarily owned embedded software architecture, core feature development, and hardware integration, while contributing to robotic-arm and chassis selection."
            }
          },
          {
            label: { zh: "实现", en: "Implementation" },
            text: {
              zh: "实现安全监测、机械臂 UART 通信、底盘运动控制、末端抓手驱动与基于 FSM 的采摘流程；使用 J-Link/SWD、UART 日志和 LED 状态完成调试。",
              en: "Implemented safety monitoring, robotic-arm UART communication, chassis motion control, gripper actuation, and an FSM-based picking workflow; debugged through J-Link/SWD, UART logs, and LED states."
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
        status: { zh: "2025 年雏雁计划立项", en: "Approved under BUPT's 2025 Nestling Plan" },
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
      status: { zh: "公开精选版整理中", en: "Curated public edition in progress" },
      url: "",
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
          zh: "LSTM、双向 RNN、Transformer、注意力机制；持续学习 VLA 与具身智能基础。",
          en: "LSTM, bidirectional RNNs, Transformers, and attention; continuing study of VLA models and embodied intelligence."
        }
      },
      {
        id: "skill-embedded",
        label: { zh: "嵌入式", en: "Embedded Systems" },
        text: {
          zh: "瑞萨 RA8P1、FSP、e2 studio、SWD/J-Link、UART、GPIO、FSM 与实机联调。",
          en: "Renesas RA8P1, FSP, e2 studio, SWD/J-Link, UART, GPIO, FSMs, and hardware integration."
        }
      },
      {
        id: "skill-research",
        label: { zh: "科研与工具", en: "Research and Tooling" },
        text: {
          zh: "英文论文写作、Zotero、文献检索与综述整理；Git、Linux、Anaconda、Markdown/LaTeX。",
          en: "Academic writing, Zotero, literature search and review; Git, Linux, Anaconda, Markdown, and LaTeX."
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
            zh: "北京邮电大学 2025 年雏雁计划 / 项目立项参与者",
            en: "BUPT 2025 Nestling Plan / Approved Project Contributor"
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
