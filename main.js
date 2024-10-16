$(document).ready(function() {
    let display = $('#display');
    let input = ''
    let operator = '';
    let firstNumber = null;
    
    //ディスプレイの更新
    function updateDisplay() {
        display.val(input);
    }

    //計算関数
    function calculate(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
            if(b === 0) {   //0で割れないように制限
                alert('0で割ることはできません');
                return a;
            } else {
                return a / b;
            }
            default: return b;
        }
    }

    // 数字をクリックしたとき
    $('.num').on('click', function() {
        let value = $(this).data('value');

        // 00の入力制限
        if (value ==='00') {
            if (input  === '0' || input === '') return; //0が入力されているか、何も入力されていない場合に処理を無視。
        }
        //0の入力制限
        if (value === '0' && input === '0' && !input.includes('.')) return; //０がすでに入力されていて、小数点を含まない場合に処理を無視
        if (input === '0' && value !== '0') {   //0が入力されていて、次に違う値が入力されたとき
            input = ''; //0をなかったことにする
        } 
        // .の入力制限
        if (value === '.') {
            if (input === '') { //何も入力されてない場合
                input = '0.';   //0.に置き換える
                updateDisplay();
            } else if (!input.includes('.')) { 
                input += value;    //.を含んでいない場合のみ.を加える
                updateDisplay();   
            }
            return;
        }
        //それ以外の場合の処理
        input += value;
        updateDisplay();
    });

    // 演算子が入力されたとき
    $('.op').on('click', function() {
        if (input === '' && operator === '') return; // 入力がない場合は何もしない

        if (firstNumber === null) { //firstNumberの値が空の場合
            firstNumber = parseFloat(input);    //最初の入力を数値として設定
        } else {    //２回目以降の場合
            firstNumber = calculate(firstNumber, parseFloat(input), operator);  //計算結果から続けて計算を行うために
        }

        operator = $(this).data('value');
        input = ''; 
        updateDisplay();
    });

    $('#equal').on('click', function() {
        if (input === '' || operator === '') return; //入力がない場合処理を無視

        firstNumber = calculate(firstNumber, parseFloat(input), operator);  //計算の実行
        input = firstNumber.toString(); //文字列化して代入
        operator = '';
        updateDisplay();
    });

    //ACボタンをクリックしたとき
    $('#clear').on('click', function() {
        input = '';
        firstNumber = null;
        operator = '';
        updateDisplay();
    });

    $('#negate').on('click', function() {
        if (input === '') return; 

        if (input.startsWith('-')) {
            input = input.substring(1); // マイナスを削除
        } else {
            input = '-' + input; // マイナスを追加
        }
        updateDisplay();
    });


});
