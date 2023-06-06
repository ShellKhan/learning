function makeGallery(gallery) { // функция, подключающая галерею. аргумент - галерея, обернутая в jQuery
    let imgs = gallery.find('img'); // кладем в переменную все картинки галереи
    // измеряем ширину картинки с учетом отступов и границ - это шаг галереи
    let step = imgs.eq(0).width() + parseFloat(imgs.eq(0).css('borderLeftWidth')) + parseFloat(imgs.eq(0).css('borderRightWidth')) + parseFloat(imgs.eq(0).css('marginLeft')) + parseFloat(imgs.eq(0).css('marginRight'));
    // прописываем рельсу ширину, равную сумме всех ширин картинок на нем
    gallery.find('.gal_rail').css('width', step * imgs.length + 'px');
    gallery.find('.gal_btn').on('click', function() { // подключаем кнопки "влево" и "вправо"
        galleryMove(this);
    });
    imgs.on('click', function() { // подключаем переключение главной картинки по клику на маленькую картинку в галерее
        galleryItemShow(this);
    })
}
function galleryMove(btn) { // функция движения галереи влево и вправо
    
}
function galleryItemShow(item) { // функция переключения главной картинки по клику на маленькую картинку в галерее
    
}