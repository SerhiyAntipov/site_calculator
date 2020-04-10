(function () {
    let calc = document.querySelector('.calc');
    const calcLogo = document.querySelector('.calc-logo');
    const calcDisplay = document.querySelector('.input-calc');
    const calcButtons = document.querySelectorAll('.calc-buttons button:not(.reset)');
    const number = document.querySelectorAll('.number:not(.point)');
    const mathSymbols = document.querySelectorAll('.math-symbols');
    const point = document.querySelector('.point');
    const equally = document.querySelector('.equally');
    const calcReset = document.querySelector('.reset');
    const calcErase = document.querySelector('.erase');
    const calcPlusMinus = document.querySelector('.plus-minus');
    const offButton = document.querySelector('.off');
    let valueTemp = "";
    let valPointData = 0;
    let equallyData = 0;

    // mathSymbols --------------------------------------
    mathSymbols.forEach(function (event) {
        event.addEventListener('click', function (event) {
            for (let i = 0; i < calcDisplay.value.length; i++) {
                if (equallyData === 1) {
                    valueTemp = calcDisplay.value = +eval(valueTemp).toFixed(3) + event.target.innerText;
                    equallyData = 0;
                    valPointData = 0;
                } else {
                    calcDisplay.value = +eval(valueTemp).toFixed(3) + event.target.innerText;
                    valPointData = 0;
                };
            };
        });
    });


    // Buttons ------------------------
    calcButtons.forEach(function (event) {
        event.addEventListener('click', function (event) {
            if (calcDisplay.value === 'not allowed divide by "0"' ||
                calcDisplay.value === 'a lot of symbols, max 19' ||
                calcDisplay.value === 'very large number') {
                calcDisplay.value = '';
                calcDisplay.classList.remove('not-allowed');
            };
            if (event.target.innerText === '0' && calcDisplay.value === '0') {
                calcDisplay.value = 0;
            };
            if (calcDisplay.value.length > 20) {
                calcDisplay.value = 'a lot of symbols, max 19';
                calcDisplay.classList.add('not-allowed');
            };
        });
    });

    // number -----------------------
    number.forEach(function (event) {
        event.addEventListener('click', function (event) {
            if (equallyData === 1) {
                calcDisplay.value = '';
                equallyData = 0;
            };
            if (calcDisplay.value.length <= 1 && event.target.innerText === '0' && calcDisplay.value === '0') {
                calcDisplay.value = 0;
            } else {
                valueTemp = calcDisplay.value += event.target.innerText;
                if (calcDisplay.value === '' && event.target.innerText != '.') {
                    calcDisplay.value = event.target.innerText;
                };
            };
        });
    });

    // point -----------------------------------
    point.addEventListener('click', function () {
        console.log(valPointData)
        if (valPointData == 0 && calcDisplay.value != '') {
            calcDisplay.value += event.target.innerText;
            valPointData = 1;
            console.log(valPointData)
        };
    });

    // calcEras -----------------------------------
    calcErase.addEventListener('click', function () {
        if (calcDisplay.value.length > 1) {
            valueTemp = calcDisplay.value = calcDisplay.value.slice(0, -1);
        };
    });

    // plus/minus -----------------------------------
    calcPlusMinus.addEventListener('click', function () {
        if (Number(calcDisplay.value) < 0) {
            valueTemp = calcDisplay.value = calcDisplay.value.substr(1);
        } else if (Number(calcDisplay.value) > 0) {
            valueTemp = calcDisplay.value = calcDisplay.value - calcDisplay.value * 2;
        };
    });

    // off -------------------------------------------
    offButton.addEventListener('click', function () {
        window.close();
    });

    // reset --------------------------------------
    calcReset.addEventListener('click', function () {
        calcDisplay.value = '';
        calcDisplay.classList.remove('not-allowed');
        symbols = 1;
        valueTemp = '';
        valPointData = 0;
    });

    // equally ---------------------------------------
    equally.addEventListener('click', function () {
        calcDisplay.value = +eval(calcDisplay.value).toFixed(5);
        if (+eval(calcDisplay.value).toFixed(5) > 999999999 && calcDisplay.value != Infinity) {
            calcDisplay.value = 'very large number';
            calcDisplay.classList.add('not-allowed');
        };
        if (calcDisplay.value == Number.POSITIVE_INFINITY ||
            calcDisplay.value == Infinity ||
            calcDisplay.value == Number.NEGATIVE_INFINITY ||
            calcDisplay.value == -Infinity) {
            calcDisplay.value = 'not allowed divide by "0"';
            calcDisplay.classList.add('not-allowed');
        };
        equallyData = 1;
        valPointData = 0;
    });

    // calcMove ---------------------------------------
    calcMove();

    function calcMove() {
        calcLogo.onmousedown = function (event) {
            if (event.buttons === 1) {
                calc.style.position = 'fixed';
                calc.style.left = event.pageX - calc.offsetWidth / 2 + 'px';
                calc.style.top = event.pageY - calcLogo.offsetHeight / 2 + 'px';

                document.onmousemove = function (event) {
                    calc.style.left = event.pageX - calc.offsetWidth / 2 + 'px';
                    calc.style.top = event.pageY - calcLogo.offsetHeight / 2 + 'px';
                };
            };
        };
        calcLogo.onmouseup = function () {
            document.onmousemove = false;
        };
    };
})();