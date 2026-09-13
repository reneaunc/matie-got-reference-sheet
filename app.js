const characters = window.CHARACTERS;
const houses = window.HOUSES;
const directory = document.getElementById('directory');
const search = document.getElementById('search');
const filters = document.getElementById('filters');
const dialog = document.getElementById('profileDialog');
const profileContent = document.getElementById('profileContent');
const houseSelector = document.getElementById('houseSelector');
const houseTree = document.getElementById('houseTree');
let activeFilter = 'All';
let activeHouse = null;
let profileTrigger = null;
const storylines = ['All', "King's Landing", 'Stark/Tully War', 'Riverlands', 'The North',
  'Beyond the Wall', 'Free Folk', 'Dragonstone', 'Daenerys / Astapor'];
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const getCharacter = id => characters.find(c => c.id === id);

function renderFilters() {
  filters.innerHTML = storylines.map(label => `<button type="button" class="filter-btn${label === activeFilter ? ' active' : ''}"
    aria-pressed="${label === activeFilter}">${escapeHtml(label)}</button>`).join('');
  filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.textContent;
    renderFilters();
    [...filters.children].find(b => b.textContent === activeFilter).focus();
    renderDirectory();
  }));
}

function portraitEl(c, cls = '') {
  const fallback = document.createElement('div');
  fallback.className = cls === 'profile-img' ? 'profile-placeholder' : 'placeholder';
  fallback.textContent = c.name;
  fallback.setAttribute('aria-label', `Portrait unavailable: ${c.name}`);
  if (c.portraitApproved === false) return fallback;
  const img = document.createElement('img');
  img.className = cls;
  img.alt = `${c.name}, portrayed by ${c.actor}`;
  img.onerror = () => {
    img.replaceWith(fallback);
  };
  img.src = c.image;
  img.loading = cls ? 'eager' : 'lazy';
  return img;
}

