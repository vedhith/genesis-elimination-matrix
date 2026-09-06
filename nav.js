// The dock: a bar at the bottom of every page with every view. It can be
// minimized to a thin tab with an arrow that brings it back. Smooth, remembered.
(function () {
  const here = (document.currentScript && document.currentScript.dataset.page) || '';
  const root = (document.currentScript && document.currentScript.dataset.root) || './';
  const PAGES = [
    ['index', 'Intro', 'index.html', 'I solved existence.'],
    ['play', 'Play', 'play.html', 'Which of the four are we? Everything has a chance'],
    ['whole', 'The climb', 'whole.html', 'Four pillars down, the green line'],
    ['word', 'The word', 'word.html', 'Unconception, defined'],
    ['matrix', 'The matrix', 'matrix.html', '2,725 positions, 12 levels'],
    ['map', 'The map', 'map.html', 'Names only, one ring at a time'],
    ['hourglass', 'The hourglass', 'hourglass.html', 'Us at the fog front'],
    ['speck', 'The speck', 'speck.html', 'Everything we can state, tilted'],
    ['one', 'From the one', 'one.html', 'One at the top, splitting down'],
    ['tree', 'The hidden axis', 'tree.html', 'A branch only a tilt reveals'],
    ['docs', 'The documents', 'docs/index.html', 'Seventeen documents, the archive']
  ];
  const dock = document.createElement('div');
  dock.className = 'gem-dock';
  dock.id = 'gem-dock';
  const nav = document.createElement('nav');
  nav.className = 'gem-dock-list'; nav.setAttribute('aria-label', 'Views');
  for (const [id, label, href, sub] of PAGES) {
    const a = document.createElement('a');
    a.href = root + href; a.title = sub;
    if (id === here) a.setAttribute('aria-current', 'page');
    a.textContent = label;
    nav.appendChild(a);
  }
  const hide = document.createElement('button');
  hide.className = 'gem-dock-hide'; hide.type = 'button'; hide.setAttribute('aria-label', 'Minimize the menu'); hide.title = 'Minimize';
  hide.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const show = document.createElement('button');
  show.className = 'gem-dock-show'; show.type = 'button'; show.setAttribute('aria-label', 'Bring the menu back'); show.title = 'Menu';
  show.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 9l5-5 5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>menu</span>';
  dock.append(nav, hide, show);
  document.body.appendChild(dock);
  document.documentElement.classList.add('gem-has-dock');
  let min = false;
  try { min = localStorage.getItem('gem-dock') === 'min'; } catch (e) {}
  const set = (m, remember) => {
    min = m; dock.classList.toggle('min', m); document.documentElement.classList.toggle('gem-dock-min', m);
    hide.tabIndex = m ? -1 : 0; show.tabIndex = m ? 0 : -1;
    if (remember) { try { localStorage.setItem('gem-dock', m ? 'min' : 'open'); } catch (e) {} }
  };
  dock.classList.add('nomotion'); set(min, false);
  requestAnimationFrame(() => requestAnimationFrame(() => dock.classList.remove('nomotion')));
  hide.addEventListener('click', () => { set(true, true); show.focus(); });
  show.addEventListener('click', () => { set(false, true); nav.querySelector('a[aria-current]')?.focus?.(); });
  for (const ev of ['pointerdown', 'contextmenu', 'dblclick', 'wheel', 'touchstart']) dock.addEventListener(ev, e => e.stopPropagation(), { passive: ev === 'wheel' || ev === 'touchstart' });
  const cur = nav.querySelector('a[aria-current]'); if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
})();
