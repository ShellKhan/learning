function dragndrop() {
    let elem = document.querySelector('.pink');
    let x, y, deltaX, deltaY;
    elem.addEventListener('mousedown', function(e){
        this.classList.add('inuse');
        y = this.getBoundingClientRect().top;
        x = this.getBoundingClientRect().left;
        deltaX = e.clientX - x;
        deltaY = e.clientY - y;
    });
    elem.addEventListener('mouseup', function(){
        this.classList.remove('inuse');
    });
    elem.addEventListener('mouseout', function(){
        this.classList.remove('inuse');
    });
    elem.addEventListener('mousemove', function(e){
        if (this.classList.contains('inuse')) {
            this.style.left = (e.clientX - deltaX) + 'px';
            this.style.top = (e.clientY - deltaY) + 'px';
        }
    });
}

document.addEventListener('DOMContentLoaded', dragndrop);
//window.onload = dragndrop;