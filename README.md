# WeChat Bridge — TauriTavern Extension

把微信消息接入 TauriTavern 当前角色卡聊天，并在生成完成后把回复发回微信。

## 功能

- 微信发来的消息自动作为用户消息进入当前聊天并触发生成
- 生成完成后把角色回复发回微信
- 生成进行中收到新消息时，可配置「丢弃」或「排队」
- 回发时机可选「正则/命令处理后」或「生成完全结束后」
- 悬浮球 + 全屏控制面板（运行状态 / 消息记录）
- 夜间 / 日间双主题

## 架构

本扩展遵循 [TauriTavern Creator Extension](https://github.com/Darkatse/TauriTavern-Creator-Extension)
的目录约定：`host/` 是唯一接触宿主 API 的层。

```
src/
├── index.ts                    入口：挂载 shell 与设置抽屉
├── App.vue                     根组件（悬浮球 + 面板）
├── style.css                   设计令牌（夜间/日间）
├── shell/
│   ├── bubble/FloatingBubble.vue   圆形悬浮球
│   ├── panel/MainPanel.vue         全屏面板（左侧导航 + 右侧内容）
│   └── settings/ExtensionSettings.vue
├── settings/SettingsPane.vue       卡片式设置面板
├── settings-page/ExtensionsPagePanel.vue  Extensions 抽屉
├── features/
│   ├── bridge-status/              运行状态
│   └── message-log/                消息记录
├── components/TestSendRow.vue
├── host/                       唯一接触 SillyTavern / TauriTavern 的层
│   ├── api.ts                  SillyTavern context 适配
│   └── bridge-client.ts         与本地 bridge 服务通信
└── app/
    ├── bridge-runtime.ts        收发状态机
    ├── settings-store.ts
    ├── shell-store.ts
    ├── appearance-store.ts
    ├── context.ts              依赖注入
    └── settings.ts
```

## 依赖的服务

本扩展只负责 TauriTavern 侧；微信收发由本地 bridge 服务承担：

```
微信 ──▶ weixin-mcp daemon (:3001) ──webhook──▶ bridge (:8080) ──▶ 本扩展
                                                                      │
              ◀────────────── bridge ◀─────────────────────────────────┘
```

- **weixin-mcp daemon**：持有微信登录与轮询游标（单一消费者）
- **bridge 服务**：本地 HTTP 服务，暴露 `/inbound` 与 `/send`

两个服务都不在本仓库内，需要单独部署。

## 构建

```bash
npm install
npm run build      # 产出 dist/index.js 与 dist/style.css
npm run typecheck  # 仅做类型检查
npm run dev        # 监听构建
```

构建产物 `dist/` 需要一并提交：`manifest.json` 直接引用 `dist/index.js`。

## 安装

方式一：在 TauriTavern 的 Extensions 面板中通过 Git 安装本仓库。

方式二：手动把仓库内容放到 TauriTavern 数据目录的
`data/extensions/third-party/wechat-bridge/` 下。

## 设置项

| 设置 | 默认值 | 说明 |
| --- | --- | --- |
| 启用桥接 | 开 | 关闭后停止悬浮球与后台轮询 |
| 桥接服务地址 | `http://127.0.0.1:8080` | 本地 bridge 服务 |
| 轮询间隔 | 3000 ms | 读取桥接队列的频率 |
| 忙碌时收到新消息 | 丢弃 | 可选排队 |
| 忙碌提示文案 | 剧情正在生成，请稍候～ | 丢弃模式下回给微信 |
| 回发时机 | 正则/命令处理后 | 可选生成完全结束后 |
| 去除思维链标签 | 开 | 移除 think / reasoning 标签 |

## 许可

MIT