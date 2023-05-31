/* variables */
let actionend;



/* main */
document.addEventListener('DOMContentLoaded', function() {
    actionTimer(actionend);
    setTimeout(function ac_tim() {
        actionTimer(actionend);
        setTimeout(ac_tim, 950);
    }, 950);
    
    
    
    
    
    
});



/* action timer */
function actionTimer(end) {
    let delta = Math.floor((Date.parse(end) - Date.now()) / 1000);
    let seconds = delta % 60;
    delta = Math.floor(delta / 60);
    let minutes = delta % 60;
    delta = Math.floor(delta / 60);
    let hours = delta % 24;
    delta = Math.floor(delta / 24);
    document.querySelector('.actiontimer').innerHTML = `<b>${delta}</b>${grammatics(delta, 'день', 'дня', 'дней')}<b>${hours}</b>${grammatics(hours, 'час', 'часа', 'часов')}<b>${addZero(minutes)}</b>${grammatics(minutes, 'минута', 'минуты', 'минут')}<b>${addZero(seconds)}</b><span>${grammatics(seconds, 'секунда', 'секунды', 'секунд')}</span>`;
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



