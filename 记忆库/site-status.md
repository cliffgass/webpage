# 嘟嘟猪个人网站 · 情况记录

> 记录时间：2026-08-28
> 最近更新：2026-08-28（天气功能修复与优化）

---

## 一、网站基本信息

| 项目 | 内容 |
|---|---|
| 网站名称 | 嘟嘟猪（DuDuPig） |
| 访问域名 | `https://webpage.dudufashion.cloudns.ph/` |
| 部署平台 | GitHub Pages（静态托管，纯前端，无后端） |
| 域名解析 | 通过 ClouDNS（cloudns.ph）CNAME 到 GitHub Pages |
| 仓库 | GitHub（master 分支，工作区为 d:/Downloads/web/webpage） |
| 技术栈 | 原生 HTML / CSS / JS，无构建工具，大量 CDN 依赖 |
| 统计 | busuanzi（访问量）+ 百度统计（header.htm）+ Google Analytics |

## 二、文件结构与功能

| 文件 | 功能 |
|---|---|
| `index.html` | 首页：随机背景图、打字动画、个人卡片、一言、今日诗词、站点统计、文章链接、音乐（MetingJS 网易云）、技能条、联系方式、快捷导航、雪花特效、看板娘(Live2D)、鼠标点击特效 |
| `article.html` | 博客文章页 1（示例） |
| `happy.html` | 博客文章页 2（示例） |
| `privacy.html` | 隐私政策页（⚠️ 内容疑似复制自"拍车在线"公司，与本站无关，建议替换） |
| `weather.html` | 天气页（和风天气 API，自动定位 + 手动输入） |
| `weather-和风.html` | ⚠️ 与 weather.html 内容完全相同，冗余文件，建议删除 |
| `weather-Fuzhou.html` | 天气页（OpenWeatherMap，固定福州） |
| `weather-openweathermap.html` | 天气页（OpenWeatherMap，自动定位 + 手动输入） |
| `header.htm` | 百度统计代码（动态注入 head，建议直接内联） |
| `CNAME` | 自定义域名解析文件 |
| `static/css/index.css` | 首页样式 |
| `images/` | 图片与视频资源 |
| `site-status.md` | 本文件：网站运行情况与维护记录 |
| `architecture.md` | 项目文件地图（文件结构说明，详见同目录文件） |

## 三、使用的第三方 API

### 3.1 和风天气（QWeather）
- **Key**：`d6a480091f2249fbb54ed3f04a4f1d74` ⚠️
- **接口**：
  - 天气：`https://devapi.qweather.com/v7/weather/now`
  - 地理编码：`https://geoapi.qweather.com/v2/city/lookup`（支持经纬度或城市名）
- **Key 位置**：`weather.html`、`weather-和风.html`、`weather-openweathermap.html`

### 3.2 OpenWeatherMap
- **Key**：`8321f900611d373f58039530b8a1a9ae` ⚠️
- **接口**：
  - 天气：`https://api.openweathermap.org/data/2.5/weather`（`units=metric` 时温度℃、风速 m/s）
  - 地理编码：`https://api.openweathermap.org/geo/1.0/direct`
  - 反向地理编码：`https://api.openweathermap.org/geo/1.0/reverse`
- **Key 位置**：`weather-Fuzhou.html`、`weather-openweathermap.html`

> ⚠️ **安全警告**：所有 Key 均硬编码在前端源码中，任何人查看网页源码即可盗用。
> 缓解措施（见第七节"待办事项"）：和风控制台配置域名白名单、必要时换 Key、可选 Cloudflare Worker 代理。

## 四、2026-08-28 已完成修改

### 4.1 修复 weather-openweathermap.html 数据错误
- **问题**：自动定位时把反向地理编码返回的**区县名**（如"鼓楼区"）当城市名传给 `q=` 查询，OpenWeatherMap 对中文区县名匹配极不稳定，且中国重名区县多（鼓楼、朝阳等），导致返回**别处城市**的天气。
- **修复**：天气数据统一改用经纬度查询 `weather?lat=...&lon=...`（全球唯一无歧义）；反向地理编码仅用于显示位置名。

