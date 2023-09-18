//let input = document.getElementById("y");
/*let flag = true;
let x = null;
let y = null;
let r = null;
let table = null;
let session = window.sessionStorage;


document.getElementById("check").onclick = async function () {
    // alert("aaa");
    console.log(x, y, r);
    table = document.getElementById("result_in_table");

    if (!valid_x() || !valid_y() || !valid_r()) alert("неверный ввод");
    console.log(x, y, r);

    const coords = "x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&r=" + encodeURIComponent(r) +
        "timezone=" + encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone);

    fetch("checking.php?" + coords, {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
    }).then(resp => resp.text()).then(function (serverAnswer){
        document.getElementById("result_in_table").innerHTML = serverAnswer;
    }).catch(err => alert(err.status + " " + err));


 */


    /*const response = await fetch("script.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({x, y, r})
    });


    const json = await response.json();

    var data = [x, y, r,json.result,  json.now() ];
    addToTable(data);
};
     */



let x, y, r;

window.onload = function () {
    function setOnClick(element) {
        element.onclick = function () {
            x = this.value;
            console.log("xx=" + x);
            buttons.forEach(function (element) {
                element.style.boxShadow = "";
                element.style.transform = "";
            });
        }
    }

    let buttons = document.querySelector("input[name=R]");
    buttons.forEach(setOnClick);
};

document.getElementById("check").onclick = function (){
    console.log(x, y, r);
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

/*function addToTable(rowData) {
    var row = table.insertRow(0);
    rowData.forEach(cellData => {
        var cell = row.insertCell();
        cell.innerHTML = cellData;
    })
    var lastData = session.getItem("result");
    session.getItem("result", rowData.toString() + (lastData ? ";" + lastData : ""));


}

 */


function valid_x(){
    x = document.querySelector("input[type=checkbox]:checked").value;

    console.log("x=" + x);
    if(isNumeric(x)) return true;
        else {
            createNot("Значение x не выбрано")
        return false;
    }

    /*if (document.getElementById("x-5").checked)
        x = document.getElementById("x-5").value;
    if (document.getElementById("x-4").checked)
        x = document.getElementById("x-4").value;
    if (document.getElementById("x-3").checked)
        x = document.getElementById("x-3").value;
    if (document.getElementById("x-2").checked)
        x = document.getElementById("x-2").value;
    if (document.getElementById("x-1").checked)
        x = document.getElementById("x-1").value;
    if (document.getElementById("x0").checked)
        x = document.getElementById("x0").value;
    if (document.getElementById("x1").checked)
        x = document.getElementById("x1").value;
    if (document.getElementById("x2").checked)
        x = document.getElementById("x2").value;
    if (document.getElementById("x3").checked)
        x = document.getElementById("x3").value;

    if (x < -5 || x > 3) {
        x = null;
        return false;
    }
        else return true;

     */
}

function valid_y(){
    y = document.querySelector("input[name=y]").value.replace(",",".");
    console.log("y=" + y);
    if(y === undefined){
        createNot("y не введен");
        return false;
    } else if (!isNumeric(y)){
        createNot("y не число");
        return false;
    } else if(y <= -3 || y >= 3){
        createNot("y не входит в область допустимых значений");
        return false;
    } else return true;

    /*y = document.getElementById("y").value;
    if (y.length > 17 || isNaN(parseFloat(y)) || !isFinite(y) || y < -3 || y > 3) {
        y = null;
        return false;
    }
        else return true;

     */
}




function valid_r(){

    try{
        r = document.querySelector("input[type=radio]:checked").value;
        console.log("r=" + r);
        return true;
    } catch (err){
        createNot("Значение R не выбрано");
        return false;
    }

   /* if (document.getElementById("r1").checked)
        r = document.getElementById("r1").value;
    if (document.getElementById("r2").checked)
        r = document.getElementById("r2").value;
    if (document.getElementById("r3").checked)
        r = document.getElementById("r3").value;
    if (document.getElementById("r4").checked)
        r = document.getElementById("r4").value;
    if (document.getElementById("r5").checked)
        r = document.getElementById("r5").value;

    if (r < 1 || r > 5) {
        r = null;
        return false;
    }
        else return true;

    */
}




function isNumeric(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}




















