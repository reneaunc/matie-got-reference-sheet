// Zoom the existing geographic map; no character or story overlays.
(() => {
  const viewport = document.getElementById('worldMapViewport');
  const canvas = document.getElementById('worldMapCanvas');
  const image = document.getElementById('worldMap');
  const status = document.getElementById('mapLoadStatus');
  const zoomIn = document.getElementById('mapZoomIn');
  const zoomOut = document.getElementById('mapZoomOut');
  let zoom = 1;

  function imageLoaded() {
    status.textContent = '';
    status.hidden = true;
  }
  function imageFailed() {
    status.hidden = false;
    status.textContent = 'The map could not load. Check your connection, then reload the page.';
  }
  image.addEventListener('load', imageLoaded);
  image.addEventListener('error', imageFailed);
  if (image.complete) {
    if (image.naturalWidth) imageLoaded();
    else imageFailed();
  }

  function setZoom(value) {
    const previous = zoom;
    zoom = Math.max(1, Math.min(4, value));
    const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
    const centerY = viewport.scrollTop + viewport.clientHeight / 2;
    canvas.style.width = `${zoom * 100}%`;
    viewport.scrollLeft = centerX * zoom / previous - viewport.clientWidth / 2;
    viewport.scrollTop = centerY * zoom / previous - viewport.clientHeight / 2;
    document.getElementById('mapZoomLabel').textContent = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom === 1;
    zoomIn.disabled = zoom === 4;
  }
  zoomIn.addEventListener('click', () => setZoom(zoom + .5));
  zoomOut.addEventListener('click', () => setZoom(zoom - .5));
  document.getElementById('mapReset').addEventListener('click', () => {
    setZoom(1);
    viewport.scrollTo(0, 0);
  });
  setZoom(1);
})();
