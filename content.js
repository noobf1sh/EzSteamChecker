// ========== 配置区 ==========
const BUTTONS = [
  { label: 'csrep.gg', prefix: 'w' },
  { label: 'SteamSets', prefix: 's' },
  { label: 'CS2 AI cheater detection', prefix: 'd' }
];
// ============================

// 内联 SVG 图标（14x14 方框箭头，自动跟随文字颜色）
const iconSVG = `
  <svg width="14" height="14" viewBox="0 0 14 14" style="vertical-align: middle; margin-right: 6px;" fill="currentColor">
    <path d="M11 3H8V2h5v5h-1V3.7L7.35 8.35l-.7-.7L11.3 3z"/>
    <path d="M10 10V6.5l1-1V10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3.5l-1 1H3v6h7z"/>
  </svg>
`;

// 防止重复注入的标记
const INJECTED_FLAG = 'data-csrep-injected';

function injectButtons() {
  const menu = document.querySelector('.profile_header_actions .popup_menu');
  if (!menu) return;
  if (menu.hasAttribute(INJECTED_FLAG)) return;
  menu.setAttribute(INJECTED_FLAG, 'true');

  BUTTONS.forEach(btn => {
    const a = document.createElement('a');
    a.className = 'popup_menu_item';
    a.href = '#';

    // 图标 + 文字
    a.innerHTML = iconSVG + btn.label;

    a.addEventListener('click', (e) => {
      e.preventDefault();
      const url = new URL(window.location.href);
      if (url.hostname === 'steamcommunity.com') {
        url.hostname = btn.prefix + url.hostname;
      }
      window.location.href = url.toString();
    });

    menu.appendChild(a);
  });

  console.log('[f1sh] 按钮已注入:', BUTTONS.map(b => b.label).join(', '));
}

const intervalId = setInterval(() => {
  injectButtons();
}, 800);

window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
});