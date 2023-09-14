window.addEventListener("load", () => {
  const wOffset = (window.innerWidth/10);
  const w = window.innerWidth;
  const hOffset = (window.innerHeight/15);
  const h = window.innerHeight;
  const wHalf = (w/2);
  const hHalf = (h/2) - 20;

  // math is my passion -- https://stackoverflow.com/questions/30531474/d3js-find-closest-point-on-circle
  let radius = 125;
  function findXY(x, y) {
    var dx = x - wHalf,
    dy = y - hHalf,
    dist = Math.sqrt(dx*dx + dy*dy),
    newX = wHalf + dx * radius / dist,
    newY = hHalf + dy * radius / dist;
    return {x:newX, y:newY};
  }
  // add blur?

  // code from https://codepen.io/deepakkadarivel/pen/LrGEdL
  function addDrag(box) {
    const other = (box == moon) ? sun : moon;
    function onMove(e, isMobile = false) {
        e.preventDefault();
        if (isMobile) {
          var touchLocation = e.targetTouches[0];
          const found = findXY(touchLocation.pageX, touchLocation.pageY);
          box.style.left = found.x - 30 + 'px'; // touchLocation.pageX
          box.style.top = found.y - 30 + 'px'; // touchLocation.pageY
          const found2 = findXY(Math.abs(touchLocation.pageX - (radius*2)), Math.abs(touchLocation.pageY - (radius*2)));
          other.style.left = found2.x - 30 + 'px'; // touchLocation.pageX
          other.style.top = found2.y - 30 + 'px'; // touchLocation.pageY
        } else {
          const found = findXY(e.pageX, e.pageY);
          box.style.left = found.x - 20 + 'px';// e.pageX
          box.style.top = found.y - 20 + 'px';// e.pageY
          const found2 = findXY(Math.abs(e.pageX - (radius*2)), Math.abs(e.pageY - (radius*2)));
          other.style.left = found2.x - 20 + 'px';// e.pageX
          other.style.top = found2.y - 20 + 'px';// e.pageY
        }
    }
    box.addEventListener('mousedown', function() {
      document.body.addEventListener('mousemove', onMove);
    })
    document.body.addEventListener('mouseup', function(e) {
      document.body.removeEventListener('mousemove', onMove);
    });
    box.addEventListener('touchmove', (e) => onMove(e, true));
  }

  const moon = document.getElementById('moon');
  const sun = document.getElementById('sun');
  addDrag(moon);
  addDrag(sun);
});