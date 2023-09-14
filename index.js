window.addEventListener("load", () => {
  const wOffset = (window.innerWidth/10);
  const w = window.innerWidth;
  const hOffset = (window.innerHeight/15);
  const h = window.innerHeight;
  const wHalf = (w/2);
  const hHalf = (h/2) - 20;

  // math is my passion -- https://stackoverflow.com/questions/30531474/d3js-find-closest-point-on-circle


  let radius = 125;
  function findAngle(x, y) {
    var dx = x - wHalf,
    dy = y - hHalf,
    dist = Math.sqrt(dx*dx + dy*dy),
    newX = wHalf + dx * radius / dist,
    newY = hHalf + dy * radius / dist;
    console.log({newX,newY})
    return {x:newX, y:newY};
  }
  // for (let angle = 0; angle < 360; angle+=15) {
  //   var x = (Math.cos(angle) * radius) + wHalf;
  //   var y = (Math.sin(angle) * radius) + hHalf;
  //   return {x, y};
  //   const butt = document.createElement("button");
  //   butt.innerHTML = "*"
  //   butt.style.top = `${y}px`;
  //   butt.style.left = `${x}px`;
  //   document.body.appendChild(butt);
  // }

  // add blur?
  function findDirection(x, y) {
    // top left
    if (x < wHalf && y > hHalf) {

    }
    // top right
    else if (x >= wHalf && y > hHalf) {}
    // bottom left
    else if (x > wHalf && y < hHalf) {}
    // bottom right
    else if (x < wHalf && y < hHalf) {}
  }

  // code from https://codepen.io/deepakkadarivel/pen/LrGEdL
  function addDrag(box) {
    function onMove(e, isMobile = false) {
        e.preventDefault();
        if (isMobile) {
          var touchLocation = e.targetTouches[0];
          const found = findAngle(touchLocation.pageX, touchLocation.pageY);
          box.style.left = found.x + 'px'; // touchLocation.pageX - 30 
          box.style.top = found.y + 'px'; // touchLocation.pageY - 30 
          // findDirection(touchLocation.pageX, touchLocation.pageY);
        } else {
          const found = findAngle(e.pageX, e.pageY);
          box.style.left = found.x + 'px';// e.pageX - 20 
          box.style.top = found.y + 'px';// e.pageY - 20 
          // findDirection(e.pageX, e.pageY);
        }
    }
    box.addEventListener('mousedown', function() {
      document.body.addEventListener('mousemove', onMove);
    })
    document.body.addEventListener('mouseup', function(e) {
      document.body.removeEventListener('mousemove', onMove);
    });
    box.addEventListener('touchmove', () => onMove(e, true));
  }

  addDrag(document.getElementById('moon'));
  addDrag(document.getElementById('sun'));
});