function renderDirectory() {
  const q = search.value.toLocaleLowerCase().trim();
  const matches = characters.filter(c => {
    const houseNames = Object.entries(houses).filter(([, h]) =>
      h.people.some(p => p.characterId === c.id)).map(([name]) => name);
    const hay = [c.name, ...(c.aliases || []), c.actor, c.faction, ...houseNames,
      c.storyline, c.location, c.wants, ...c.allies, ...c.enemies,
      ...c.family.map(p => `${p.name} ${p.relation}`)].join(' ').toLocaleLowerCase();
    return (activeFilter === 'All' || c.storyline === activeFilter) && (!q || hay.includes(q));
  });
  directory.replaceChildren();
  matches.forEach(c => {
    const card = document.createElement('button');
    card.className = 'character-card';
    card.type = 'button';
    card.appendChild(portraitEl(c));
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<strong>${escapeHtml(c.name)}</strong><span>${escapeHtml(c.faction)} · ${escapeHtml(c.storyline)}</span>`;
    card.appendChild(meta);
    card.addEventListener('click', () => openProfile(c.id));
    directory.appendChild(card);
  });
  document.getElementById('searchResults').textContent = matches.length ?
    `${matches.length} characters` : 'No characters found. Try another name or choose All storylines.';
}

function openProfile(id) {
  const c = getCharacter(id);
  if (!c) return;
  if (!dialog.open) profileTrigger = document.activeElement;
  const fact = (label, value) => `<div class="fact"><b>${label}</b>${escapeHtml(value)}</div>`;
  profileContent.innerHTML = `
    <article class="profile">
      <div class="profile-hero"><div id="heroPortrait"></div><div>
        <h3 id="profileName">${escapeHtml(c.name)}</h3><div>${escapeHtml(c.actor)}</div>
        <span class="badge">${escapeHtml(c.faction)}</span>
        <span class="badge">${escapeHtml(c.storyline)}</span>
      </div></div>
      <div class="profile-grid">
        ${fact('WHERE ARE THEY?', c.location)}
        ${fact('WHAT DO THEY WANT?', c.wants)}
        ${fact('ALLIES', c.allies.join(' · '))}
        ${fact('ENEMIES / THREATS', c.enemies.join(' · '))}
        ${fact('CURRENT STATUS · S3E3', c.currentStatus)}
        ${fact('REMEMBER THIS', c.remember)}
      </div>
      <div class="family-tree"><h4>Family &amp; important relationships</h4>
        <ul class="profile-relations">${c.family.filter(p => p.relation !== 'self').map(p =>
          `<li><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.relation)}</span></li>`).join('')}</ul>
      </div>
      <p class="relationship-note">Spoiler-safe through Season 3, Episode 3.</p>
    </article>`;
  document.getElementById('heroPortrait').appendChild(portraitEl(c, 'profile-img'));
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  history.replaceState(null, '', `#${c.id}`);
}

function personNode(person) {
  const c = getCharacter(person.characterId);
  const tag = c ? 'button' : 'div';
  return `<${tag} class="person-node ${c ? 'show-character' : ''}"
    ${c ? `type="button" data-character-id="${c.id}"` : ''}>
    ${c && c.portraitApproved !== false ? `<img class="tree-portrait" src="${c.image}" alt="" data-tree-image>` : ''}
    <strong>${escapeHtml(person.name)}</strong>
    ${person.note ? `<small>${escapeHtml(person.note)}</small>` : ''}
    </${tag}>`;
}

function renderHouseCards() {
  houseSelector.hidden = false;
  houseTree.hidden = true;
  houseSelector.innerHTML = Object.entries(houses).map(([name, house]) =>
    `<button type="button" class="house-btn" data-house="${name}">
      ${house.sigil ? `<img class="house-sigil" src="${house.sigil}" alt="">` : ''}
      <strong>House ${name}</strong><span>${escapeHtml(house.region)}</span>
      <span><b>Seat:</b> ${escapeHtml(house.seat)}</span>
      <span><b>Leader:</b> ${escapeHtml(house.leader)}</span>
      <span><b>Allegiance:</b> ${escapeHtml(house.allegiance)}</span>
      <span>${escapeHtml(house.description)}</span>
      <span><b>Key members:</b> ${escapeHtml((house.members || house.people.filter(p => p.characterId).map(p => p.name)).join(', '))}</span>
      <span class="house-cta">Explore family tree →</span>
    </button>`).join('');
  houseSelector.querySelectorAll('[data-house]').forEach(button =>
    button.addEventListener('click', () => openHouse(button.dataset.house)));
}

function openHouse(name, focus = true) {
  const house = houses[name];
  if (!house) return;
  activeHouse = name;
  houseSelector.hidden = true;
  houseTree.hidden = false;
  const nodes = ids => ids.map(id => personNode(house.people.find(p => p.id === id))).join('');
  houseTree.innerHTML = `
    <button type="button" class="back-btn" id="allHouses">← All Houses</button>
    <div class="house-title-row"><h3 tabindex="-1" id="houseHeading">House ${name}</h3>
      <p>${escapeHtml(house.seat)} · ${escapeHtml(house.region)}</p></div>
    <div class="fact"><b>CURRENT LEADER</b>${escapeHtml(house.leader)}</div>
    <div class="fact"><b>CURRENT ALLEGIANCE</b>${escapeHtml(house.allegiance)}</div>
    <p class="house-description">${escapeHtml(house.description)}</p>
    <h4>Family tree</h4>
    <p class="legend-row">Gold nodes open profiles. Each branch names its exact connection.
      Solid lines: biological family. Double lines: marriage or partnership.
      Dotted lines: public claims. Dashed lines: context, including wards and betrothals.</p>
    <p class="tree-hint">Swipe sideways inside the tree to see every member.</p>
    <div class="tree-scroll" tabindex="0" role="region" aria-label="House ${name} family tree">
      <div class="full-tree">${house.relationships.map(rel =>
        `<section class="family-branch ${rel.type}">
          <div class="branch-from">${nodes(rel.from)}</div>
          <div class="branch-link"><span>${escapeHtml(rel.label)}</span></div>
          <div class="branch-to">${nodes(rel.to)}</div>
        </section>`).join('')}</div>
    </div>
    <h4>Key members &amp; family context</h4>
    <div class="key-members">${house.people.map(personNode).join('')}</div>
    <p class="relationship-note">Family connections reflect only information established through Season 3, Episode 3.</p>`;
  houseTree.querySelector('#allHouses').addEventListener('click', () => {
    const previous = activeHouse;
    activeHouse = null;
    renderHouseCards();
    houseSelector.querySelector(`[data-house="${previous}"]`).focus();
  });
  houseTree.querySelectorAll('[data-character-id]').forEach(button =>
    button.addEventListener('click', () => openProfile(button.dataset.characterId)));
  houseTree.querySelectorAll('[data-tree-image]').forEach(img => {
    const fallback = () => {
      const replacement = document.createElement('div');
      replacement.className = 'tree-photo-fallback';
      replacement.textContent = 'Portrait unavailable';
      img.replaceWith(replacement);
    };
    img.addEventListener('error', fallback, {once: true});
    if (img.complete && !img.naturalWidth) fallback();
  });
  if (focus) document.getElementById('houseHeading').focus();
}

function openFromHash() {
  const id = location.hash.slice(1);
  if (getCharacter(id)) openProfile(id);
}
search.addEventListener('input', renderDirectory);
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  history.replaceState(null, '', location.pathname + location.search);
  if (profileTrigger?.isConnected) profileTrigger.focus({preventScroll: true});
});
window.addEventListener('hashchange', openFromHash);
document.querySelectorAll('.top-tab').forEach(tab => {
  tab.setAttribute('aria-pressed', String(tab.classList.contains('active')));
  tab.addEventListener('click', () => {
    document.querySelectorAll('.top-tab').forEach(button => {
      button.classList.toggle('active', button === tab);
      button.setAttribute('aria-pressed', String(button === tab));
    });
    document.querySelectorAll('.site-view').forEach(view =>
      view.classList.toggle('active', view.id === tab.dataset.view));
  });
});
renderFilters();
renderDirectory();
renderHouseCards();
openFromHash();
