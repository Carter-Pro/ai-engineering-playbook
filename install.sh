#!/bin/bash
# install.sh — ai-engineering-playbook 一键安装脚本
# 将配置文件部署到 ~/.claude/，并在覆盖前自动备份

set -euo pipefail

# ── 颜色 ──────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()    { echo -e "${GREEN}[✓]${NC} $*"; }
warn()    { echo -e "${YELLOW}[!]${NC} $*"; }
error()   { echo -e "${RED}[✗]${NC} $*" >&2; }

# ── 路径 ──────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"
BACKUP_DIR="$CLAUDE_DIR/backups/$(date +%Y%m%d_%H%M%S)"

# ── 工具函数 ──────────────────────────────────────────

# 备份一个文件（若存在）
backup_if_exists() {
  local target="$1"
  if [[ -f "$target" ]]; then
    local relative="${target#$CLAUDE_DIR/}"
    local backup_path="$BACKUP_DIR/$relative"
    mkdir -p "$(dirname "$backup_path")"
    cp "$target" "$backup_path"
    warn "已备份 $relative → backups/$(basename "$BACKUP_DIR")/$relative"
  fi
}

# 安装一个文件
install_file() {
  local src="$1"       # 仓库内相对路径（相对于 SCRIPT_DIR）
  local dest="$2"      # 目标绝对路径

  if [[ ! -f "$SCRIPT_DIR/$src" ]]; then
    error "源文件不存在：$src（跳过）"
    return
  fi

  mkdir -p "$(dirname "$dest")"
  backup_if_exists "$dest"
  cp "$SCRIPT_DIR/$src" "$dest"
  info "安装 $src → ${dest/$HOME/\~}"
}

# ── 开始安装 ──────────────────────────────────────────
echo ""
echo "=== ai-engineering-playbook 安装脚本 ==="
echo "目标目录：$CLAUDE_DIR"
echo "备份目录：${BACKUP_DIR/$HOME/\~}"
echo ""

mkdir -p "$CLAUDE_DIR"/{agents,hooks,templates}

# 全局 CLAUDE.md
install_file "global/CLAUDE.md"        "$CLAUDE_DIR/CLAUDE.md"

# 全局 settings.json（谨慎：会覆盖已有配置）
install_file "global/settings.json"    "$CLAUDE_DIR/settings.json"

# 子代理
install_file "agents/code-reviewer.md" "$CLAUDE_DIR/agents/code-reviewer.md"
install_file "agents/task-planner.md"  "$CLAUDE_DIR/agents/task-planner.md"
install_file "agents/test-writer.md"   "$CLAUDE_DIR/agents/test-writer.md"

# Hooks
install_file "hooks/block-dangerous.sh"    "$CLAUDE_DIR/hooks/block-dangerous.sh"
install_file "hooks/protect-sensitive.sh"  "$CLAUDE_DIR/hooks/protect-sensitive.sh"

# 赋予 hooks 执行权限
chmod +x "$CLAUDE_DIR/hooks/block-dangerous.sh"
chmod +x "$CLAUDE_DIR/hooks/protect-sensitive.sh"
info "hooks 已赋予执行权限"

# 模板
install_file "templates/project-CLAUDE.md"      "$CLAUDE_DIR/templates/project-CLAUDE.md"
install_file "templates/project-settings.json"  "$CLAUDE_DIR/templates/project-settings.json"

# ── 完成提示 ──────────────────────────────────────────
echo ""
echo "=== 安装完成 ==="
echo ""
echo "📁 已安装的文件："
find "$CLAUDE_DIR" -not -path "$CLAUDE_DIR/backups/*" \
                   -not -path "$CLAUDE_DIR/projects/*" \
                   -not -path "$CLAUDE_DIR/skills/*" \
                   -type f | sort | sed "s|$HOME|~|g" | sed 's/^/   /'
echo ""

# 检查备份目录是否有内容
if [[ -d "$BACKUP_DIR" ]]; then
  echo "💾 备份文件位于：${BACKUP_DIR/$HOME/\~}"
  echo "   如需回滚，手动复制备份文件到对应位置即可。"
else
  echo "ℹ️  无已有文件被覆盖，未创建备份。"
fi

echo ""
echo "⚠️  注意：MCP 配置需单独运行 claude mcp add 命令，请参考方案文档。"
echo ""
