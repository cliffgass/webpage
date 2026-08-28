/*!
 * 嘟嘟猪个人网站 · 公共脚本
 * 功能：统一顶部导航栏 + 暗色/亮色模式切换
 * 使用：在任意页面 </body> 前引入 <script src="static/js/common.js"></script>
 */
(function () {
    'use strict';

    var THEME_KEY = 'dudupig-theme';
    var NAV_ID = 'site-top-nav';
    var TOGGLE_ID = 'theme-toggle';

    // 防止重复注入
    if (document.getElementById(NAV_ID)) return;

    /* ================= 样式 ================= */
    var css = [
        /* ---- 顶部导航栏 ---- */
        '#' + NAV_ID + '{position:sticky;top:0;z-index:1000;background:rgba(73,177,245,.94);box-shadow:0 2px 8px rgba(0,0,0,.08);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);}',
        '#' + NAV_ID + ' .site-nav-inner{max-width:1100px;margin:0 auto;height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;}',
        '#' + NAV_ID + ' .site-nav-brand{color:#fff;font-weight:700;font-size:16px;text-decoration:none;letter-spacing:1px;white-space:nowrap;}',
        '#' + NAV_ID + ' .site-nav-links{display:flex;gap:2px;}',
        '#' + NAV_ID + ' .site-nav-links a{color:#fff;text-decoration:none;font-size:14px;padding:5px 14px;border-radius:16px;opacity:.85;transition:all .2s;white-space:nowrap;}',
        '#' + NAV_ID + ' .site-nav-links a:hover{opacity:1;background:rgba(255,255,255,.18);}',
        '#' + NAV_ID + ' .site-nav-links a.active{opacity:1;background:rgba(255,255,255,.26);font-weight:600;}',
        '@media (max-width:560px){#' + NAV_ID + ' .site-nav-inner{padding:0 8px;height:44px;}#' + NAV_ID + ' .site-nav-brand{font-size:14px;}#' + NAV_ID + ' .site-nav-links a{padding:4px 9px;font-size:13px;}}',

        /* ---- 暗色切换按钮 ---- */
        '#' + TOGGLE_ID + '{position:fixed;right:20px;bottom:20px;width:44px;height:44px;border-radius:50%;border:none;background:#49b1f5;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(73,177,245,.4);z-index:1001;transition:transform .2s,background .3s;}',
        '#' + TOGGLE_ID + ':hover{transform:scale(1.1);}',
        '@media (max-width:560px){#' + TOGGLE_ID + '{right:12px;bottom:12px;width:40px;height:40px;}}',

        /* ================= 暗色模式 ================= */
        '[data-theme="dark"] body{background:#121212 !important;color:#c9d1d9;}',
        '[data-theme="dark"] h1,[data-theme="dark"] h2,[data-theme="dark"] h3,[data-theme="dark"] h4,[data-theme="dark"] h5,[data-theme="dark"] h6{color:#e6edf3;}',
        '[data-theme="dark"] #body-wrap,[data-theme="dark"] #content-inner{background:transparent;}',
        /* 首页 */
        '[data-theme="dark"] .card-widget,[data-theme="dark"] #page,[data-theme="dark"] .article-container{background:#1e1e1e !important;box-shadow:none;}',
        '[data-theme="dark"] #aside_content .card-widget{border-color:#333;}',
        '[data-theme="dark"] #footer-wrap{background:#161b22 !important;}',
        '[data-theme="dark"] .card-info .author-info__name{color:#e6edf3;}',
        '[data-theme="dark"] .card-info-social-icons .social-icon{color:#c9d1d9 !important;}',
        /* 文章页 */
        '[data-theme="dark"] .post-header h1{color:#e6edf3;}',
        '[data-theme="dark"] .post-header{border-bottom-color:#333 !important;}',
        '[data-theme="dark"] .meta,[data-theme="dark"] .date{color:#8b949e;}',
        '[data-theme="dark"] .post-content p{color:#c9d1d9 !important;}',
        '[data-theme="dark"] .post .footer,[data-theme="dark"] .links{border-color:#333;}',
        '[data-theme="dark"] .post .footer a,[data-theme="dark"] .links a{color:#8b949e;}',
        /* 天气页 */
        '[data-theme="dark"] .weather{background:#1e1e1e !important;}',
        '[data-theme="dark"] .weather h1{color:#e6edf3;}',
        /* 工具箱 */
        '[data-theme="dark"] .card{background:#1e1e1e;}',
        '[data-theme="dark"] .tab-bar{background:#161b22;box-shadow:0 2px 10px rgba(0,0,0,.3);}',
        '[data-theme="dark"] .tab-btn{background:#1e1e1e;border-color:#444;color:#c9d1d9;}',
        '[data-theme="dark"] textarea,[data-theme="dark"] input[type="text"],[data-theme="dark"] input[type="number"],[data-theme="dark"] input[type="datetime-local"],[data-theme="dark"] select{background:#2d333b;border-color:#444;color:#e6edf3;}',
        '[data-theme="dark"] textarea::placeholder,[data-theme="dark"] input::placeholder{color:#8b949e;}',
        '[data-theme="dark"] textarea[readonly]{background:#161b22;}',
        '[data-theme="dark"] .btn-plain{background:#30363d;color:#c9d1d9;}',
        '[data-theme="dark"] .copy-btn{background:#21262d;border-color:#444;color:#c9d1d9;}',
        '[data-theme="dark"] #qr-box{background:#2d333b;border-color:#444;}',
        '[data-theme="dark"] .color-preview{border-color:#444;}',
        '[data-theme="dark"] .msg.info{color:#8b949e;}',
        /* 通用 */
        '[data-theme="dark"] hr{border-color:#333;background:transparent;}',
        '[data-theme="dark"] .tool a{color:#ffa07a;}',
        '[data-theme="dark"] .tool_article a{color:#ff7b9c;}',
        '[data-theme="dark"] strong{color:#ff7b9c;}',
        '[data-theme="dark"] .site-copyright{color:#8b949e;}',
        '[data-theme="dark"] #site-top-nav{background:rgba(18,20,24,.92);}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'site-common-style';
    style.textContent = css;
    document.head.appendChild(style);

    /* ================= 导航栏 ================= */
    var nav = document.createElement('div');
    nav.id = NAV_ID;
    nav.innerHTML =
        '<div class="site-nav-inner">' +
        '  <a class="site-nav-brand" href="index.html">嘟嘟猪</a>' +
        '  <nav class="site-nav-links">' +
        '    <a href="index.html">首页</a>' +
        '    <a href="tools.html">工具箱</a>' +
        '    <a href="weather.html">天气</a>' +
        '    <a href="article.html">文章</a>' +
        '    <a href="privacy.html">隐私</a>' +
        '  </nav>' +
        '</div>';
    document.body.insertBefore(nav, document.body.firstChild);

    // 高亮当前页（天气系列页统一高亮"天气"）
    var page = location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(function (a) {
        var href = a.getAttribute('href');
        if (page === href || (href === 'weather.html' && page.indexOf('weather') === 0)) {
            a.classList.add('active');
        }
    });

    /* ================= 暗色模式切换 ================= */
    var SUN_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    var MOON_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    var btn = document.createElement('button');
    btn.id = TOGGLE_ID;
    btn.setAttribute('aria-label', '切换明暗模式');
    btn.setAttribute('title', '切换明暗模式');
    document.body.appendChild(btn);

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
        btn.innerHTML = theme === 'dark' ? SUN_SVG : MOON_SVG;
    }

    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) {
        saved = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    applyTheme(saved);

    btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(current);
    });
})();
