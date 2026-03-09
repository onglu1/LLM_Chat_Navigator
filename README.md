# LLM_Chat_Navigator

`LLM_Chat_Navigator` 是一个面向长对话场景的 AI 对话阅读与跳转增强插件。它会在页面中提供 Prompt 侧边栏、上下快速导航和当前回复大纲，帮助你更高效地浏览、定位和回看整段对话内容。

## 演示

![LLM_Chat_Navigator 演示图](docs/images/demo.png)

## 支持站点

| 站点 | 状态 |
|------|------|
| [ChatGPT](https://chatgpt.com) | ✅ 已支持 |
| [Gemini](https://gemini.google.com) | ✅ 已支持 |

后续计划适配：

- `Claude`
- 其他主流 AI / LLM 对话网站

## 功能

- **Prompt 侧边栏**：以卡片形式列出当前对话中的所有用户提问，显示序号和内容预览
- **回复大纲**：自动提取当前助手回复中的标题结构，生成可点击的大纲导航

已支持站点中的页面会提供以下控件：

| 控件 | 功能 |
|------|------|
| 侧边栏按钮 | 展开或折叠 Prompt 侧边栏 |
| ▲ | 跳转到上一个 Prompt |
| ▼ | 跳转到下一个 Prompt |
| 大纲按钮 | 显示或隐藏当前回复的大纲面板 |

你可以结合侧边栏和回复大纲，在长对话中完成两类导航：

- 在不同提问之间快速切换
- 在当前回答内部按标题结构精确跳转

## 安装

1. 下载或克隆本仓库
2. 打开 Chrome，进入 `chrome://extensions/`
3. 开启右上角的「开发者模式」
4. 点击「加载已解压的扩展程序」，选择本项目文件夹

## 项目结构

```
├── manifest.json                  # 扩展配置文件（Manifest V3）
├── shared/                        # 共享代码
│   ├── utils.js                   # 工具函数（滚动检测、平滑导航）
│   ├── ui.js                      # UI 元素创建（侧边栏、悬浮按钮、大纲面板）
│   ├── main.js                    # 主逻辑（通过适配器对接各门户）
│   └── styles.css                 # 共享样式（亮/暗模式）
├── portals/                       # 各 AI 门户适配
│   ├── chatgpt/
│   │   ├── adapter.js             # ChatGPT DOM 适配器
│   │   └── README.md              # ChatGPT 页面结构与功能文档
│   └── gemini/
│       ├── adapter.js             # Gemini DOM 适配器
│       └── README.md              # Gemini 页面结构与功能文档
├── icons/                         # 扩展图标
├── docs/                          # 文档资源
├── LICENSE                        # GPL-3.0 许可证
└── README.md                      # 项目说明
```

## 架构设计

本项目采用**适配器模式**，将共享逻辑与门户特定逻辑分离：

- **`shared/`**：UI 创建、工具函数、主逻辑（门户无关）
- **`portals/<portal>/adapter.js`**：每个门户实现统一的适配器接口

适配器接口定义（`window.__LLM_NAV_ADAPTER`）：

| 方法 | 说明 |
|------|------|
| `getUserMessages()` | 获取所有用户消息元素 |
| `getUserMessageText(el)` | 获取用户消息文本 |
| `getTurnContainer(el)` | 获取对话轮次容器 |
| `getAssistantForUser(el)` | 获取对应的助手回复元素 |
| `getMainElement()` | 获取主内容区域元素 |
| `getObserveTarget()` | 获取 MutationObserver 观察目标 |
| `getBranchInfo(el)` | 获取分支信息 |
| `getHeadings(el)` | 获取助手回复中的标题元素 |
| `getContentRect()` | 获取内容区域位置矩形 |

### 添加新门户支持

1. 在 `portals/` 下创建新目录
2. 实现 `adapter.js`，提供上述适配器接口
3. 创建 `README.md` 记录页面结构
4. 在 `manifest.json` 中添加对应的 `content_scripts` 条目

## 许可证

本项目基于 [GNU General Public License v3.0](LICENSE) 开源。
