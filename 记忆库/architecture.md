# 项目文件地图 · architecture.md

> 本文件用于记录「嘟嘟猪」个人网站的项目文件结构、各文件职责与依赖关系。
> 更新时间：2026-08-28
> 建议每次新增/删除文件后同步更新本文件。

---

## 一、目录总览

```
d:/Downloads/web/webpage/            ← 仓库根目录（GitHub Pages 根目录 = 网站根目录）
│
├── index.html                       ← 首页（网站入口）
├── article.html                     ← 博客文章页 1
├── happy.html                       ← 博客文章页 2
├── privacy.html                     ← 隐私政策页
├── weather.html                     ← 天气页（和风天气）
├── weather-和风.html                ← 天气页（和风，与 weather.html 重复）
├── weather-Fuzhou.html              ← 天气页（OpenWeatherMap，固定福州）
├── weather-openweathermap.html      ← 天气页（OpenWeatherMap，自动定位）
├── header.htm                       ← 百度统计代码片段
├── CNAME                            ← GitHub Pages 自定义域名解析
├── index.nginx-debian.html_welcome  ← ⚠️ nginx 默认欢迎页残留，可删除
│
├── static/
│   └── css/
│       └── index.css                ← 全站主要样式（Butterfly 主题风格）
│
├── images/                          ← 图片与视频资源
│   ├── 9981.jpg
│   ├── 毕设.jpg
│   ├── lv_avatar.png
│   ├── pikaqiu.jpg
│   ├── red_avatar.png
│   ├── red_avatar1.png
│   └── The_Diamond_Sutra.mp4
│
└── 记忆库/                          ← 项目文档（随仓库提交）
    ├── 网站情况.md                  ← 网站运行情况与维护记录
    └── architecture.md             ← 本文件：项目文件地图
```

---

## 二、各文件详细说明

### 2.1 根目录 HTML 页面

| 文件 | 类型 | 功能 | 关键依赖 |
|---|---|---|---|
| `index.html` | 页面 | **首页**：随机背景图、打字动画、个人卡片、一言、今日诗词、busuanzi 统计、文章列表、网易云音乐(MetingJS)、技能条、联系方式、快捷导航、雪花特效、看板娘(Live2D)、鼠标点击特效 | `static/css/index.css`、jQuery、MetingJS、Busuanzi、Live2D |
| `article.html` | 页面 | 博客文章 1（示例，含视频） | images 下 mp4（⚠️ 引用的视频文件不存在） |
| `happy.html` | 页面 | 博客文章 2（示例） | 同上 |
| `privacy.html` | 页面 | 隐私政策（⚠️ 内容为"拍车在线"公司条款，需替换） | 无 |
| `weather.html` | 页面 | 天气查询（和风天气，自动定位+手动输入） | 和风 devapi + geoapi，Key `d6a48009...` |
| `weather-和风.html` | 页面 | ⚠️ 与 weather.html 完全重复，建议删除 | 同 weather.html |
| `weather-Fuzhou.html` | 页面 | 天气查询（OpenWeatherMap，固定福州，`q=Fuzhou,CN`） | OWM API，Key `8321f900...` |
| `weather-openweathermap.html` | 页面 | 天气查询（OpenWeatherMap，自动定位+手动输入，经纬度查询） | OWM API + 和风 geoapi（中文城市名） |

### 2.2 配置/代码片段

| 文件 | 说明 |
|---|---|
| `CNAME` | 内容为 `webpage.dudufashion.cloudns.ph`，GitHub Pages 依赖它识别自定义域名，**不可删除** |
| `header.htm` | 百度统计脚本片段；由各页面用 jQuery `$.get` 动态注入 `<head>`（⚠️ 建议改为直接内联） |
| `index.nginx-debian.html_welcome` | ⚠️ 服务器 nginx 默认欢迎页残留，与网站功能无关，可删除 |

### 2.3 样式与资源

| 路径 | 说明 |
|---|---|
| `static/css/index.css` | 全站核心样式，约 330 行；结构：布局(#body-wrap/#nav/#page)、侧边栏卡片(#aside_content)、技能条(.skillbar)、快捷导航(.tool)、响应式(@media 768/900px 断点)；风格参考 Butterfly 主题 |
| `images/9981.jpg` | 图片资源 |
| `images/毕设.jpg` | 图片资源 |
| `images/lv_avatar.png` | 头像相关 |
| `images/pikaqiu.jpg` | 图片资源（皮卡丘） |
| `images/red_avatar.png` / `red_avatar1.png` | 头像相关 |
| `images/The_Diamond_Sutra.mp4` | 金刚经视频（article/happy 页实际未引用它，可能为待用资源） |

---

## 三、页面间导航关系

```
首页 index.html
 ├─→ 文章：article.html、happy.html（文章列表卡片）
 ├─→ 天气：无链接 ⚠️（首页快捷导航未包含天气入口）
 ├─→ 隐私：privacy.html（页脚链接）
 └─→ 子页面返回首页：仅靠底部链接（无统一顶部导航栏 ⚠️）
```

**现状缺口：**
- 首页无天气入口链接
- 子页面之间无统一导航栏（header.htm 只有统计代码）
- article/happy 页无独立样式（共用 index.css？需确认）

---

## 四、外部资源依赖清单

| 类型 | 具体资源 | 用途 |
|---|---|---|
| CDN | jQuery 3.6.4（code.jquery.com）+ jQuery 3.4.1（jsdelivr） | ⚠️ 重复加载，应只留一份 |
| CDN | MetingJS / APlayer | 网易云音乐播放 |
| CDN | Busuanzi | 访问量统计 |
| CDN | Live2D 看板娘资源 | 首页装饰 |
| API | 和风天气 devapi + geoapi | 天气数据 + 中文地理编码 |
| API | OpenWeatherMap weather + geo | 天气数据 + 地理编码 |
| API | 一言 / 今日诗词 | 首页文案 |
| API | 随机图片 | 首页背景图 |

---

## 五、Key / 敏感信息位置索引

> ⚠️ 均为前端硬编码，查看源码即泄露；缓解方案见 `网站情况.md` 第七节。

| Key | 所在文件 | 所属服务 |
|---|---|---|
| `d6a480091f2249fbb54ed3f04a4f1d74` | weather.html、weather-和风.html、weather-openweathermap.html | 和风天气 |
| `8321f900611d373f58039530b8a1a9ae` | weather-Fuzhou.html、weather-openweathermap.html | OpenWeatherMap |

---

## 六、新增文件规范（Checklist）

新增页面/资源时建议：
1. 文件放仓库根目录（= 网站根目录），中文文件名会导致 URL 需编码，**建议用英文命名**
2. 首页/子页面如有入口需求，同步更新 `index.html` 快捷导航或页脚
3. 若依赖新 CDN/API，更新本文档第四节
4. 若为天气相关页面，注意复用已有的 `windLevel()`、中文地址解析逻辑
5. 更新 `记忆库/网站情况.md` 第二节文件结构表
