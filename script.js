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

  // Bing Translator APIにリクエストするURLを作成
  // サブスクリプションキーとリージョンは自分で取得してください
  const subscriptionKey = "YOUR_SUBSCRIPTION_KEY";
  const region = "YOUR_REGION";
  const endpoint = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=ja&to=en";
  const url = new URL(endpoint);

  // リクエストするデータを作成
  const data = [{
    text: result
  }];

  // リクエストするオプションを作成
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Ocp-Apim-Subscription-Region": region
    }
  };

  // リクエストを送信し、レスポンスを受け取ったら字幕に表示する関数を登録
  fetch(url, options).then(response => response.json()).then(data => {
    // 翻訳結果を取得
    const translation = data[0].translations[0].text;

    // 字幕に表示
    subtitle.textContent = translation;
  });
};

// 音声認識サービスを開始
recognition.start();
