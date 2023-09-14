window.addEventListener("load", () => {
  // code from https://codepen.io/deepakkadarivel/pen/LrGEdL
  addDragDrop(document.getElementById('moon'));
  addDragDrop(document.getElementById('sun'));

  // add blur?

  function addDragDrop(box) {
    function onMove(e) {
        e.preventDefault();
        box.style.left = e.pageX - 20 + 'px';
        box.style.top = e.pageY - 20 + 'px';
    }
    box.addEventListener('mousedown', function() {
      document.body.addEventListener('mousemove', onMove);
    })
    document.body.addEventListener('mouseup', function(e) {
      document.body.removeEventListener('mousemove', onMove);
    });
    box.addEventListener('touchmove', function(e) {
      e.preventDefault();
      var touchLocation = e.targetTouches[0];
      box.style.left = touchLocation.pageX - 30 + 'px';
      box.style.top = touchLocation.pageY - 30 + 'px';
    });
  }
});