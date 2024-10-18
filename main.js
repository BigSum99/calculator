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

        // 00の制限
        if (value === '00') {
            if (input === '') return;
            if (lastOperator) return;
        }

        // ０の制限
        if (input.endsWith('0') && !input.includes('.') && value !== '.' && value !== '0') {
            input = input.slice(0, -1); // 最後が０の場合に新たな数字に置き換え
        } else if (value === '0') return;
        if (input === '0' && value !== '0' && value !== '.') {
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
        const currentNumber = input.split(/[\+\-\*\/]/).pop();
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
            return;
        }
        if (input === '-') return;
        if (input !== '' && !lastOperator) {
            input += value;
            updateDisplay();
            lastOperator = true;
            return;
        }
        //マイナスが続いた時の処理
        if (lastOperator) {
            if (value === '-' && input.endsWith('-')) {
                input = input.slice(0, -1); // 直前のマイナスを削除
                input += '+'; // プラスに置き換える
                updateDisplay();
                return;
            }
        }
        if (lastOperator && !negative && value === '-') {
            negative = true;
            input += value;
            updateDisplay();
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
