const colors = ['red', 'orange', 'yellow', 'green', 'aquamarine', 'blue', 'magenta', 'indigo'];
const mainSquare = document.getElementById('main-square');
const start = document.getElementById('start');
let timer = document.getElementById('timer');
const allSmallSquaersId = [];

//Создаем массив из Id квадратиков
for (i = 1; i < 17; i++) {
    allSmallSquaersId.push('s' + i);
}


//БЛОК манипуляций с цветами
//Функция рандомизации цветов 
const mixColors = () => {
    return Math.random() - 0.5;
};

//Создаем перемешанный массив из цветов и возвращаем его 
const randomSquaersColors = () => {
    const squaersColors = [];

    for (i = 0; i < colors.length; i++) {
        squaersColors.push(colors[i]);
        squaersColors.push(colors[i]);
    }
    return squaersColors.sort(mixColors);
};

//Функция рандомного окрашивания квадратиков
const defineAllSquaresColor = (squaersColors) => {
    for (i = 0; i < allSmallSquaersId.length; i++) {
        let square = document.getElementById(allSmallSquaersId[i]);
        if (squaersColors !== undefined) {
            square.style = "background-color: " + squaersColors[i];
            square.pointerEvents = 'auto';
        } else {
            //Изначально окрашиваем все цвета в белый с помощью класса 'white-square'
            square.classList.add('white-square');
            noneEventsByClick(square);
        }

    }
};

//Функция для установки белого цвета 
const setWhiteSquare = () => {
    for (i = 0; i < allSmallSquaersId.length; i++) {
        let square = document.getElementById(allSmallSquaersId[i]);
        square.classList.add('white-square');
    }
};

//Функция для удаления белого цвета 
const deleteWhiteSquare = (square) => {
    square.classList.remove('white-square');
};


//БЛОК начало игры
//Запрещаем кликать до нажатия Старт
const noneEventsByClick = (square) => {
    square.style.pointerEvents = 'none';
};

//Запускаем игру 
start.onclick = () => {
    counterToWin = 0;
    stopTimer();
    startTimer();
    start.innerHTML = 'Заново';
    removeSquareIdAndColor();
    setWhiteSquare();
    defineAllSquaresColor(randomSquaersColors());
    
};

//Анализируем цвета квадратиков 
mainSquare.onclick = (event) => {

    //Блокировка в случае победы
    if (counterToWin === colors.length) {
        counterToWin = 0;
        return true;
    }

    const square = event.target;
    deleteWhiteSquare(square);

    //Проверяем на совпадение цветов и даем время для запоминания
    setTimeout(function () {
        if (checkSameColors(square)) {
            checkSameColors(square);
        } else {
            recordSquareIdAndColor(square);
        }
    }, 300);
};


//БЛОК проверки на совподающую пару 
const colorPreviosSquare = [];
const indexPreviosSquare = [];
let counterToWin = 0;

//Обнуляем данные прошлого квадратика 
const removeSquareIdAndColor = () => {
    colorPreviosSquare.splice(0, colorPreviosSquare.length);
    indexPreviosSquare.splice(0, indexPreviosSquare.length);
};

//Запоминаем значение предыдущего квадратика 
const recordSquareIdAndColor = (square) => {
    let colorSquare = square.style.backgroundColor;
    let squareId = square.id;
    if (colorSquare === '' || squareId === 'main-square') {
        removeSquareIdAndColor();
    } else {
        colorPreviosSquare.push(colorSquare);
        indexPreviosSquare.push(squareId);
    }
};

//Сравниваем квадратики на совпадение или различие цветов 
const checkSameColors = (square) => {
    let currentColor = square.style.backgroundColor;
    let preSquare = document.getElementById(indexPreviosSquare[0]);

    if (colorPreviosSquare[0] !== undefined) {
        if (colorPreviosSquare[0] !== currentColor) {

            square.classList.add('white-square');
            preSquare.classList.add('white-square');
            removeSquareIdAndColor();
            return true;

        } else if (square.id === preSquare.id) {

            removeSquareIdAndColor();
            return false;

        } else {
            console.log(counterToWin);
            counterToWin++;
            noneEventsByClick(square);
            noneEventsByClick(preSquare);
            removeSquareIdAndColor();
            //Проверяем все ли квадратики открыты для победы
            if (counterToWin === colors.length) {
                stopTimer();
                alert('Вы выиграли!\n\nЗатраченое время: ' + timer.innerHTML);
            }
            return true;
        }
    }
    return false;
};


//БЛОК Таймер
//Объявляем переменные для таймера
let base = 60;
let clocktimer, dateObj, dh, dm, ds;
let readout = '';
let h = 1;
let m = 1;
let tm = 1;
let s = 0;
let ts = 0;
let ms = 0;
let init = 0;

//Функция для очистки поля таймера
const clearClock  = () => {
    clearTimeout(clocktimer);
    h = 1;
    m = 1;
    tm = 1;
    s = 0;
    ts = 0;
    ms = 0;
    init = 0;
    timer.innerHTML = '00:00:00';
};

//Функция для старта таймера
const startTIME = () => {
    let cdateObj = new Date();
    let t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
    if (t > 999) {
        s++;
    }
    if (s >= (m * base)) {
        ts = 0;
        m++;
    } else {
        ts = parseInt((ms / 100) + s);
        if (ts >= base) {
            ts = ts - ((m - 1) * base);
        }
    }
    if (m > (h * base)) {
        tm = 1;
        h++;
    } else {
        tm = parseInt((ms / 100) + m);
        if (tm >= base) {
            tm = tm - ((h - 1) * base);
        }
    }
    ms = Math.round(t / 10);
    if (ms > 99) {
        ms = 0;
    }
    if (ms === 0) {
        ms = '00';
    }
    if (ms > 0 && ms <= 9) {
        ms = '0' + ms;
    }
    if (ts > 0) {
        ds = ts;
        if (ts < 10) {
            ds = '0' + ts;
        }
    } else {
        ds = '00';
    }
    dm = tm - 1;
    if (dm > 0) {
        if (dm < 10) {
            dm = '0' + dm;
        }
    } else {
        dm = '00';
    }
    dh = h - 1;
    if (dh > 0) {
        if (dh < 10) {
            dh = '0' + dh;
        }
    } else {
        dh = '00';
    }
    readout = dh + ':' + dm + ':' + ds;
    timer.innerHTML = readout;
    clocktimer = setTimeout("startTIME()", 1);
};

//Функция запуска таймера
const startTimer = () => {
    if (init === 0) {
        clearClock();
        dateObj = new Date();
        startTIME();
        init = 1;
    }
};

//Функция остановки таймера
const stopTimer = () => {
    clearTimeout(clocktimer);
    init = 0;
};

//Вызываем функцию для первичного окрашивания в белый цвет всех квадратиков
defineAllSquaresColor();







