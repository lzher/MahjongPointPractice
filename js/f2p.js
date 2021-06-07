var f2pQuestion = "";


function f2pNewQuestion() {
    keys = Object.keys(f2pAnswer);
    f2pQuestion = keys[keys.length * Math.random() << 0];
    parsedQuestion = f2pQuestion.split(",");
    textQuestion = (parsedQuestion[0] == 0 ? "子家" : "庄家") + (parsedQuestion[1] == 0 ? "" : parsedQuestion[1] + "符") + parsedQuestion[2] + "翻" + (parsedQuestion[3] == 0 ? "自摸" : "荣和");
    $("#f2pInfo").text(textQuestion);
    $("#f2pInput").val("")

}

function f2pShowScores() {
    if(!('mjp-saves' in localStorage)) {
        localStorage['mjp-saves'] = JSON.stringify({});
    }
    save = JSON.parse(localStorage['mjp-saves']);
    if(!('f2p' in save)) {
        save['f2p'] = {'total': 0, 'correct': 0, 'continue': 0};
    }
    localStorage['mjp-saves'] = JSON.stringify(save);
    
    res = JSON.parse(localStorage['mjp-saves'])['f2p'];
    result = "";
    result += "连续正确回答：" + res['continue'];
    result += "<br />";
    result += "总计回答情况：" + res['correct'] + "/" + res['total'];
    result += "(" + ((res['correct'] / res['total'] * 100).toFixed(2)) + "%)";
    $("#f2pScore").html(result)
}

function f2pShowResult(type, result) {
    $("#f2pResult").attr("class", "text-center alert alert-" + type).text(result);
}

function f2pAddResult(success) {
    save = JSON.parse(localStorage['mjp-saves']);
    res = save['f2p'];
    res['total'] += 1;
    if(success) {
        res['correct'] += 1;
        res['continue'] += 1;
    } else {
        res['continue'] = 0;
    }

    save['f2p'] = res;
    localStorage['mjp-saves'] = JSON.stringify(save);
}

function f2pParseAnswer(answerText) {
    answerText = answerText.trim();
    playerDrawn = /\d+(\D+)\d+/.exec(answerText);
    if(playerDrawn != null) {
        return answerText.replace(playerDrawn[1], "-");
    }

    dealerDrawn = /\d+(\D+)/.exec(answerText);
    if(dealerDrawn != null) {
        return answerText.replace(dealerDrawn[1], "all")
    }

    return answerText;
}

function f2pInput(event) {
    if(event.keyCode == 13) {
        answerText = $("#f2pInput").val();
        answer = f2pParseAnswer(answerText);
        if(answer == f2pAnswer[f2pQuestion]) {
            f2pAddResult(true);
            f2pShowResult("success", "正确！");
            f2pShowScores();
            f2pNewQuestion();
        } else {
            f2pAddResult(false);
            f2pShowResult("warning", "错误！");
            f2pShowScores();
            $("#f2pInput").val("")
        }
        return false;
    }
    return true;
}
