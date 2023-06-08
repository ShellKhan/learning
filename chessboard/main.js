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
const FIGUREMOVE = { // набор ходов и боев для фигур
    king(a, b) {
        return (Math.abs(a.x - b.x) <= 1) && (Math.abs(a.y - b.y) <= 1);
    },
    queen(a, b) {
        return FIGUREMOVE.rook(a, b) || FIGUREMOVE.bishop(a, b);
    },
    rook(a, b) {
        if ((a.x == b.x) || (a.y == b.y)) {
            if (Math.abs(a.x - b.x + a.y - b.y) == 1) {
                return true;
            }
            if (a.x == b.x) {
                if (a.y < b.y) {
                    start = a.y + 1;
                    stop = b.y;
                } else {
                    start = b.y + 1;
                    stop = a.y;
                }
                for (let i = start; i < stop; i++) {
                    if (checkFigureInCell(getCellByIndex(a.x, i))) return false;
                }
            } else {
                if (a.x < b.x) {
                    start = a.x + 1;
                    stop = b.x;
                } else {
                    start = b.x + 1;
                    stop = a.x;
                }
                for (let i = start; i < stop; i++) {
                    if (checkFigureInCell(getCellByIndex(i, a.y))) return false;
                }
            }
            return true;
        } else {
            return false;
        }
    },
    bishop(a, b) {
        if ((a.x + a.y == b.x + b.y) || (a.x - a.y == b.x - b.y)) {
            if (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) == 2) {
                return true;
            }
            if (a.x + a.y == b.x + b.y) {
                if (a.x > b.x) {
                    start = b.x + 1;
                    stop = a.x;
                } else {
                    start = a.x + 1;
                    stop = b.x;
                }
                for (let i = start; i < stop; i++) {
                    if (checkFigureInCell(getCellByIndex(i, a.x + a.y - i))) return false;
                }
            } else {
                if (a.x > b.x) {
                    start = b.x + 1;
                    stop = a.x;
                } else {
                    start = a.x + 1;
                    stop = b.x;
                }
                for (let i = start; i < stop; i++) {
                    if (checkFigureInCell(getCellByIndex(i, i - b.x + b.y))) return false;
                }
            }
            return true;
        } else {
            return false;
        }
    },
    knight(a, b) {
        return ((Math.abs(a.x - b.x) == 1) && (Math.abs(a.y - b.y) == 2)) || ((Math.abs(a.x - b.x) == 2) && (Math.abs(a.y - b.y) == 1));
    },
    whitepawngo(a, b) {
        return false; // заглушка
    },
    blackpawngo(a, b) {
        return false; // заглушка
    },
    whitepawnbeat(a, b) {
        return false; // заглушка
    },
    blackpawnbeat(a, b) {
        return false; // заглушка
    },
    castling(a, b) { // при успешной проверке надо прямо здесь переставить ладью!!!
        return false; // заглушка
    },
};

/* variables */
let figureset = []; // коллекция фигур, стоящих сейчас на доске
let startpos = [ // описание начальной расстановки фигур, пока без пешек
    ['king','white','e1'],
    ['king','black','e8'],
    ['queen','white','d1'],
    ['queen','black','d8'],
    ['rook','white','a1'],
    ['rook','black','a8'],
    ['rook','white','h1'],
    ['rook','black','h8'],
    ['bishop','white','c1'],
    ['bishop','black','c8'],
    ['bishop','white','f1'],
    ['bishop','black','f8'],
    ['knight','white','b1'],
    ['knight','black','b8'],
    ['knight','white','g1'],
    ['knight','black','g8']
]

