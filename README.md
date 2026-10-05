# WeChat Bridge — TauriTavern Extension

把微信消息接入 TauriTavern 当前角色卡聊天，并在生成完成后把回复发回微信。

## 组成

本仓库包含两个部分，缺一不可：

| 目录 | 内容 | 运行位置 |
| --- | --- | --- |
| 仓库根目录 | TauriTavern 扩展（`src/`，构建产物在 `dist/`） | TauriTavern 的 WebView 内 |
| `bridge/` | 本地 bridge 服务（Node） | 独立进程 |

## 架构

```
微信 ⇄ bridge (:8080) ⇄ 扩展 ⇄ TauriTavern 聊天
         ↑
   直连微信 iLink bot API
   账号轮询游标的唯一持有者
```

- **bridge** 负责微信收发：持有登录凭据、长轮询新消息、发送回复
- **扩展** 负责 TauriTavern 侧：把消息写进当前聊天、触发生成、监听生成完成

扩展不接触微信协议，bridge 不接触 SillyTavern —— 两边通过 HTTP 通信。

## 功能

- 微信消息自动作为用户消息进入当前聊天并触发生成
- 生成完成后把角色回复发回微信
- 生成进行中收到新消息时可配置「丢弃」或「排队」
- 回发时机可选「正则/命令处理后」或「生成完全结束后」
- 悬浮球 + 全屏控制面板（运行状态 / 消息记录）
- 夜间 / 日间双主题

## 安装

### 1. bridge 服务

```bash
cd bridge
npm install
node server.mjs
```

或直接运行 `bridge/start-bridge.bat`（首次会自动安装依赖）。

凭据按以下优先级读取：

1. `~/.weixin-mcp/accounts/*.json`
2. `~/.wechat-acp/token.json`

首次启动会继承已有的轮询游标与联系人，避免重放已经处理过的消息。

### 2. 扩展

方式一：在 TauriTavern 的 Extensions 面板中通过 Git 安装本仓库。

方式二：把仓库内容放到 TauriTavern 数据目录的
`data/extensions/third-party/wechat-bridge/` 下。

扩展通过 `manifest.json` 加载 `dist/index.js` 与 `dist/style.css`，两者已随仓库提交。

## 使用

1. 启动 bridge 服务
2. 在 TauriTavern 的 Extensions 抽屉中启用 WeChat Bridge
3. 打开任意角色卡，确认已选中角色
4. 用微信给 bot 发送消息

> 首次使用前需要有一次真实的微信登录（见「凭据」）。登录由 weixin-mcp 或
> wechat-acp 完成，本仓库不再重复实现登录流程。

## 设置

**Extensions 抽屉**（常用项）

| 设置 | 默认值 | 说明 |
| --- | --- | --- |
| 启用桥接 | 开 | 关闭后停止扩展轮询并隐藏悬浮球 |
| 外观 | 夜间 | 夜间 / 日间主题 |
| 面板 | — | 打开控制面板入口 |

**悬浮面板 → 设置**（完整项）

| 设置 | 默认值 | 说明 |
| --- | --- | --- |
| 桥接服务地址 | `http://127.0.0.1:8080` | bridge 服务地址 |
| 轮询间隔 | 3000 ms | 扩展读取队列的频率 |
| 忙碌时收到新消息 | 丢弃 | 可选排队 |
| 忙碌提示文案 | 剧情正在生成，请稍候～ | 丢弃模式下回给微信 |
| 回发时机 | 正则/命令处理后 | 可选生成完全结束后 |
| 去除思维链标签 | 开 | 移除 think / reasoning 标签 |

## 注意事项

- **轮询游标只能有一个持有者。** 不要同时运行本 bridge 与 weixin-mcp daemon，
  否则消息会被先轮询的一方取走。
- **关闭扩展不会停止 bridge。** 扩展只能停止自己的轮询；bridge 是独立进程，
  需自行停止。bridge 的待处理队列有上限（默认 20 条）与过期时间
  （默认 5 分钟），避免长时间暂停后一次性涌入。
- 可通过环境变量调整：`BRIDGE_PORT`、`BRIDGE_MAX_PENDING`、
  `BRIDGE_PENDING_TTL_MS`、`WECHAT_BRIDGE_DIR`。

## 开发

扩展（仓库根目录）：

```bash
npm install
npm run build      # 产出 dist/index.js 与 dist/style.css
npm run typecheck
npm run dev        # 监听构建
```

bridge（`bridge/` 目录）：

```bash
node server.mjs
```

## 目录结构

```
.
├── manifest.json               扩展清单
├── src/                        扩展源码
│   ├── index.ts                入口
│   ├── App.vue                 根组件（悬浮球 + 面板）
│   ├── shell/                  悬浮球、面板、设置容器
│   ├── settings/               设置面板（drawer / panel 两个面）
│   ├── settings-page/          Extensions 抽屉
│   ├── features/               运行状态、消息记录
│   ├── host/                   唯一接触宿主 API 的层
│   └── app/                    运行时、状态、依赖注入
├── dist/                       扩展构建产物
└── bridge/                     bridge 服务
    ├── server.mjs
    ├── package.json
    └── start-bridge.ps1 / .bat
```

## 许可

MIT