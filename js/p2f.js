var p2fQuestion = "";

function p2fNewQuestion() {
    keys = Object.keys(p2fAnswer);
    p2fQuestion = keys[keys.length * Math.random() << 0];
    $("#p2fInfo").text(p2fQuestion);
    $("#p2fInput").val("");
}
function p2fShowScores() {
    if(!('mjp-saves' in localStorage)) {
        localStorage['mjp-saves'] = JSON.stringify({});
    }
    save = JSON.parse(localStorage['mjp-saves']);
    if(!('p2f' in save)) {
        save['p2f'] = {'total': 0, 'correct': 0, 'continue': 0};
    }
    localStorage['mjp-saves'] = JSON.stringify(save);
    
    res = JSON.parse(localStorage['mjp-saves'])['p2f'];
    result = "";
    result += "连续正确回答：" + res['continue'];
    result += "<br />";
    result += "总计回答情况：" + res['correct'] + "/" + res['total'];
    result += "(" + ((res['correct'] / res['total'] * 100).toFixed(2)) + "%)";
    $("#p2fScore").html(result)
}

function p2fShowResult(type, result) {
    $("#p2fResult").attr("class", "text-center alert alert-" + type).text(result);
}

function p2fAddResult(success) {
    save = JSON.parse(localStorage['mjp-saves']);
    res = save['p2f'];
    res['total'] += 1;
    if(success) {
        res['correct'] += 1;
        res['continue'] += 1;
    } else {
        res['continue'] = 0;
    }

    save['p2f'] = res;
    localStorage['mjp-saves'] = JSON.stringify(save);
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
            p2fAddResult(true);
            p2fShowResult("success", "正确！");
            p2fShowScores();
            p2fNewQuestion();
        } else {
            p2fAddResult(false)
            p2fShowResult("warning", "错误！");
            p2fShowScores();
            $("#p2fInput").val("")
        }
        return false;
    }
    return true;
}
