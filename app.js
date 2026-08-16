
const characters = window.CHARACTERS;
const directory = document.getElementById('directory');
const search = document.getElementById('search');
const filters = document.getElementById('filters');
const dialog = document.getElementById('profileDialog');
const profileContent = document.getElementById('profileContent');
const closeDialog = document.getElementById('closeDialog');

let activeFilter = 'All';

const storylines = ['All', ...new Set(characters.map(c => c.storyline))];

function renderFilters(){
  filters.innerHTML = '';
  storylines.forEach(label => {
    const b = document.createElement('button');
    b.className = 'filter-btn' + (label === activeFilter ? ' active' : '');
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', () => {
      activeFilter = label;
      renderFilters();
      renderDirectory();
    });
    filters.appendChild(b);
  });
}

function portraitEl(c, cls=''){
  const wrap = document.createElement('div');
  const img = document.createElement('img');
  img.src = c.image;
  img.alt = `${c.name}, portrayed by ${c.actor}`;
  if (cls) img.className = cls;
  img.onerror = () => {
    const ph = document.createElement('div');
    ph.className = cls === 'profile-img' ? 'profile-placeholder' : 'placeholder';
    ph.textContent = `Add ${c.image}`;
    img.replaceWith(ph);
  };
  wrap.appendChild(img);
  return wrap.firstChild;
}

