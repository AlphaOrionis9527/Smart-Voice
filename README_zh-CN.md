# Handy

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/WVBeWsNXK4)

**一个免费、开源、可扩展的完全离线工作的语音转文本应用程序。**

Handy 是一个使用 Tauri (Rust + React/TypeScript) 构建的跨平台桌面应用程序，提供简单、注重隐私的语音转录功能。按下快捷键，说话，然后让你的文字出现在任何文本字段中——所有这些都不需要将你的声音发送到云端。

## 为什么选择 Handy？

Handy 的创建是为了填补一个真正开源、可扩展的语音转文本工具的空白。正如 [handy.computer](https://handy.computer) 上所述：

- **免费**：辅助工具应该掌握在每个人手中，而不是在付费墙后面
- **开源**：我们可以一起进一步构建。为自己扩展 Handy 并为更大的事业做出贡献
- **隐私**：你的声音留在你的电脑上。无需将音频发送到云端即可获得转录
- **简单**：一个工具，一个工作。转录你说的话并将其放入文本框

Handy 并不试图成为最好的语音转文本应用程序——它试图成为最容易分叉的应用程序。

## 工作原理

1. **按下**可配置的键盘快捷键开始/停止录制（或使用按键通话模式）
2. **说话**，同时快捷键处于激活状态
3. **释放**后，Handy 使用 Whisper 处理你的语音
4. **获取**转录文本，直接粘贴到你正在使用的任何应用程序中

整个过程完全在本地进行：

- 使用 Silero 的 VAD（语音活动检测）过滤静音
- 转录使用你选择的模型：
  - **Whisper 模型**（Small/Medium/Turbo/Large），在可用时使用 GPU 加速
  - **Parakeet V3** - CPU 优化模型，具有出色的性能和自动语言检测
- 适用于 Windows、macOS 和 Linux

## 快速开始

### 安装

1. 从 [发布页面](https://github.com/cjpais/Handy/releases) 或 [网站](https://handy.computer) 下载最新版本
2. 按照平台特定说明安装应用程序
3. 启动 Handy 并授予必要的系统权限（麦克风、辅助功能）
4. 在设置中配置你喜欢的键盘快捷键
5. 开始转录！

### 开发设置

有关详细的构建说明，包括平台特定要求，请参阅 [BUILD.md](BUILD.md)。

## 架构

Handy 是作为 Tauri 应用程序构建的，结合了：

- **前端**：React + TypeScript 与 Tailwind CSS 用于设置 UI
- **后端**：Rust 用于系统集成、音频处理和 ML 推理
- **核心库**：
  - `whisper-rs`：使用 Whisper 模型进行本地语音识别
  - `transcription-rs`：CPU 优化的语音识别，使用 Parakeet 模型
  - `cpal`：跨平台音频 I/O
  - `vad-rs`：语音活动检测
  - `rdev`：全局键盘快捷键和系统事件
  - `rubato`：音频重采样

### 调试模式

Handy 包含一个高级调试模式，用于开发和故障排除。通过按以下键访问：

- **macOS**：`Cmd+Shift+D`
- **Windows/Linux**：`Ctrl+Shift+D`

## 已知问题和当前限制

这个项目正在积极开发中，存在一些 [已知问题](https://github.com/cjpais/Handy/issues)。我们相信对当前状态保持透明：

### 主要问题（需要帮助）

**Whisper 模型崩溃：**

- Whisper 模型在某些系统配置（Windows 和 Linux）上崩溃
- 不会影响所有系统 - 问题取决于配置
  - 如果你遇到崩溃并且是开发者，请帮助修复并提供调试日志！

**Wayland 支持（Linux）：**

- 对 Wayland 显示服务器的支持有限或不支持

### 平台支持

- **macOS（Intel 和 Apple Silicon）**
- **x64 Windows**
- **x64 Linux**

### 系统要求/建议

以下是在你自己的机器上运行 Handy 的建议。如果你不满足系统要求，应用程序的性能可能会下降。我们正在努力提高各种计算机和硬件的性能。

**对于 Whisper 模型：**

- **macOS**：M 系列 Mac，Intel Mac
- **Windows**：Intel、AMD 或 NVIDIA GPU
- **Linux**：Intel、AMD 或 NVIDIA GPU
  - Ubuntu 22.04、24.04

**对于 Parakeet V3 模型：**

- **仅 CPU 操作** - 可在各种硬件上运行
- **最低要求**：Intel Skylake（第 6 代）或同等 AMD 处理器
- **性能**：在中端硬件上约为实时速度的 5 倍（在 i5 上测试）
- **自动语言检测** - 无需手动选择语言

## 路线图和积极开发

我们正在积极开发几个功能和改进。欢迎贡献和反馈！

### 进行中

**调试日志：**

- 添加调试日志到文件以帮助诊断问题

**macOS 键盘改进：**

- 支持 Globe 键作为转录触发器
- 重写 macOS 全局快捷键处理，可能还有其他操作系统

**可选分析：**

- 收集匿名使用数据以帮助改进 Handy
- 以隐私为先的方法，明确选择加入

**设置重构：**

- 清理和重构变得臃肿和混乱的设置系统
- 为设置管理实现更好的抽象

**Tauri 命令清理：**

- 抽象和组织 Tauri 命令模式
- 研究 tauri-specta 以提高类型安全性和组织性

## 故障排除

### 手动模型安装（适用于代理用户或网络限制）

如果你在代理、防火墙或受限网络环境中，Handy 无法自动下载模型，你可以手动下载并安装它们。URL 可从任何浏览器公开访问。

#### 步骤 1：找到你的应用数据目录

1. 打开 Handy 设置
2. 导航到 **关于** 部分
3. 复制那里显示的 "应用数据目录" 路径，或使用快捷键：
   - **macOS**：`Cmd+Shift+D` 打开调试菜单
   - **Windows/Linux**：`Ctrl+Shift+D` 打开调试菜单

典型路径是：

- **macOS**：`~/Library/Application Support/com.pais.handy/`
- **Windows**：`C:\Users\{username}\AppData\Roaming\com.pais.handy\`
- **Linux**：`~/.config/com.pais.handy/`

#### 步骤 2：创建模型目录

在你的应用数据目录中，如果还不存在，创建一个 `models` 文件夹：

```bash
# macOS/Linux
mkdir -p ~/Library/Application\ Support/com.pais.handy/models

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$env:APPDATA\com.pais.handy\models"
```

#### 步骤 3：下载模型文件

从下面下载你想要的模型

**Whisper 模型（单个 .bin 文件）：**

- Small (487 MB)：`https://blob.handy.computer/ggml-small.bin`
- Medium (492 MB)：`https://blob.handy.computer/whisper-medium-q4_1.bin`
- Turbo (1600 MB)：`https://blob.handy.computer/ggml-large-v3-turbo.bin`
- Large (1100 MB)：`https://blob.handy.computer/ggml-large-v3-q5_0.bin`

**Parakeet 模型（压缩档案）：**

- V2 (473 MB)：`https://blob.handy.computer/parakeet-v2-int8.tar.gz`
- V3 (478 MB)：`https://blob.handy.computer/parakeet-v3-int8.tar.gz`

#### 步骤 4：安装模型

**对于 Whisper 模型（.bin 文件）：**

只需将 `.bin` 文件直接放入 `models` 目录：

```
{app_data_dir}/models/
├── ggml-small.bin
├── whisper-medium-q4_1.bin
├── ggml-large-v3-turbo.bin
└── ggml-large-v3-q5_0.bin
```

**对于 Parakeet 模型（.tar.gz 档案）：**

1. 解压 `.tar.gz` 文件
2. 将 **解压后的目录** 放入 `models` 文件夹
3. 目录名称必须完全如下：
   - **Parakeet V2**：`parakeet-tdt-0.6b-v2-int8`
   - **Parakeet V3**：`parakeet-tdt-0.6b-v3-int8`

最终结构应如下所示：

```
{app_data_dir}/models/
├── parakeet-tdt-0.6b-v2-int8/     (目录内有模型文件)
│   ├── (模型文件)
│   └── (配置文件)
└── parakeet-tdt-0.6b-v3-int8/     (目录内有模型文件)
    ├── (模型文件)
    └── (配置文件)
```

**重要说明：**

- 对于 Parakeet 模型，解压后的目录名称 **必须** 与上面显示的完全匹配
- 不要重命名 Whisper 模型的 `.bin` 文件——使用下载 URL 中的准确文件名
- 放置文件后，重启 Handy 以检测新模型

#### 步骤 5：验证安装

1. 重启 Handy
2. 打开设置 → 模型
3. 你手动安装的模型现在应该显示为 "已下载"
4. 选择你想要使用的模型并测试转录

### 如何贡献

1. **检查现有问题** 在 [github.com/cjpais/Handy/issues](https://github.com/cjpais/Handy/issues)
2. **分叉仓库** 并创建功能分支
3. **在目标平台上彻底测试**
4. **提交拉取请求** 并清晰描述更改
5. **加入讨论** - 通过 [contact@handy.computer](mailto:contact@handy.computer) 联系

目标是创建一个有用的工具和其他人可以构建的基础——一个模式良好、简单的代码库，为社区服务。

## 赞助商

<div align="center">
  我们感谢赞助商的支持，他们帮助使 Handy 成为可能：
  <br><br>
  <a href="https://wordcab.com">
    <img src="sponsor-images/wordcab.png" alt="Wordcab" width="120" height="120">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/epicenter-so/epicenter">
    <img src="sponsor-images/epicenter.png" alt="Epicenter" width="120" height="120">
  </a>
</div>

## 相关项目

- **[Handy CLI](https://github.com/cjpais/handy-cli)** - 原始 Python 命令行版本
- **[handy.computer](https://handy.computer)** - 项目网站，包含演示和文档

## 许可证

MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 致谢

- **OpenAI 的 Whisper** 用于语音识别模型
- **whisper.cpp 和 ggml** 用于出色的跨平台 whisper 推理/加速
- **Silero** 用于出色的轻量级 VAD
- **Tauri 团队** 用于出色的基于 Rust 的应用框架
- **社区贡献者** 帮助使 Handy 变得更好

---

"你寻找合适的语音转文本工具的搜索可以在这里结束——不是因为 Handy 是完美的，而是因为你可以让它对你来说是完美的。"