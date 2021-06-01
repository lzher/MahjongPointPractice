var f2pQuestion = "";

function f2pNewQuestion() {
    keys = Object.keys(f2pAnswer);
    f2pQuestion = keys[keys.length * Math.random() << 0];
    parsedQuestion = f2pQuestion.split(",");
    textQuestion = (parsedQuestion[0] == 0 ? "子家" : "庄家") + (parsedQuestion[1] == 0 ? "" : parsedQuestion[1] + "符") + parsedQuestion[2] + "翻" + (parsedQuestion[3] == 0 ? "自摸" : "荣和");
    $("#f2pInfo").text(textQuestion);
    $("#f2pInput").val("")
}

function f2pShowResult(type, result) {
    $("#f2pResult").attr("class", "text-center alert alert-" + type).text(result);
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
            f2pShowResult("success", "正确！");
            f2pNewQuestion();
        } else {
            f2pShowResult("warning", "错误！");
            $("#f2pInput").val("")
        }
        return false;
    }
    return true;
}
