$(document).ready(function () {
    let display = $('#display');
    let input = '';
    let lastOperator = false;
    let negative = false;
    // ディスプレイの更新
    function updateDisplay() {
        display.val(input);
    }

    // 計算関数(new)
    function evaluateExpression() {
        try {
            return eval(input);
        } catch (e) {
            alert("無効な計算式です");
            return input;
        }
    }

    // 数字をクリックしたとき
    $('.num').on('click', function () {
        let value = $(this).data('value');
        const currentNumber = input.split(/[\+\-\*\/]/).pop();
        // 00の制限
        if (value === '00') {
            if (currentNumber === '' || currentNumber === '0' || lastOperator && !currentNumber.includes('.')) return;
        }

        // ０の制限
        if (value == '0') {
            if (currentNumber === '' && lastOperator) {
                input += '0.';
                updateDisplay();
                return;
            }
            if (currentNumber === '0' && !currentNumber.includes('.')) return;
        }

        if (input === '0' && value !== '0') {
            input = '';
        }

        // 小数点の制限
        if (value === '.') {
            if (input === '') {
                input = '0'
            }
            if (lastOperator) return;
        }

        // 小数点が同じ数値で使われないように

        if (value === '.' && currentNumber.includes('.')) {
            return;
        }

        lastOperator = false;
        input += value;
        updateDisplay();
    });

    // 演算子をクリックしたときの処理
    $('.op').on('click', function () {
        let value = $(this).data('value');
        if (input === '' && value === '-') {
            input += value;
            updateDisplay();
            lastOperator = true;
            return;
        }
        if (input === '-') return;
        if (input.endsWith('.')) return;
        if (input !== '' && !lastOperator) {
            input += value;
            updateDisplay();
            lastOperator = true;
            return;
        }

        if (lastOperator) {
            return;
        }

    });

    //イコールをクリックしたとき
    $('#equal').on('click', function () {
        if (input === '') return;
        let result = evaluateExpression();
        input = result.toString();
        updateDisplay();
        lastOperator = false;
        negative = false;
    });

    // AC ボタンをクリックしたとき
    $('#clear').on('click', function () {
        input = '';
        lastOperator = false;
        negative = false;
        updateDisplay();
    });


});
