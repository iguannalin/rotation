window.addEventListener("load", () => {
  const wOffset = (window.innerWidth/10);
  const w = window.innerWidth;
  const hOffset = (window.innerHeight/15);
  const h = window.innerHeight;
  const wHalf = (w/2);
  const hHalf = (h/2) - 20;
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  let radius = 125;
  for (let angle = 0; angle < 360; angle+=15) {
    var x = (Math.cos(angle) * radius) + wHalf;
    var y = (Math.sin(angle) * radius) + hHalf;
    const butt = document.createElement("button");
    butt.innerHTML = "*"
    butt.style.top = `${y}px`;
    butt.style.left = `${x}px`;
    document.body.appendChild(butt);
  }

  // add blur?
  // code from https://codepen.io/deepakkadarivel/pen/LrGEdL
  function addDrag(box) {
    function onMove(e, isMobile = false) {
        e.preventDefault();
        if (isMobile) {
          var touchLocation = e.targetTouches[0];
          box.style.left = touchLocation.pageX - 30 + 'px';
          box.style.top = touchLocation.pageY - 30 + 'px';
        } else {
          box.style.left = e.pageX - 20 + 'px';
          box.style.top = e.pageY - 20 + 'px';
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