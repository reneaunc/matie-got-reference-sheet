
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
