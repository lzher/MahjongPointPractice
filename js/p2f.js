var p2fQuestion = "";

function p2fNewQuestion() {
    keys = Object.keys(p2fAnswer);
    p2fQuestion = keys[keys.length * Math.random() << 0];
    $("#p2fInfo").text(p2fQuestion);
    $("#p2fInput").val("");
}

function p2fShowResult(type, result) {
    $("#p2fResult").attr("class", "text-center alert alert-" + type).text(result);
}

function p2fParseAnswer(answerText) {
    answerText = answerText.trim();

    fufan = /\d+(\D+)\d+(\D+)\d+/.exec(answerText);
    if(fufan != null) {
        answerText = answerText.replace(fufan[1], ",");
        return answerText.replace(fufan[2], ",");
    }

    fufan = /\d+(\D+)\d+/.exec(answerText);
    if(fufan != null) {
        return answerText.replace(fufan[1], ",");
    }

    return answerText;
}

function p2fInput(event) {
    if(event.keyCode == 13) {
        answerText = $("#p2fInput").val();
        answer = p2fParseAnswer(answerText);
        if(p2fAnswer[p2fQuestion].indexOf(answer) >= 0) {
            p2fShowResult("success", "正确！");
            p2fNewQuestion();
        } else {
            p2fShowResult("warning", "错误！");
            $("#p2fInput").val("")
        }
        return false;
    }
    return true;
}
