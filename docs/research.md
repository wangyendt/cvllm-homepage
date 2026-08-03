# cvllm.com 主页内容调研

调研日期：2026-08-03（Asia/Shanghai）

## 结论

主页不宜做成 117 个公开仓库的缩略列表。更好的叙事是：**算法工程师，以数学和工程实现为底座，持续构建机器人/视觉算法、开发工具与 AI Agent 基础设施。** 项目展示建议分成三个层次：

1. 首屏主推：`skillmanager`、`pywayne`、`kalibr-camimu-ceres`。
2. 项目网格：再加入 `wayne-skills`、`cpp_tools`、`BaselineRemoval`、`Coordinate-Transformation-Helper`。
3. 个人能力入口：GitHub、算法库文档、npm、LeetCode。

仓库指标来自 GitHub API；README、文档、npm registry/download API 和 LeetCode GraphQL 均为项目自身或平台的一手来源。Star、下载量、排名和更新时间会变化，页面最好标注为动态/近似指标或定期更新。

## 推荐项目排序

### 1. skillmanager — 首页主推

- 链接：[GitHub](https://github.com/wangyendt/skillmanager) · [npm](https://www.npmjs.com/package/@wang121ye/skillmanager/)
- 当前证据：11 Stars，48+ commits，16+ tags；npm 最新版 `0.1.19`；2026-07-04 至 2026-08-02 有 939 次下载；2026-07-31 仍有代码更新。
- 成熟度信号：MIT、双语 README、CLI + Web UI、GitHub Actions、公开 npm 包、多版本发布。
- 准确定位：跨平台 Agent Skills 管理器，把官方、第三方及个人 skills 来源统一安装、更新和卸载，并支持 project/global scope、多 Agent 目录、profile 与远端配置同步。
- 首页短文案：

  > **Skill Manager**  
  > 面向多种 AI 编程 Agent 的跨平台 Skills 管理器。统一管理官方、社区与个人技能源，支持 CLI / Web UI、多 Agent 安装、配置档案和跨设备同步。

- 推荐标签：`AI Agents` `Developer Tools` `JavaScript` `npm`
- CTA：`查看项目`、`npm 安装`

### 2. pywayne / wayne_algorithm_lib — 首页主推

- 链接：[GitHub](https://github.com/wangyendt/wayne_algorithm_lib) · [完整文档](https://wayne-algorithm-lib.readthedocs.io/en/latest/index.html)
- 当前证据：10 Stars、2 Forks、228 commits；2026-07-21 仍有代码更新；PyPI 安装名为 `pywayne`；MIT；有独立 Read the Docs 文档。
- 成熟度信号：代码、发布包、模块文档和示例齐全；能力横跨 DSP、数学/统计、数据结构、CV、VIO、姿态与标定、可视化、ADB、跨语言通信、阿里云 OSS、飞书机器人、LLM 与 TTS。
- 首页短文案：

  > **pywayne 算法与工程工具库**  
  > 将多年算法工程实践沉淀为可复用的 Python 工具箱，覆盖信号处理、计算机视觉、VIO/姿态、标定、统计分析、通信与自动化，并提供完整模块文档与示例。

- 推荐标签：`Python` `Algorithms` `CV / VIO` `DSP`
- CTA：`阅读文档`、`浏览源码`

### 3. kalibr-camimu-ceres — 首页主推

- 链接：[GitHub](https://github.com/wangyendt/kalibr-camimu-ceres)
- 当前证据：5 Stars；2026-07-29 更新；C++17 + CMake + Eigen3 + Ceres；仓库包含求解器、测试、仿真、数据转换、实验报告和书式推导文档。
- 成熟度信号：不是概念 demo，而是从公式、Jacobian、初始化和因子图到独立 C++/Ceres 标定链路的完整实现，并公开真实数据复核口径和局限。
- 可安全引用的实测摘要：12/12 个真实 `1cam+1imu` case 完成；相对 Kalibr 的平移差平均/最大为 `2.27 / 3.12 mm`；本机 Ceres 平均耗时 `87.8 s`，Kalibr arm64 Docker 为 `127.5 s`。这是工程对比，不应写成真值误差或普遍加速承诺。
- 首页短文案：

  > **Kalibr Cam-IMU Ceres**  
  > Kalibr 相机—IMU 标定链路的可解释 C++/Ceres 重构：从推导、Jacobian 与初始化一路落到可运行求解器，并以真实多相机、多 IMU 数据做可复现实验验证。

- 推荐标签：`C++` `Ceres` `Sensor Calibration` `Robotics`
- CTA：`查看实验与源码`

### 4. wayne-skills

- 链接：[GitHub](https://github.com/wangyendt/wayne-skills)
- 当前证据：8 Stars、70 commits；2026-07-21 更新；MIT；双语 README。
- 成熟度信号：README 记录 42 个技能，其中 34 个与 `pywayne` 模块对齐、8 个为通用技能，覆盖 CV、VIO、DSP、LLM、统计、自动化与平台集成。
- 首页短文案：

  > **Wayne Skills**  
  > 面向 Codex / Claude 类编程 Agent 的生产型技能集合，把真实算法模块映射为可复用的 `SKILL.md` 工作流，让 Agent 更稳定地选择 API、步骤与约束。

- 推荐标签：`Agent Skills` `Codex` `Claude` `Automation`

### 5. cpp_tools

- 链接：[GitHub](https://github.com/wangyendt/cpp_tools)
- 当前证据：7 Stars、2 Forks、85 commits；2026-05-25 更新；MIT；有 CI 与长篇工程文档。
- 成熟度信号：通过 pybind11 连接 C++ 和 Python，并由 `gettool` 做稀疏拉取、构建与安装；已有 Butterworth、滑动窗口、AprilTag、相机模型、Pangolin 和 ADB 日志工具。README 明确当前以 macOS/Linux 为优先支持环境，首页不应声称全平台开箱即用。
- 首页短文案：

  > **C++ Tools**  
  > 可从 Python 复用的高性能 C++ 工具集合。通过 pybind11 与自动构建链路，把信号处理、AprilTag、相机模型和可视化能力按需带入算法项目。

- 推荐标签：`C++` `pybind11` `Performance` `Computer Vision`

### 6. BaselineRemoval

- 链接：[GitHub](https://github.com/wangyendt/BaselineRemoval)
- 当前证据：14 Stars、1 Fork，是自有仓库中 Star 最高者；2026-07-21 更新，但仓库仅 3 commits、无 release，代码和说明体量较小。
- 取舍：适合以“受欢迎的精巧算法实现”作为小卡片，不宜放在前三位或包装成大型成熟库。
- 首页短文案：

  > **Baseline Removal**  
  > 一个专注于信号基线漂移去除的轻量 Python 实现，附算法资料与仿真示例。

- 推荐标签：`Python` `Signal Processing` `Algorithm`

### 7. Coordinate Transformation Helper

- 链接：[GitHub](https://github.com/wangyendt/Coordinate-Transformation-Helper)
- 当前证据：6 Stars、1 Fork、10+ commits、1 个公开 release；2026-02-11 更新；MIT；有双语说明和界面截图。
- 成熟度信号：用 GUI 统一坐标系、四元数顺序与手表左右腕/表冠佩戴变换，README 给出普通向量、伪向量和组合变换原则。
- 首页短文案：

  > **Coordinate Transformation Helper**  
  > 面向 OpenCV、OpenGL、IMU、Unity 与智能手表场景的坐标/旋转表示转换 GUI，直观处理轴定义、四元数顺序和佩戴模式差异。

- 推荐标签：`Python` `GUI` `Quaternion` `Wearables`

## 个人资料与可信数字

- GitHub：[wangyendt](https://github.com/wangyendt)；显示名 Ye Wang；117 个公开仓库、29 followers；账号创建于 2016 年。Bio 当前仅为 `maths lover`。
- LeetCode：[wangyehope](https://leetcode.com/u/wangyehope/)；显示名 Ye Wang；公开资料为 OPPO Senior Algorithm Engineer、中国科学技术大学、兴趣方向 Mathematics / Machine Learning / Deep Learning。
- LeetCode 截至调研时：排名 6,276；已解 1,562 题，其中 Easy 425、Medium 772、Hard 365；徽章包括 Guardian 与 365 Days Badge。
- 建议首页把 LeetCode 写成长期算法训练与问题求解能力，不要把排名写死在主标题；可动态显示“1,500+ problems solved”。

推荐卡片文案：

> **持续训练算法基本功**  
> 在 LeetCode 完成 1,500+ 道题，覆盖从基础数据结构到动态规划、图算法与高难度问题，保持对复杂问题拆解和实现细节的敏感度。

## 推荐首页文案

### 首屏

标题：

> 把算法推导，做成可靠的工程工具。

副标题：

> 我是 Ye Wang，一名专注于算法、计算机视觉、传感器与 AI Agent 工具的工程师。这里收录了我持续维护的开源项目：从 Cam-IMU 标定与 Python 算法库，到让多种编程 Agent 共享能力的 Skill 基础设施。

按钮：

- `探索精选项目` → 项目区
- `阅读 pywayne 文档` → Read the Docs
- 次级文字链接：`GitHub`、`LeetCode`

### 项目区标题

> 精选开源项目

说明：

> 不止展示代码，也记录推导、实验和可复用的工程方法。以下项目仍在持续演进。

### pywayne 专区

标题：

> 一套从日常工具走向算法工程底座的 Python 库

正文：

> `pywayne` 将信号处理、视觉与 VIO、姿态/标定、统计分析、跨语言通信和自动化能力放进统一的模块体系。既可以直接 `pip install -U pywayne` 使用，也可以通过完整文档和配套 Agent Skills 快速找到正确工作流。

能力分组建议只展示 4 组，避免信息过载：

- 视觉与机器人：CV、AprilTag、VIO、SE(3)、AHRS、标定
- 信号与数据：DSP、统计、数学、数据结构、绘图
- 工程与集成：ADB、跨语言通信、阿里云 OSS、C++ 加速
- 智能交互：LLM、飞书机器人、TTS、GUI 自动化

### 关于我

> 我喜欢数学，也喜欢把公式变成可以被验证、复用和维护的系统。工作与开源实践集中在算法工程、计算机视觉、传感器数据处理和开发者工具；比起只给出结果，我更重视推导过程、可复现实验和清晰文档。

## 页面信息架构建议

1. Hero：定位 + 3 个行动入口。
2. Featured：前三个大项目卡片（Skill Manager、pywayne、Kalibr Ceres）。
3. More Projects：其余 4 个紧凑卡片。
4. pywayne Ecosystem：源码、文档、C++ tools、Wayne Skills 的关系。
5. Algorithm Practice：LeetCode 1,500+，链接个人页。
6. About / Contact：GitHub、邮箱（如愿意公开）、两个域名。

项目生态可以用一句简洁关系说明：

> `pywayne` 提供算法实现，`cpp_tools` 提供高性能内核，`wayne-skills` 把能力整理成 Agent 工作流，`skillmanager` 负责把这些工作流安装到不同 AI Agent。

## 不建议的表述

- 不要把所有 fork 仓库算作个人代表作。
- 不要写“所有项目都跨平台开箱即用”；`cpp_tools` 当前文档明确优先支持 macOS/Linux。
- 不要把 Ceres 与 Kalibr 的结果差写成对真值误差，也不要泛化为始终更快。
- 不要强调累计 Star 总数；个人项目更强的证据是持续维护、文档、发布、实验与跨项目生态。
- 不要固定展示 LeetCode 精确排名或 npm 精确月下载量，除非实现自动更新。

## 一手来源

- GitHub 用户 API：https://api.github.com/users/wangyendt
- GitHub 仓库 API（第 1、2 页）：https://api.github.com/users/wangyendt/repos?per_page=100&sort=updated 和 https://api.github.com/users/wangyendt/repos?per_page=100&page=2&sort=updated
- Skill Manager：https://github.com/wangyendt/skillmanager
- npm 包：https://www.npmjs.com/package/@wang121ye/skillmanager/；registry metadata：https://registry.npmjs.org/@wang121ye%2Fskillmanager/latest；下载统计：https://api.npmjs.org/downloads/point/last-month/%40wang121ye%2Fskillmanager
- pywayne：https://github.com/wangyendt/wayne_algorithm_lib；文档：https://wayne-algorithm-lib.readthedocs.io/en/latest/index.html
- Wayne Skills：https://github.com/wangyendt/wayne-skills
- C++ Tools：https://github.com/wangyendt/cpp_tools
- Kalibr Cam-IMU Ceres：https://github.com/wangyendt/kalibr-camimu-ceres
- BaselineRemoval：https://github.com/wangyendt/BaselineRemoval
- Coordinate Transformation Helper：https://github.com/wangyendt/Coordinate-Transformation-Helper
- LeetCode 个人页：https://leetcode.com/u/wangyehope/；公开 GraphQL endpoint：https://leetcode.com/graphql/
