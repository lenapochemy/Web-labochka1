let x, y, r;

document.getElementById("check").onclick = function (){
    //console.log(x, y, r);
    if(valid_x() && valid_y() && valid_r()) {
        const coords = "x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&r=" + encodeURIComponent(r) +
            "timezone=" + encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone);
        fetch("php/script.php?" + coords, {
            method: "GET",
            headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
        }).then(resp => resp.text()).then(function (serverAnswer){
            document.getElementById("result_in_table").innerHTML = serverAnswer;
        }).catch(err => alert(err.status + " " + err));

    }
}

function createNot(message){
    let outputContainer = document.getElementById("result_in_table");
    if(outputContainer.contains(document.querySelector(".notification"))){
        let stub = document.querySelector(".notification");
        stub.textContent = message;
        stub.classList.replace("outputStub", "errorStub");
    } else {
        let notificationTableRow = document.createElement("h4");
        notificationTableRow.innerHTML = "<span class='notification errorStub'></span>";
        outputContainer.prepend(notificationTableRow);
        let span = document.querySelector(".notification");
        span.textContent = message;
    }
}

function valid_x(){
    x = document.querySelector("input[type=checkbox]:checked").value;
   // console.log("x=" + x);
    if(isNumeric(x)) return true;
        else {
            createNot("Значение x не выбрано")
        return false;
    }
}

function valid_y(){
    y = document.querySelector("input[name=y]").value.replace(",",".");
    //console.log("y=" + y);
    if(y === undefined){
        createNot("Значение y не введено");
        return false;
    } else if (!isNumeric(y)){
        createNot("Значение y не число");
        return false;
    } else if (y.length >= 17) {
        createNot("Слишком много символов в значении y");
        return false;
    } else if(y <= -3 || y >= 3){
        createNot("Значение y не входит в область допустимых значений (-3; 3)");
        return false;
    } else return true;
}

function valid_r(){
    try{
        r = document.querySelector("input[type=radio]:checked").value;
       // console.log("r=" + r);
        return true;
    } catch (err){
        createNot("Значение R не выбрано");
        return false;
    }
}

function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
