# ai-engineering-playbook

一套可直接使用的 Claude Code 工程化配置，涵盖全局行为规则、子代理、Hooks、MCP 和项目模板。

---

## 目录结构

```
.
├── install.sh                        # 一键安装脚本
├── hooks/
│   ├── block-dangerous.sh            # 危险命令拦截
│   └── protect-sensitive.sh          # 敏感文件保护
└── templates/
    ├── project-CLAUDE.md             # 项目级 CLAUDE.md 模板
    └── project-settings.json         # 项目级 settings.json 模板
```

> 全局 CLAUDE.md 和 settings.json 由 `install.sh` 写入 `~/.claude/`。

---

## 快速开始

```bash
git clone https://github.com/your-username/ai-engineering-playbook.git
cd ai-engineering-playbook
chmod +x install.sh
./install.sh
```

`install.sh` 会：
1. 写入 `~/.claude/CLAUDE.md`（全局行为规则）
2. 写入 `~/.claude/settings.json`（全局权限 + Hooks 注册）
3. 写入 `~/.claude/agents/`（三个子代理）
4. 复制 `hooks/` 到 `~/.claude/hooks/` 并设置可执行权限
5. 复制 `templates/` 到 `~/.claude/templates/`

---

## Skills 安装

### superpowers

通过 Claude Code 官方插件市场安装：

在 Claude Code 中打开插件市场，搜索 `Superpowers` 并安装。安装后自动对所有项目生效，无需额外配置。

> 官方插件市场地址：https://claude.com/plugins/superpowers

### andrej-karpathy-skills

**方式一：Claude Code Plugin（推荐，全局生效）**

在 Claude Code 中执行：

```
/plugin marketplace add forrestchang/andrej-karpathy-skills
```

然后安装插件：

```
/plugin install andrej-karpathy-skills@karpathy-skills
```

**方式二：写入 CLAUDE.md（仅当前项目）**

新项目：

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

已有 CLAUDE.md 的项目（追加）：

```bash
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

### 排查已安装的 Skills / Plugin

查看当前所有已安装的插件：

```
/plugin list
```

查看某个插件的详细信息（加载状态、版本、来源）：

```
/plugin info andrej-karpathy-skills
```

如果插件没有生效，检查是否正确加载：

```
/plugin status
```

输出中 `active` 表示已加载，`inactive` 或缺失表示安装失败，重新执行安装命令即可。

### 卸载

**卸载 Plugin 方式安装的 Skills：**

```
/plugin uninstall andrej-karpathy-skills
```

**卸载 CLAUDE.md 方式安装的 Skills：**

手动打开对应的 `CLAUDE.md`，删除追加进去的内容段落即可。如果是新建文件方式：

```bash
rm CLAUDE.md
```

**卸载 superpowers：**

在 Claude Code 插件市场找到 Superpowers，点击卸载；或执行：

```
/plugin uninstall superpowers
```

---

## MCP 配置

### GitHub MCP

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp \
  -H "Authorization: Bearer YOUR_GITHUB_PAT"
```

覆盖能力：创建/更新 Issue、提交 PR、查看 PR 评论、搜索仓库。

### Playwright MCP（E2E 测试）

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

适用场景：前端 E2E 测试、桌面应用 UI 测试。需要显式触发（"用 Playwright 跑 E2E"）。

### Fetch MCP（网页内容获取）

```bash
claude mcp add fetch npx @anthropic-ai/mcp-server-fetch
```

### Context7（实时文档查询）

```bash
claude mcp add context7 npx -y @upstash/context7-mcp@latest
```

解决训练数据过时问题，实时查询任何库的最新官方文档。注册免费账号可获得更高配额。

> ⚠️ 日常保持 MCP 总数 ≤ 8 个，避免上下文窗口压力。

---

## 标准开发工作流

### 1. 初始化项目

在项目根目录执行：

```
/init
```

Claude 会读取模板、询问项目信息，然后生成 `.claude/CLAUDE.md` 和 `.claude/settings.json`，确认后写入。

---

### 2. 提需求

