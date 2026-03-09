# ChatGPT 门户适配说明

## 页面结构

### DOM 层级

```
main#main
└── div#thread
    └── div.composer-parent
        └── div.flex.flex-col
            └── article[data-testid="conversation-turn-N"]  ← 每轮对话
                └── [data-message-author-role="user"|"assistant"]
```

### 用户消息

| 选择器 | 说明 |
|--------|------|
| `[data-message-author-role="user"]` | 用户消息元素 |
| `.user-message-bubble-color .whitespace-pre-wrap` | 用户文本内容 |

### 助手回复

| 选择器 | 说明 |
|--------|------|
| `[data-message-author-role="assistant"]` | 助手回复元素 |
| 助手元素内 `h1, h2, h3, h4, h5, h6` | 回复中的标题（用于大纲） |

### 对话轮次

| 选择器 | 说明 |
|--------|------|
| `article[data-testid^="conversation-turn"]` | 轮次容器 |
| `data-turn-id` | 唯一轮次 ID |
| `data-turn="user"` / `data-turn="assistant"` | 角色标识 |

**特殊结构**：ChatGPT 中用户和助手的消息在**不同的** `article` 元素中，是兄弟关系。获取助手回复需要从用户轮次的 `nextElementSibling` 开始遍历。

### 分支信息

| 选择器 | 说明 |
|--------|------|
| `.tabular-nums` | 分支编号（如 `2/2`） |

ChatGPT 支持消息分支（同一提问的不同回复版本）。

### 主内容区与滚动

| 选择器 | 说明 |
|--------|------|
| `main#main` | 主内容区域 |
| 向上遍历 `overflow-y: auto/scroll` | 滚动容器 |

### 暗色模式

通过 `html.dark` 类名切换。

## 已实现功能

- [x] Prompt 侧边栏（卡片列表 + 点击跳转）
- [x] 上下 Prompt 导航
- [x] 回复大纲（标题结构导航）
- [x] 大纲宽度 / 层级调节
- [x] 分支提示显示
- [x] 亮/暗模式自适应
- [x] MutationObserver 自动刷新
- [x] ResizeObserver 布局自适应

## 会话 URL 格式

```
https://chatgpt.com/c/<conversation-id>
```
