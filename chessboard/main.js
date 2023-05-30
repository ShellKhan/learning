/* constants */
const FIGURESYMBOL = { // набор изображений для фигур
    king: {
        white: '&#9812;',
        black: '&#9818;'
    },
    queen: {
        white: '&#9813;',
        black: '&#9819;'
    },
    rook: {
        white: '&#9814;',
        black: '&#9820;'
    },
    bishop: {
        white: '&#9815;',
        black: '&#9821;'
    },
    knight: {
        white: '&#9816;',
        black: '&#9822;'
    },
    pawn: {
        white: '&#9817;',
        black: '&#9823;'
    }
};



/* variables */
let figureset = []; // коллекция фигур, стоящих сейчас на доске
let startpos = [ // описание начальной расстановки фигур
    ['king','white','e1'],
    ['king','black','e8']
]



/* main */
$(function() { // стартуем по готовности DOM
    $(document).on('click', 'td', function(e) { // обрабатываем клик по полю на доске
        useCell(e.target);
    });
    startpos.forEach(item => { // расставляем фигуры на доске
        let figure = new ChessFigure(...item);
        figure.render();
        figureset.push(figure); // выставленную фигуру добавляем в коллекцию всех фигур на доске
    });
});



/* functions */
function getChessCoords(cell) { // получаем шахматное имя клетки
    let x = 'abcdefgh'[$(cell).parent().find('td').index(cell)];
    let y = 9 - $('tr').index(cell.parentElement);
    return x + y;
}
function getCellIndex(cell) { // получаем числовые координаты клетки
    let x = $(cell.parentElement.children).index(cell);
    let y = $('tr').index(cell.parentElement);
    return [x, y];
}
function getCellByChessCoords(str) { // получаем клетку по шахматному имени
    let x = 'abcdefgh'.indexOf(str[0]);
    let y = 9 - str[1];
    return $('tr').eq(y).find('td')[x];
}
function getCellByIndex(x, y) { // получаем клетку по коориднатам
    return $('tr').eq(y).find('td')[x + 1];
}
function useCell(cell) { // обработчик клика по клетке
    if ($(cell).hasClass('cellfrom')) { // если клик по стартовому полю, ход отменяется
            $(cell).removeClass('cellfrom');
    } else if ($('.cellfrom').length) { // если стартовое поле есть...
        if (canIMove(cell)) { // если мы можем сделать ход...
            getFigure($('.cellfrom')[0]).changePos(cell); // делаем ход...
            $('.cellfrom').removeClass('cellfrom'); // и убираем пометку стартового поля
        }
    } else { // если стартового поля нет...
        if (checkFigureInCell(cell)) $(cell).addClass('cellfrom'); // делаем кликнутое поле стартовым, если на нем есть фигура
    }
}
function checkFigureInCell(cell) { // проверка, пуста ли клетка
    return !!$(cell).html();
}
function canIMove(cell) { // проверка можно ли сюда делать ход (в том числе и бой)
    // тут пока заглушка
    return !checkFigureInCell(cell);
}
function getFigure(cell) { // получаем фигуру из клетки (считаем, что она там точно есть)
    return figureset.filter(item => item.position === getChessCoords(cell))[0];
}



/* classes */
class ChessFigure { // каждый объект класса - шахматная фигура, имеет название, цвет, позицию на доске
    constructor(name, color, position){
        this.name = name;
        this.color = color;
        this.position = position.toLowerCase();
    }
    render(){ // отрисовываем фигуру на доске
        $(getCellByChessCoords(this.position)).html(FIGURESYMBOL[this.name][this.color]);
    }
    clear(){ // убираем фигуру с доски
        $(getCellByChessCoords(this.position)).html('');
    }
    changePos(cell){ // переставляем фигуру на новое поле (в том числе и с боем)
        this.clear();
        this.position = getChessCoords(cell);
        this.render();
    }
}


