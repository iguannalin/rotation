window.addEventListener("load", () => {
  const wOffset = (window.innerWidth/10);
  const w = window.innerWidth;
  const hOffset = (window.innerHeight/15);
  const h = window.innerHeight;
  const wHalf = (w/2) + 20;
  const hHalf = (h/2) - 20;

  // math is my passion -- https://stackoverflow.com/questions/30531474/d3js-find-closest-point-on-circle
  //                       https://stackoverflow.com/questions/5708532/how-to-calculate-diametrically-opposite-point-inside-a-circle
  let radius = 125;
  function findXY(x, y) {
    var dx = x - wHalf,
    dy = y - hHalf,
    dist = Math.sqrt(dx*dx + dy*dy),
    newX = wHalf + dx * radius / dist,
    newY = hHalf + dy * radius / dist;
    return {x:newX, y:newY};
  }

  // code from https://codepen.io/deepakkadarivel/pen/LrGEdL
  let count = 0;
  let dir = 1;
  function addDrag(box) {
    const other = (box == moon) ? sun : moon;
    function onMove(e, isMobile = false) {
      box.style.filter = `blur(${count/100}px)`;
      other.style.filter = `blur(${count/100}px)`;
      if (count > 300) {
        sun.innerHTML = "☀️";
        moon.innerHTML = "🌙";
        dir *= -1;
      }
      e.preventDefault();
      if (isMobile) {
        var touchLocation = e.targetTouches[0];
        const found = findXY(touchLocation.pageX, touchLocation.pageY);
        box.style.left = found.x - 30 + 'px'; // touchLocation.pageX
        box.style.top = found.y - 30 + 'px'; // touchLocation.pageY
        const found2 = findXY(wHalf - (touchLocation.pageX - wHalf), hHalf - (touchLocation.pageY - hHalf));
        other.style.left = found2.x - 30 + 'px'; // touchLocation.pageX
        other.style.top = found2.y - 30 + 'px'; // touchLocation.pageY
      } else {
        const found = findXY(e.pageX, e.pageY);
        box.style.left = found.x - 20 + 'px';// e.pageX
        box.style.top = found.y - 20 + 'px';// e.pageY
        const found2 = findXY(wHalf - (e.pageX - wHalf), hHalf - (e.pageY - hHalf));
        other.style.left = found2.x - 20 + 'px';// e.pageX
        other.style.top = found2.y - 20 + 'px';// e.pageY
      }
      count+=dir;
    }
    box.addEventListener('mousedown', function() {
      document.addEventListener('mousemove', onMove);
    })
    document.addEventListener('mouseup', function(e) {
      document.removeEventListener('mousemove', onMove);
      count = 0;
    });
    box.addEventListener('touchmove', (e) => onMove(e, true));
    document.addEventListener('touchend', () => count=0);
    onMove({pageX:0,pageY:0,preventDefault:()=>{}}); // mock initial position
  }

  const moon = document.getElementById('moon');
  const sun = document.getElementById('sun');
  addDrag(moon);
  addDrag(sun);
});