# Gemini 门户适配说明

## 页面结构

### DOM 层级

```
chat-app#app-root
└── main.chat-app
    └── side-navigation-v2.content
        └── bard-sidenav-content
            └── content-wrapper
                └── main-content
                    └── content-container
                        └── chat-window
                            └── .chat-container
                                └── #chat-history (.chat-history-scroll-container)
                                    └── infinite-scroller [data-test-id="chat-history-container"]
                                        └── div.conversation-container ← 每轮对话
```

### 用户消息

| 选择器 | 说明 |
|--------|------|
| `user-query` | 自定义元素，用户提问 |
| `.query-text` / `.query-text-line` | 用户文本内容 |
| `user-query-content` | 用户提问内容容器 |

### 助手回复

| 选择器 | 说明 |
|--------|------|
| `model-response` | 自定义元素，模型回复 |
| `message-content` | 回复内容容器 |
| `.markdown.markdown-main-panel` | Markdown 渲染区域 |
| 渲染区内 `h1, h2, h3, h4, h5, h6` | 回复中的标题（用于大纲） |

### 对话轮次

| 选择器 | 说明 |
|--------|------|
| `div.conversation-container` | 轮次容器 |
| `conversation-container` 的 `id` 属性 | 轮次唯一 ID（如 `603c6dac92467bda`） |

**特殊结构**：Gemini 中用户消息和模型回复在**同一个** `conversation-container` 内部，是父子关系。获取助手回复直接在同一容器内查找 `model-response`。

### 分支信息

Gemini 当前不展示分支/版本信息。

### 主内容区与滚动

| 选择器 | 说明 |
|--------|------|
| `.chat-container` / `chat-window` | 聊天内容区域 |
| `#chat-history` | 聊天历史滚动容器 |
| `[data-test-id="chat-history-container"]` | 备选滚动容器 |

### 暗色模式

通过 `html[dark]` 属性切换（Google 产品通用模式）。

### Angular 自定义元素

Gemini 使用 Angular 框架，页面中大量使用自定义元素（`user-query`、`model-response`、`message-content` 等）。选择器应使用自定义元素标签名或稳定的 `data-test-id` 属性，避免依赖 `_ngcontent-*` 等 Angular 内部属性。

## 已实现功能

- [x] Prompt 侧边栏（卡片列表 + 点击跳转）
- [x] 上下 Prompt 导航
- [x] 回复大纲（标题结构导航）
- [x] 大纲宽度 / 层级调节
- [x] 亮/暗模式自适应
- [x] MutationObserver 自动刷新
- [x] ResizeObserver 布局自适应
- [ ] 分支提示（Gemini 不支持分支功能）

## 会话 URL 格式

```
https://gemini.google.com/app/<conversation-id>
```

## 已知限制

1. Gemini 页面使用 Angular 动态渲染，自定义元素初始化需要时间，插件通过 `ensureConnection` 定期检查来适配
2. 侧边栏 `bard-sidenav` 可能影响大纲面板的定位，大纲面板基于 `.chat-container` 的位置计算
3. 对话历史滚动容器较深层嵌套，通过 `getScrollContainer()` 向上遍历自动查找