直接用自然语言描述要做什么，不需要特殊格式。

```
用户登录页面需要支持手机号 + 验证码登录，同时保留原来的邮箱密码登录入口
```

---

### 3. 写方案

触发 `write-plans` 行为，配合 task-planner 子代理输出结构化方案：

```
用 write-plans 帮我分析一下这个需求，输出实现方案
```

Claude 主进程会先给出初步方向，task-planner 子代理补充风险标注和步骤依赖关系。

---

### 4. 拆任务

方案确认后，让 task-planner 输出可执行的编号步骤：

```
帮我把这个方案拆解成具体的实现步骤，标注每步的风险级别和依赖关系
```

**确认步骤列表后再开始执行**，这是避免方向错误的关键节点。

---

### 5. 写测试

测试先行或与实现同步，由 test-writer 子代理负责：

```
给 src/auth/sms-login.ts 写测试，覆盖验证码发送和校验两个场景
```

test-writer 只操作测试文件，不碰业务代码。

---

### 6. 执行方案

按步骤逐步实现，高风险操作（删除、数据库变更、配置修改）Claude 会暂停等你确认：

```
按照第 3 步实现验证码校验逻辑
```

---

### 7. Code Review

实现完成后触发 code-reviewer 子代理做只读审查：

```
给这次改动做 code review，重点看安全性和边界条件
```

输出格式：🔴 必须修复 / 🟡 建议改进 / 🟢 值得保留，最后给出一句总体评价。

---

### 8. GitHub 互动

#### 创建 PR

```
帮我创建一个 PR，标题「feat(auth): add SMS login」，描述包含改动内容和测试方法
```

#### 处理 Issue

```
看一下 Issue #42 的内容，帮我分析一下复现步骤，然后在 Issue 下回复一个处理计划
```

#### 查看 CI 状态

```
查一下当前 PR 的 CI 结果，如果有失败的 job 告诉我错误日志
```

---

### 9. 修 Bug（随时触发）

Bug 修复是独立场景，不在线性流程中，随时可以打断：

```
刚才发现登录页在 iOS Safari 上验证码输入框无法聚焦，帮我排查一下
```

Claude 会先读相关代码定位问题，高风险改动前暂停确认。

---

## 各模块说明

### 子代理

| 代理 | 权限 | 用途 |
|------|------|------|
| `task-planner` | 只读 | 拆解需求，输出带风险标注的步骤列表 |
| `test-writer` | 读写（仅测试文件） | 生成单元/集成/组件测试 |
| `code-reviewer` | 只读 | 结构化代码审查，不修改文件 |

### Hooks

| 文件 | 触发时机 | 作用 |
|------|---------|------|
| `block-dangerous.sh` | PreToolUse (Bash) | 拦截 `rm -rf`、`git push --force`、`DROP TABLE` 等 |
| `protect-sensitive.sh` | PreToolUse (Write/Edit) | 保护 `.env`、lockfile、`.git/config` 等文件 |

### 全局权限策略

- **自动放行**：git、npm/pnpm/yarn、pip、cargo、go、make、docker、基础文件读写
- **明确拒绝**：`rm -rf`、强推、`chmod 777`、DROP 语句、`.env` 的读写编辑

---

## 备份与回滚

### 备份

```bash
cp -r ~/.claude ~/.claude.backup.$(date +%Y%m%d)
```

### Claude Code 内置回退

`Esc × 2` 触发回退选项：

| 策略 | 适用场景 |
|------|---------|
| 恢复代码 + 对话 | 方向完全错了，一切重来 |
| 仅恢复对话 | 代码没问题，重新描述需求 |
| 从此处总结继续 | 保留成果，换个思路继续 |

> ⚠️ bash 命令执行无法通过检查点回退，这是 Hooks 拦截存在的意义。

### 手动回滚

```bash
rm -rf ~/.claude
mv ~/.claude.backup.YYYYMMDD ~/.claude
```

---

## Contributing

提 Issue 或 PR 均欢迎。改动请遵循现有的 commit 格式：`type(scope): description`。

## License

MIT
