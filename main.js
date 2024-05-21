 // 配列の初期化
 let untyped = '';
 let typed = '';
 let score = 0;

 // まずはHTML要素を取得するために、getElementById()メソッドを使う。
 // getElementById()メソッドは、HTML要素のid属性の値を指定して、それに一致する要素を取得するメソッドである
 // →これにあてはめる「document.getElementById(id 属性の値)」
 // getElementById()メソッドでHTML要素（ここではuntypedfieldという名前にする）を取得する

 // 必要なHTML要素の取得
 const untypedfield = document.getElementById('untyped');
 const typedfield = document.getElementById('typed');
 const wrap = document.getElementById('wrap');
 const start = document.getElementById('start');
 const count = document.getElementById('count');
  
 // 複数のテキストを格納する配列
 const textLists = [
   'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
  ];
 
 // ランダムなテキストを表示
 const createText = () => {

   // 正タイプした文字列をクリア
   typed = '';
   typedfield.textContent = typed;

    // ランダムな数値を取得する「Math.random()」メソッド
    // この「Math.random()」メソッドに、配列の要素数（textLists.length）を掛ける
    // 検証ツール～コンソール表示したとき「2.12....～」となっているので、
    // 小数点以下を排除するために「Math.floor(数値);」メソッドを使う
    // そうすることでコンソール表示したとき「2」「0」「1」など整数となる
    //　この値を配列のインデックスに指定すればDONE！
    
    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);

    // 配列からランダムにテキストを取得し画面に表示する
     untyped = textLists[random];
  // textContentプロパティを設定することで画面にテキストを表示できるようにする
  // →変数untypedを定数untypedfieldのtextContentプロパティに代入する→つまり画面に表示される
     untypedfield.textContent = untyped;
 };
  //createText();

 // ＜関数keyPress＞
 //  ・イベントオブジェクトの中から、何のキーが入力されたのか（e.key）の情報を取得し、コンソールログに表示する
 // ＜イベントリスナー（document.addEventListener）＞
 //  ・keypressイベントで関数keyPressを実行するように設定する
 
 // キー入力の判定

 // ＜関数keyPress＞
 //  ・変数untypedの先頭文字を取得し、変数typedの末尾に追加する
 //  ・substring()メソッドでテキストの先頭文字を抽出し、入力された文字と比較する
 //  ・つまりsubstring(開始インデックス[, 終了インデックス])のメソッドで文字列の先頭を抽出し、
 //  ・1文字ずつ文字色を変更する
 //  ・変数untypedに2文字目以降の文字列を再代入する（変数untypedの先頭文字を削除する）
 //  ・定数typedfieldのtextContentプロパティに変数typedを代入する
 //  ・定数untypedfieldのtextContentプロパティに変数untypedを代入する

 const keyPress = e => {
  // 誤タイプの場合
    //  ・入力された文字（e.key）と変数untypedの先頭文字を比較し、不一致の場合は処理を終了（return）する
      if(e.key !== untyped.substring(0, 1)){
        wrap.classList.add('mistyped');

        // 100ms後に背景色を元に戻す
        setTimeout(() => {
          wrap.classList.remove('mistyped');
        }, 100);

        return;
      }

    // 正タイプの場合
    // スコアのインクリメント
        score++;
      wrap.classList.remove('mistyped');
      typed += untyped.substring(0, 1);
      untyped = untyped.substring(1);
      typedfield.textContent = typed;
      untypedfield.textContent = untyped;
      
    // テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
      createText();
  }      
 };
 
 // タイピングスキルのランクを判定
 const rankCheck = score => {
  
  //スコアの値を返す
  //return`${score}文字打てました！`;
  
  //テキストを格納する変数textを宣言。
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
   } else if(score < 200) {
     text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
   } else if(score < 300) {
     text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
   } else if(score >= 300) {
     text = `あなたのランクはSです。\nおめでとうございます!`;    
   }
   // 生成したメッセージと一緒に文字列を返す
   return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;

 };
 
 // ゲームを終了
 const gameOver = id => {
  clearInterval(id);
  //console.log('ゲーム終了!');
  const result = confirm(rankCheck(score));
};

 // カウントダウンタイマー
 const timer = () => {
 
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      clearInterval(id);// タイマー停止後にgameOver関数を呼び出す
      gameOver(id);
    }
  }, 1000);
};

 // キーボードのイベント処理
 // 対象要素.addEventListener(イベント, イベント発生時に呼び出す関数);
 // document.addEventListener('keypress', keyPress);
 // 今回の場合、キー入力（keypressイベント）をきっかけに関数keyPressを呼び出すので、↑のように記述します。
 // なお「イベント発生時に呼び出す関数」に指定した関数keyPressは、ユーザーが入力したキーを正誤判定する処理を行います。

 // ゲームスタート時の処理
 // HTML要素.addEventListener('イベントの種類', () => {
 // イベント処理
 // });
 // 今回はaddEventListener()メソッドを使い、スタートボタンをクリックしたときの処理を記述します。
 // また、スタートボタンをクリックする前は「スタートボタンで開始」というテキストを表示します。
 // 定数untypedfieldには未入力の文字を表示するspan要素が格納されているので、そこで表示します。
 // テキストを変更するにはtextContentプロパティを使えばOKです。

 // ということで改めてゲームスタート時の処理
 start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
　createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress',keyPress);
});

 untypedfield.textContent = 'スタートボタンで開始';
