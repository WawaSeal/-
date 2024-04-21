
        var flag_speech = 0;//flag

        function vr_function() {
            window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
            var recognition = new webkitSpeechRecognition();
			
			
			
            recognition.lang = document.getElementById('sourceLang').value;
            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.onsoundstart = function() {
                document.getElementById('status').innerHTML = "認識中";
            };
            recognition.onnomatch = function() {
                document.getElementById('status').innerHTML = "開始ボタンをもう一度推してね";
            };
            recognition.onerror = function() {
                document.getElementById('status').innerHTML = "エラー";
                if(flag_speech == 0)
                  vr_function();
            };
            recognition.onsoundend = function() {
                document.getElementById('status').innerHTML = "停止中";
                  vr_function();
            };

            recognition.onresult = function(event) {
                var results = event.results;
                for (var i = event.resultIndex; i < results.length; i++) {
                    if (results[i].isFinal)
                    {
                        document.getElementById('base_text').innerHTML = results[i][0].transcript;
			deeplTranslate();
                        vr_function();
                    }
                    else
                    {
                        document.getElementById('base_text').innerHTML = results[i][0].transcript;
                        flag_speech = 1;
                    }
                }
            }
            flag_speech = 0;
            document.getElementById('status').innerHTML = "start";
            recognition.start();
        }

const API_KEY = '04a2ad04-e561-660d-f1ef-b7470570b5e7' ;
const API_URL = 'https://api.deepl.com/v2/translate';

function deeplTranslate() {
    let deeplInput = document.getElementById("base_text").value;
    
    // Get selected languages from the dropdowns
    let selectedSourceLang = document.getElementById("sourceLang").value.toUpperCase();
    let selectedTargetLang = document.getElementById("targetLang").value.toUpperCase();
    
    // Set sourceLang and targetLang based on user selection
    let sourceLang = '&source_lang=' + selectedSourceLang;
    let targetLang = '&target_lang=' + selectedTargetLang;

    let content = encodeURI('auth_key=' + '98e2d31f-50b8-9ded-1052-f31c8dfd4d9c:fx' + '&text=' + deeplInput + sourceLang + targetLang);
    let url = 'https://api-free.deepl.com/v2/translate' + '?' + content;

    fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then(function(data) {
            document.getElementById("result_text").value = data["translations"][0]["text"];
        }).catch(function(error) {
            alert("翻訳失敗");
        });
};


//色変更
	window.addEventListener('DOMContentLoaded',function(){
 		bgc = document.getElementById('bgc');
		txc = document.getElementById('txc');
		font = document.getElementById('font');
		weight = document.getElementById('weight');
		style = document.getElementById('style');
		border = document.getElementById('border');
		bc = document.getElementById('bordercolor');
  		base_text = document.getElementById('base_text');
		result_text = document.getElementById('result_text');
  		bgc.addEventListener('change',bgcChange,false);
		txc.addEventListener('change',txcChange,false);
		font.addEventListener('change',fontChange,false)
		weight.addEventListener('change',weightChange,false)
		style.addEventListener('change',styleChange,false)
		border.addEventListener('change',borderChange,false)
 	 function bgcChange(){
    		base_text.style.backgroundColor = this.value;
		result_text.style.backgroundColor = this.value;
  		}

	function txcChange(){
    		base_text.style.color = this.value;
		result_text.style.color = this.value;
  		}

	function fontChange(){
    		base_text.style.fontFamily = this.value;
		result_text.style.fontFamily = this.value;
  		}

	function weightChange(){
		if(weight.checked==true){
		base_text.style.fontWeight = "Bold";
		result_text.style.fontWeight = "Bold";
		}
		else{
		base_text.style.fontWeight = "normal";
		result_text.style.fontWeight = "normal";
		}
	}

	function styleChange(){
		if(style.checked==true){		
		base_text.style.fontStyle = "italic";
		result_text.style.fontStyle = "italic";
		}
		else{
				base_text.style.fontStyle = "normal";
		result_text.style.fontStyle = "normal";
		}
  		}
		  
	function borderChange(){
		if(border.checked==true){		
		result_text.style.textShadow = "1px 1px 0 " + bc.value + ",-1px 1px 0" + bc.value + ",1px -1px 0 " +     bc.value + ",-1px -1px 0" + bc.value;
		}
		else{
		result_text.style.textShadow = "";
		}
  		}
	});
