// Geography and notes limited to the guide's S3E3 viewing boundary.
(() => {
  const locations = [
    ["Craster's Keep", 242, 112, "Beyond the Wall. Jeor, Sam and the surviving Watch brothers shelter here. Gilly has just given birth."],
    ["Castle Black", 247, 153, "The Night's Watch stronghold at the Wall. Mance has ordered a party to climb the Wall and attack it from the south."],
    ["Winterfell", 221, 224, "The Stark seat in the North, now ruined. Bran's group has escaped; its precise current position is not established."],
    ["Pyke", 119, 381, "Balon Greyjoy's seat in the Iron Islands."],
    ["The Eyrie", 278, 390, "House Arryn's mountain stronghold in the Vale. Lysa rules for her son Robin."],
    ["Riverrun", 208, 458, "House Tully's seat. Robb and Catelyn attend Hoster's funeral here, with Edmure and Brynden."],
    ["Harrenhal", 265, 465, "A vast ruined Riverlands castle. Robb's army found slaughtered prisoners and a wounded survivor here."],
    ["Casterly Rock", 166, 510, "The Lannister seat in the Westerlands. Tywin is currently in King's Landing."],
    ["King's Landing", 300, 529, "The capital and site of the Iron Throne. Joffrey rules, with Tywin serving as Hand."],
    ["Dragonstone", 373, 447, "Stannis's island stronghold. Davos is imprisoned here; Melisandre has departed by sea."],
    ["Highgarden", 185, 613, "House Tyrell's seat in the Reach. Margaery, Loras and Olenna are in the capital."],
    ["Braavos", 548, 215, "A Free City of Essos, across the Narrow Sea. Syrio Forel came from here; the Crown owes money to its Iron Bank."],
    ["Pentos", 536, 330, "A Free City of Essos where Daenerys and Viserys stayed with Illyrio before her marriage to Drogo."],
    ["Vaes Dothrak", 981, 244, "The Dothraki city where Daenerys traveled with Drogo's khalasar."],
    ["Astapor", 883, 517, "Daenerys is negotiating here with Kraznys for the Unsullied and Missandei. The exchange remains pending."],
    ["Qarth", 1070, 616, "The trading city where Daenerys recovered her dragons before traveling to Astapor."]
  ];
  const viewport = document.getElementById('worldMapViewport');
  const canvas = document.getElementById('worldMapCanvas');
  const markers = document.getElementById('worldMapMarkers');
  const buttons = document.getElementById('mapLocations');
  const note = document.getElementById('mapLocationNote');
  const svgNS = 'http://www.w3.org/2000/svg';
  let zoom = 1;
  function select(index) {
    note.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = locations[index][0];
    const description = document.createElement('span');
    description.textContent = locations[index][3];
    note.append(title, description);
    buttons.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    markers.querySelectorAll('[role="button"]').forEach((marker, i) => marker.setAttribute('aria-pressed', String(i === index)));
  }
  locations.forEach(([name, x, y], index) => {
    const marker = document.createElementNS(svgNS, 'g');
    marker.setAttribute('transform', `translate(${x} ${y})`);
    marker.setAttribute('role', 'button');
    marker.setAttribute('tabindex', '0');
    marker.setAttribute('aria-label', name);
    marker.setAttribute('aria-pressed', 'false');
    marker.classList.add('world-map-marker');
    const hit = document.createElementNS(svgNS, 'circle');
    hit.setAttribute('r', '19');
    hit.setAttribute('class', 'marker-hit');
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('r', '6');
    const label = document.createElementNS(svgNS, 'text');
    label.setAttribute('x', '11');
    label.setAttribute('y', name === 'Harrenhal' ? '22' : '-10');
    label.textContent = name;
    marker.append(hit, dot, label);
    marker.addEventListener('click', () => select(index));
    marker.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(index);
      }
    });
    markers.append(marker);
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => select(index));
    buttons.append(button);
  });
  function setZoom(value) {
    const previous = zoom;
    zoom = Math.max(1, Math.min(4, value));
    const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
    const centerY = viewport.scrollTop + viewport.clientHeight / 2;
    canvas.style.width = `${zoom * 100}%`;
    viewport.scrollLeft = centerX * zoom / previous - viewport.clientWidth / 2;
    viewport.scrollTop = centerY * zoom / previous - viewport.clientHeight / 2;
    document.getElementById('mapZoomLabel').textContent = `${Math.round(zoom * 100)}%`;
    document.getElementById('mapZoomOut').disabled = zoom === 1;
    document.getElementById('mapZoomIn').disabled = zoom === 4;
  }
  document.getElementById('mapZoomIn').addEventListener('click', () => setZoom(zoom + .5));
  document.getElementById('mapZoomOut').addEventListener('click', () => setZoom(zoom - .5));
  document.getElementById('mapReset').addEventListener('click', () => {
    setZoom(1);
    viewport.scrollTo(0, 0);
  });
  setZoom(1);
})();
