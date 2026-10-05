# Loyal Bridge 静态网站

这是从原网站内容重新整理并美化后的静态版本，可直接部署到 GitHub Pages。所有图片已经保存在 `assets/`，页面不依赖原建站平台或后端服务。

## 文件结构

```text
.
├── index.html      # 页面内容
├── styles.css      # 页面样式与响应式布局
├── script.js       # 移动菜单、导航高亮等交互
├── assets/         # 本地图片资源
├── .nojekyll       # 禁止 GitHub Pages 使用 Jekyll 处理
└── README.md       # 使用与发布说明
```

## 本地预览

可以直接双击 `index.html`。如需更接近线上环境，也可在当前目录运行：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 发布到 GitHub Pages（网页操作，最简单）

1. 登录 [GitHub](https://github.com/)，右上角点击 `+` → `New repository`。
2. Repository name 建议填写 `loyalbridge`。选择 `Public`，然后点击 `Create repository`。
3. 在新仓库首页点击 `uploading an existing file`。
4. 将本目录下的全部文件和 `assets` 文件夹拖入上传区域，填写提交说明，例如 `Initial website`，再点击 `Commit changes`。
5. 打开仓库的 `Settings` → 左侧 `Pages`。
6. 在 `Build and deployment` 下，将 Source 设为 `Deploy from a branch`。
7. Branch 选择 `main`，目录选择 `/(root)`，点击 `Save`。
8. 等待约 1–5 分钟，页面顶部会显示网址：`https://你的用户名.github.io/loyalbridge/`。

## 使用 Git 命令发布

在本目录打开终端，依次执行（替换用户名和仓库名）：

```bash
git init
git add .
git commit -m "Initial Loyal Bridge website"
git branch -M main
git remote add origin https://github.com/你的用户名/loyalbridge.git
git push -u origin main
```

然后仍需到 GitHub 仓库的 `Settings` → `Pages`，选择 `main` 和 `/(root)` 并保存。

## 绑定 `www.loyalbridge.net`

先确保 GitHub Pages 默认网址可以正常打开，再进行域名绑定：

1. 在仓库 `Settings` → `Pages` → `Custom domain` 中填写 `www.loyalbridge.net` 并保存。
2. 到当前域名 DNS 管理后台添加或修改一条 CNAME 记录：

```text
主机记录：www
记录类型：CNAME
记录值：你的用户名.github.io
```

3. DNS 生效后回到 GitHub Pages，勾选 `Enforce HTTPS`。
4. 若还要让裸域名 `loyalbridge.net` 自动跳转至 `www.loyalbridge.net`，可在域名服务商处设置 URL 转发；或按 GitHub 文档为裸域名配置 A/AAAA 记录。

注意：切换前请保留原平台设置和 DNS 记录截图。DNS 修改可能需要数分钟到 48 小时生效；确认 GitHub 新站无误后再取消旧平台服务。

## 后续修改

- 文案：编辑 `index.html`
- 颜色和布局：编辑 `styles.css` 顶部的 CSS 变量
- 图片：替换 `assets/` 中同名文件
- 联系方式：在 `index.html` 中搜索 `loyalbridge@outlook.jp` 或电话号码

每次修改后提交并推送到 `main` 分支，GitHub Pages 会自动重新发布。