/* main */
$(function() { // стартуем по готовности DOM
    startpos.forEach(item => { // расставляем фигуры на доске
        let figure = new ChessFigure(...item);
        figure.render();
        figureset.push(figure); // выставленную фигуру добавляем в коллекцию всех фигур на доске
    });
    $(document).on('click', 'td', function(e) { // обрабатываем клик по полю на доске
        useCell(e.target);
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
    return {x: x, y: y};
}
function getCellByChessCoords(str) { // получаем клетку по шахматному имени
    let x = 'abcdefgh'.indexOf(str[0]);
    let y = 9 - str[1];
    return $('tr').eq(y).find('td')[x];
}
function getCellByIndex(x, y) { // получаем клетку по координатам
    return $('tr').eq(y).find('td')[x + 1];
}
function useCell(cell) { // обработчик клика по клетке
    if ($(cell).hasClass('cellfrom')) { // если клик по стартовому полю, ход отменяется
            $(cell).removeClass('cellfrom');
    } else if ($('.cellfrom').length) { // если стартовое поле есть...
        if (canIMove(cell)) { // если мы можем сделать ход...
            getFigure($('.cellfrom')[0]).changePos(cell); // делаем ход...
        }
        $('.cellfrom').removeClass('cellfrom'); // и убираем пометку стартового поля
    } else { // если стартового поля нет...
        if (checkFigureInCell(cell)) $(cell).addClass('cellfrom'); // делаем кликнутое поле стартовым, если на нем есть фигура
    }
}
function checkFigureInCell(cell) { // проверка, пуста ли клетка
    return !!$(cell).html();
}
function canIMove(cell) { // проверка можно ли сюда делать ход (в том числе и бой)
    let figure = getFigure($('.cellfrom')[0]);
    let aim = getFigure(cell);
    if ((!aim) || (aim.color != figure.color)) { // если поле пустое или занято фигурой не своего цвета
        if ((figure.name != 'pawn') && (figure.name != 'king')) {
            return FIGUREMOVE[figure.name](getCellIndex($('.cellfrom')[0]), getCellIndex(cell));
        }
        if (figure.name == 'king') {
            return FIGUREMOVE[figure.name](getCellIndex($('.cellfrom')[0]), getCellIndex(cell)) || FIGUREMOVE['castling'](getCellIndex($('.cellfrom')[0]), getCellIndex(cell));
        }
        if (figure.color == 'white') {
            return FIGUREMOVE['whitepawngo'](getCellIndex($('.cellfrom')[0]), getCellIndex(cell)) || FIGUREMOVE['whitepawnbeat'](getCellIndex($('.cellfrom')[0]), getCellIndex(cell));
        } else {
            return FIGUREMOVE['blackpawngo'](getCellIndex($('.cellfrom')[0]), getCellIndex(cell)) || FIGUREMOVE['blackpawnbeat'](getCellIndex($('.cellfrom')[0]), getCellIndex(cell));
        }
    }
    return false;
}
function getFigure(cell) { // получаем фигуру из клетки (считаем, что она там точно есть)
    return figureset.filter(item => item.position === getChessCoords(cell))[0];
}
function checkConvert(figure) { // функция превращения пешки
    if ((this.color = 'white') && (this.position[1] == '8') || (this.color = 'black') && (this.position[1] == '1')) {
        if (confirm('Ваша пешка достигла последней линии и может превратиться. Превращаем ее в ферзя?')) {
            this.name = 'queen';
        } else if (confirm('Превращаем ее в ладью?')) {
            this.name = 'rook';
        } else if (confirm('Превращаем ее в слона?')) {
            this.name = 'bishop';
        } else {
            alert('Ну значит будет конь.')
            this.name = 'knight';
        }
    }
}

/* classes */
class ChessFigure { // каждый объект класса - шахматная фигура, имеет название, цвет, позицию на доске
    constructor(name, color, position){
        this.name = name;
        this.color = color;
        this.position = position.toLowerCase();
        this.firststep = true;
    }
    render(){ // отрисовываем фигуру на доске. если здесь стояла другая фигура, мы ее затираем
        $(getCellByChessCoords(this.position)).html(FIGURESYMBOL[this.name][this.color]);
    }
    clear(){ // убираем фигуру с доски
        $(getCellByChessCoords(this.position)).html('');
    }
    changePos(cell){ // переставляем фигуру на новое поле (в том числе и с боем)
        this.firststep = false;
        this.clear();
        if (checkFigureInCell(cell)) { // если бьем, жертва удаляется из списка живых - а ее изображение на доске затрет наш рендер
            let aim = getFigure(cell);
            figureset = figureset.filter(item => item !== aim);
        }
        this.position = getChessCoords(cell);
        if (this.name == 'pawn') checkConvert(this);
        this.render();
    }
}
