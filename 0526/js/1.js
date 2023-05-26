$(function() {
    //let a = $("div");
    /*
    let b = a.filter('div > div');
    let c = a.eq(1);
    let d = a[1];
    let e = document.getElementsByTagName('div');
    */
    /*
    a.each(function() {
        $(this).slideUp(function() {
            $(this).slideDown(function() {
                console.log(this);
            });
        });
    });
    */
    /*
    a.each(function() {
        $(this).fadeTo(1500, 0.5);
    });
    */
    //console.log(a.find("div"));
    /*
    console.log($(".green").css(['backgroundColor','left','top']));
    $(".green").css({
        backgroundColor: 'red',
        top: '-=50px',
        left: '+=100px',
        outline: '5px solid yellow',
        borderRadius: 0
    });
    */
    /*
    $("div").css('outline', '0 solid yellow').animate({
        top: '-=50px',
        left: '+=100px',
        outlineWidth: '+=5px',
        borderRadius: 0
    }, 3000, function(){
        $(this).css('background', 'red');
    });
    */
    
    ball = $('.green');
    
    w = ball.width() / 2 + parseInt($('.pink').css('marginLeft')) + parseInt($('.pink').css('borderLeftWidth')) + parseInt(ball.css('borderLeftWidth'));
    h = ball.height() / 2 + parseInt($('.pink').css('marginTop')) + parseInt($('.pink').css('borderTopWidth')) + parseInt(ball.css('borderTopWidth'));
    stopw = $('.pink').width() - ball.outerWidth();
    stoph = $('.pink').height() - ball.outerHeight();
    
    ball.on("mouseover", function(e) {
        let x = $(this).position().left * 2 + w - e.pageX;
        let y = $(this).position().top * 2 + h - e.pageY;
        if (x < 0) {
            x = 0;
        } else if (x > stopw) {
            x = stopw;
        }
        if (y < 0) {
            y = 0;
        } else if (y > stoph) {
            y = stoph;
        }
        $(this).css({
            left: x,
            top: y
        });
    });
    
    $(window).on('resize', function() {
        w = ball.width() / 2 + parseInt($('.pink').css('marginLeft')) + parseInt($('.pink').css('borderLeftWidth')) + parseInt(ball.css('borderLeftWidth'));
    })
});

var ball, w, h, stopw, stoph;