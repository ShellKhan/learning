/* variables */
let actionend;



/* main */
$(function() {
    if ($('.actiontimer').length) {
        actionTimer(actionend);
        setTimeout(function ac_tim() {
            actionTimer(actionend);
            setTimeout(ac_tim, 950);
        }, 950);
    }
    
    $('.slider').each(function() {
        makeSlider($(this));
    });
    
    /*
    if ($('.slider').length) {
        setTimeout(function sld() {
            document.querySelector('.next').addEventListener('transitionend', function() {
                setTimeout(sld, 1000);
            }, {once: true});
            slider();
        }, 1000);
    }*/
    
    if ($('.catalog .changeview').length) {
        if (localStorage.getItem('catalogview')) {
            $('.catalog').addClass('line');
        } else {
            $('.catalog').removeClass('line');
        }
        
        $('.catalog .changeview').on('click', function() {
            $('.catalog').toggleClass('line');
            toggleLocalStorage('catalogview', 'line');
        });
    }
    
    $('.accordion h3 span').on('click', function() {
        $('.accordion').toggleClass('open');
    });
    
    $('.accordion li > span').on('click', function() {
        let point = $(this).parent();
        if (point.hasClass('open')) {
            point.removeClass('open');
            point.find('.open').removeClass('open');
        } else {
            point.parent().find('.open').removeClass('open');
            point.addClass('open');
        }
    });
    
    $('.gallery').each(function() {
        makeGallery($(this));
    });
    
    $('.mainimagedesk img').on('click', function() {
        lightBox(this);
    });
    
    $('.idtovar button').on('click', function() {
        // получаем сведения о товаре
        let tovar = {
            id: $(this).parents('.idtovar').data('tovarid'),
            name: $(this).parents('.idtovar').find('.tovarname').html(),
            price: $(this).parents('.idtovar').find('.price').html(),
            quantity: 1
        }
        // здесь должна быть отправка сведений о товаре на бэк-энд, но мы ее не делаем
        // зато мы можем передать эти сведения в корзину
        let basket = JSON.parse(localStorage.getItem('basket'));
        if (!basket) basket = [];
        let idx = basket.findIndex(item => item.id == tovar.id);
        if (idx < 0) {
            basket.push(tovar);
        } else {
            basket[idx].quantity += tovar.quantity;
        }
        localStorage.setItem('basket', JSON.stringify(basket));
        console.log(localStorage.getItem('basket'));
        console.log(JSON.parse(localStorage.getItem('basket')));
    });
    
    
    
});
/*
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.actiontimer')) { // проверяем, что на текущей странице есть нужный элемент. поскольку файл скриптов общий, на каких-то страницах может не быть нужного (в данном случае - таймера акции).
        actionTimer(actionend);
        setTimeout(function ac_tim() {
            actionTimer(actionend);
            setTimeout(ac_tim, 950);
        }, 950);
    }
    
    if (document.querySelector('.sliderwindow')) {
        setTimeout(function sld() {
            document.querySelector('.next').addEventListener('transitionend', function() {
                setTimeout(sld, 1000);
            }, {once: true});
            sliderGo();
        }, 1000);
    }
    
});
*/

/* action timer */
function actionTimer(end) {
    let delta = Math.floor((Date.parse(end) - Date.now()) / 1000);
    if (delta > 0) {
        let seconds = delta % 60;
        delta = Math.floor(delta / 60);
        let minutes = delta % 60;
        delta = Math.floor(delta / 60);
        let hours = delta % 24;
        delta = Math.floor(delta / 24);
        $('.actiontimer').html("<b>" + delta + "</b>" + grammatics(delta, 'день', 'дня', 'дней') +"<b>" + hours + "</b>" + grammatics(hours, 'час', 'часа', 'часов') + "<b>" + addZero(minutes) + "</b>" +grammatics(minutes, 'минута', 'минуты', 'минут') + "<b>" + addZero(seconds) + "</b><span>" + grammatics(seconds, 'секунда', 'секунды', 'секунд') + "</span>");
    } else {
        $('.actiontimer').html("<b>0</b>дней<b>0</b>часов<b>00</b>минут<b>00</b><span>секунд</span>");
        //$('.action').remove();
    }
    /*
    // document.querySelector('.actiontimer').innerHTML = `<b>${delta}</b>${grammatics(delta, 'день', 'дня', 'дней')}<b>${hours}</b>${grammatics(hours, 'час', 'часа', 'часов')}<b>${addZero(minutes)}</b>${grammatics(minutes, 'минута', 'минуты', 'минут')}<b>${addZero(seconds)}</b><span>${grammatics(seconds, 'секунда', 'секунды', 'секунд')}</span>`;
    document.querySelector('.actiontimer').innerHTML = "<b>" + delta + "</b>" + grammatics(delta, 'день', 'дня', 'дней') +"<b>" + hours + "</b>" + grammatics(hours, 'час', 'часа', 'часов') + "<b>" + addZero(minutes) + "</b>" +grammatics(minutes, 'минута', 'минуты', 'минут') + "<b>" + addZero(seconds) + "</b><span>" + grammatics(seconds, 'секунда', 'секунды', 'секунд') + "</span>";
    */
}

/* slider - вынесено в отдельный файл
function sliderGo() {
    let slides = Array.from(document.querySelectorAll('.sliderwindow .slide'));
    let idx = slides.indexOf(document.querySelector('.sliderwindow .next'));
    idx++;
    idx %= slides.length;
    document.querySelector('.sliderwindow .prev').classList.remove('prev');
    document.querySelector('.sliderwindow .current').classList.add('prev');
    document.querySelector('.sliderwindow .current').classList.remove('current');
    document.querySelector('.sliderwindow .next').classList.add('current');
    document.querySelector('.sliderwindow .next').classList.remove('next');
    slides[idx].classList.add('next');
}
*/

/* lightbox */
function lightBox(curimage) {
    getModalWindow('lightbox');
    let bigimage = curimage.src.replace('_mid.', '_big.'); // вычисляем имя большой картинки
    let w, wfix, h, hfix, sides;
    w = document.documentElement.clientWidth - 100; // определяем максимальную доступную ширину
    h = document.documentElement.clientHeight - 100; // определяем максимальную доступную высоту
    sides = $(curimage).width() / $(curimage).height(); // определяем соотношение сторон картинки
    if (w > sides * h) { // если по соотношению сторон доступная ширина больше нужной
        wfix = Math.floor(sides * h); // вычисляем нужную ширину
        hfix = h;
    } else { // если по соотношению сторон доступная ширина меньше нужной
        wfix = w
        hfix = Math.floor(w / sides); // вычисляем нужную высоту
    }
    // прописываем размеры модалке, вставляем в нее картинку, добавляем класс для плавного проявления
    $('#lightbox').css({width: wfix, height: hfix}).append(`<img src="${bigimage}">`).addClass('ready');
}

/* utilites */
function addZero(num) {
    return num >= 10 ? num : '0' + num;
}
function grammatics(num, form1, form2, form3) {
    num %= 100;
    if ((num != 11) && ((num % 10) == 1)) return form1;
    if (![12, 13, 14].includes(num) && [2, 3, 4].includes(num % 10)) return form2;
    return form3;
}
function toggleLocalStorage(key, value) {
    if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, value);
    }
}
function getModalWindow(idname) {
    $('body').append('<div class="screener"></div><div class="modal" id="'+idname+'"><button type="button" class="close">&times;</button></div>');
    $('.screener, .modal .close').on('click', dropModalWindow);
}
function dropModalWindow() {
    $('.screener, .modal').remove();
}