function renderDirectory(){
  const q = search.value.toLowerCase().trim();
  const filtered = characters.filter(c => {
    const hay = [c.name,c.actor,c.faction,c.storyline,c.location,c.wants,c.allies.join(' '),c.enemies.join(' ')].join(' ').toLowerCase();
    return (activeFilter === 'All' || c.storyline === activeFilter) && (!q || hay.includes(q));
  });
  directory.innerHTML = '';
  filtered.forEach(c => {
    const card = document.createElement('button');
    card.className = 'character-card';
    card.type = 'button';
    const pic = portraitEl(c);
    card.appendChild(pic);
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<strong>${c.name}</strong><span>${c.faction} • ${c.storyline}</span>`;
    card.appendChild(meta);
    card.addEventListener('click', () => openProfile(c.id));
    directory.appendChild(card);
  });
}

function familyTreeHtml(family){
  const levels = [...new Set(family.map(x => x.level))].sort((a,b)=>a-b);
  return levels.map((level,i) => {
    const nodes = family.filter(x => x.level === level).map(x =>
      `<div class="tree-node ${x.relation === 'self' ? 'self':''}">${x.name}<small>${x.relation}</small></div>`
    ).join('');
    return `${i ? '<div class="tree-arrow">↓ relationship / family connection ↓</div>' : ''}<div class="tree-level">${nodes}</div>`;
  }).join('');
}

function openProfile(id){
  const c = characters.find(x => x.id === id);
  if (!c) return;
  profileContent.innerHTML = `
    <article class="profile">
      <div class="profile-hero">
        <div id="heroPortrait"></div>
        <div>
          <h3>${c.name}</h3>
          <div>${c.actor}</div>
          <span class="badge">${c.faction}</span>
          <span class="badge">${c.storyline}</span>
        </div>
      </div>
      <div class="profile-grid">
        <div class="fact"><b>WHERE ARE THEY?</b>${c.location}</div>
        <div class="fact"><b>WHAT DO THEY WANT?</b>${c.wants}</div>
        <div class="fact"><b>ALLIES</b>${c.allies.join(' • ')}</div>
        <div class="fact"><b>ENEMIES / THREATS</b>${c.enemies.join(' • ')}</div>
        <div class="fact"><b>END OF SEASON 2</b>${c.season2}</div>
        <div class="fact"><b>REMEMBER THIS</b>${c.remember}</div>
      </div>
      <div class="family-tree">
        <h4>Mini Family / Relationship Tree</h4>
        ${familyTreeHtml(c.family)}
      </div>
    </article>`;
  document.getElementById('heroPortrait').appendChild(portraitEl(c,'profile-img'));
  dialog.showModal();
  history.replaceState(null,'',`#${c.id}`);
}

function openFromHash(){
  const id = location.hash.slice(1);
  if (characters.some(c => c.id === id)) openProfile(id);
}

search.addEventListener('input', renderDirectory);
closeDialog.addEventListener('click', () => {
  dialog.close();
  history.replaceState(null,'',location.pathname);
});
dialog.addEventListener('click', e => {
  if (e.target === dialog) {
    dialog.close();
    history.replaceState(null,'',location.pathname);
  }
});

renderFilters();
renderDirectory();
if (location.hash) openFromHash();



const houses = window.HOUSES || {};
const houseSelector = document.getElementById('houseSelector');
const houseTree = document.getElementById('houseTree');
let activeHouse = Object.keys(houses)[0];

function getCharacter(id){
  return id ? characters.find(c => c.id === id) : null;
}

function treePortrait(person){
  const c = getCharacter(person.characterId);
  if (!c) return '<div class="tree-photo-fallback">Family</div>';
  return `<img class="tree-portrait" src="${c.image}" alt="${c.name}" data-tree-image>`;
}

function personNode(person){
  const c = getCharacter(person.characterId);
  const tag = c ? 'button' : 'div';
  return `
    <${tag} class="person-node ${c ? 'show-character' : ''}"
      ${c ? `type="button" data-character-id="${c.id}"` : ''}>
      ${treePortrait(person)}
      <strong>${person.name}</strong>
      <small>${person.relation}</small>
    </${tag}>`;
}

function renderHouseButtons(){
  houseSelector.innerHTML = '';
  Object.entries(houses).forEach(([name, house]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'house-btn' + (name === activeHouse ? ' active' : '');
    button.innerHTML = `<strong>House ${name}</strong><span>${house.seat}</span>`;
    button.addEventListener('click', () => {
      activeHouse = name;
      renderHouseButtons();
      renderHouseTree();
    });
    houseSelector.appendChild(button);
  });
}

function renderHouseTree(){
  const house = houses[activeHouse];
  const generations = house.generations.map((generation, index) => {
    const nodes = generation.map(personNode).join('');
    const connector = index ? '<div class="tree-connector">↓ family / relationship connection ↓</div>' : '';
    return `${connector}<div class="tree-generation">${nodes}</div>`;
  }).join('');

  houseTree.innerHTML = `
    <div class="house-title-row">
      <h3>House ${activeHouse}</h3>
      <p>${house.seat}</p>
    </div>
    <p class="house-description">${house.description}</p>
    <div class="legend-row">
      <span><span class="legend-swatch linked"></span>Tap to open character profile</span>
      <span><span class="legend-swatch"></span>Family/context only</span>
    </div>
    <div class="tree-scroll">
      <div class="full-tree">${generations}</div>
    </div>
    <div class="relationship-note">
      Trees are intentionally spoiler-limited to information revealed by the end of Season 2.
    </div>`;

  houseTree.querySelectorAll('[data-character-id]').forEach(node => {
    node.addEventListener('click', () => openProfile(node.dataset.characterId));
  });

  houseTree.querySelectorAll('[data-tree-image]').forEach(img => {
    img.addEventListener('error', () => {
      const replacement = document.createElement('div');
      replacement.className = 'tree-photo-fallback';
      replacement.textContent = 'Add photo';
      img.replaceWith(replacement);
    }, {once:true});
  });
}

renderHouseButtons();
renderHouseTree();

// =====================================
// MAIN GUIDE TAB NAVIGATION
// =====================================

function initGuideTabs() {
  const tabs = document.querySelectorAll(".top-tab");
  const views = document.querySelectorAll(".site-view");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.view;
      const targetView = document.getElementById(targetId);

      if (!targetView) {
        console.error(`No guide view found for "${targetId}"`);
        return;
      }

      tabs.forEach((button) => button.classList.remove("active"));
      views.forEach((view) => view.classList.remove("active"));

      tab.classList.add("active");
      targetView.classList.add("active");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGuideTabs);
} else {
  initGuideTabs();
}

