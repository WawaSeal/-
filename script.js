// Web Speech APIのSpeechRecognitionオブジェクトを作成
const recognition = new webkitSpeechRecognition();

// 認識する言語を日本語に設定
recognition.lang = "ja-JP";

// 認識結果を連続的に返すように設定
recognition.continuous = true;

// 認識結果の代替候補を返さないように設定
recognition.maxAlternatives = 1;

// 字幕用の要素とカラーピッカー用の要素を取得
const subtitle = document.getElementById("subtitle");
const colorPicker = document.getElementById("color-picker");

// カラーピッカーの値が変更されたら、字幕の背景色を変更する関数を登録
colorPicker.addEventListener("change", function() {
  subtitle.style.backgroundColor = this.value;
});

// 音声認識サービスが結果を返したら、英語に翻訳して字幕に表示する関数を登録
recognition.onresult = function(event) {
  // 最新の認識結果を取得
  const result = event.results[event.results.length - 1][0].transcript;

  // DeepL APIにリクエストするURLを作成
  // サブスクリプションキーは自分で取得してください
  const subscriptionKey = "YOUR_SUBSCRIPTION_KEY";
  const endpoint = "https://api.deepl.com/v2/translate?auth_key=" + subscriptionKey + "&source_lang=JA&target_lang=EN-US&text=";
  const url = new URL(endpoint + encodeURIComponent(result));

  // リクエストを送信し、レスポンスを受け取ったら字幕に表示する関数を登録
  fetch(url).then(response => response.json()).then(data => {
    // 翻訳結果を取得
    const translation = data.translations[0].text;

    // 字幕に表示
    subtitle.textContent = translation;
  });
};

// 音声認識サービスを開始
recognition.start();