### 4.2 天气页显示完整中文城市信息
- **问题**：OpenWeatherMap 反向地理编码对中文位置只返回拼音/英文（如 `Jin'an`），且无省市层级。
- **修复**：用和风 `city/lookup?location=lon,lat` 解析中文地址，显示格式为 `中国·福建省·福州市·晋安`。
- **说明**：`weather-openweathermap.html` 新增常量 `QWEATHER_KEY`，与 weather.html 复用同一把和风 Key。

### 4.3 风速单位统一为公里/小时 + 风力等级
- **背景**：OWM 返回 m/s，和风返回 km/h，两个页面显示不一致（如 1.6 m/s vs 19 km/h），无法直接对比。
- **标准**：统一为 **km/h**（中国气象局及天气 App 通用），并附带**蒲福风级**（中国用户习惯说法）。
- **实现**：
  - `weather-openweathermap.html`：`风速 = m/s × 3.6`，显示 `x.x 公里/小时（N级风）`
  - `weather.html` / `weather-和风.html`：显示 `x公里/小时（N级风）`
  - 新增共用函数 `windLevel(kmh)`：风级阈值 `[1,5,11,19,28,38,49,61,74,88,102,117]`
- **weather-Fuzhou.html**：无风速展示，未修改。

## 五、已知问题（待修复）

1. **视频 404**：`article.html`、`happy.html` 引用 `images/shuizhusanguo-WeChat_20230531154934.mp4`，但 images 目录下无此文件（实际有 `The_Diamond_Sutra.mp4`），视频无法播放。
2. **jQuery 重复加载**：`index.html` 第 23 行加载 jQuery 3.6.4，第 228 行又加载 jQuery 3.4.1。
3. **天气页面冗余**：`weather.html` 与 `weather-和风.html` 内容完全相同，建议删除后者。
4. **首页无天气入口**：快捷导航没有天气链接，访客只能直接输网址访问。
5. **SEO 差**：所有页面 `<title>` 均为"嘟嘟猪"；无 `sitemap.xml`、`robots.txt`、自定义 `404.html`。
6. **隐私政策不匹配**：`privacy.html` 内容为"拍车在线"公司的条款，需替换为本站自己的。
7. **中文文件名**：`weather-和风.html`、`images/毕设.jpg` 等中文文件名导致 URL 需编码，建议改为英文命名。

## 六、建议新增功能（按优先级）

### 第一梯队（纯前端即可实现）
- **在线工具箱**：JSON 格式化、Base64 编解码、时间戳↔日期、MD5/SHA 哈希、URL 编码、二维码生成、颜色转换
- **统一导航栏**：所有子页面共用（首页/博客/工具箱/天气/关于）
- **返回顶部按钮**
- **暗色模式切换**：CSS 变量 + localStorage 记忆

### 第二梯队（互动与内容）
- **评论系统**：Giscus / Utterances（基于 GitHub Issues，免费无后端）
- **文章列表动态化**：articles.json + JS 渲染，替代手写 HTML
- **友链页面**

### 第三梯队（体验与运营）
- **PWA 支持**：manifest.json + Service Worker，可安装到桌面、离线缓存
- **7 天天气预报 + 空气质量**：和风 `v7/weather/7d`、`v7/air/now`
- **SEO 三件套**：sitemap.xml、robots.txt、404.html

## 七、待办事项

- [ ] 和风天气控制台配置**域名白名单**（`webpage.dudufashion.cloudns.ph`），缓解 Key 泄露
- [ ] 修复 article.html / happy.html 的视频 404
- [ ] 删除冗余文件 `weather-和风.html`（或重命名为英文并保留）
- [ ] 首页快捷导航添加天气入口
- [ ] 移除重复的 jQuery 加载
- [ ] 替换 privacy.html 为本站隐私政策
- [ ] （可选）用 Cloudflare Worker 做 API 代理，彻底隐藏 Key
- [ ] （可选）实现第六节建议功能

## 八、Git 推送流程（部署）

```bash
git add <修改的文件>
git commit -m "说明"
git push
```

推送后 1-2 分钟生效，GitHub Pages 自动部署。
