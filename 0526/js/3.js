$(function() {
    let deltaX, deltaY;
    /*
    $('.pink').on({
        mousedown: function(e) {
            $(this).addClass('inuse');
            deltaX = e.clientX - $(this).position().left;
            deltaY = e.clientY - $(this).position().top;
        },
        mousemove: function(e) {
            if ($(this).hasClass('inuse')) {
                $(this).css({
                    left: (e.clientX - deltaX) + 'px',
                    top: (e.clientY - deltaY) + 'px'
                });
            }
        },
        mouseup: function() {
            $(this).removeClass('inuse');
        },
        mouseout: function() {
            $(this).removeClass('inuse');
        }
    });
    */
    $('.pink').on('mousedown', function(e) {
        $(this).addClass('inuse');
        deltaX = e.clientX - $(this).position().left;
        deltaY = e.clientY - $(this).position().top;
    }).on('mousemove', function(e) {
        if ($(this).hasClass('inuse')) {
            $(this).css({
                left: (e.clientX - deltaX) + 'px',
                top: (e.clientY - deltaY) + 'px'
            });
        }
    }).on('mouseup mouseout', function() {
        $(this).removeClass('inuse');
    });
});