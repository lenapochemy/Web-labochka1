//let input = document.getElementById("y");
let flag = true;
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

    const response = await fetch("checking.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        //body: JSON.stringify({x, y, r})
    });

    const json = await response.json();

    var data = [x, y, r,json.result,  json.now() ];
    addToTable(data);


};


function addToTable(rowData) {
    var row = table.insertRow(0);
    rowData.forEach(cellData => {
        var cell = row.insertCell();
        cell.innerHTML = cellData;
    })
    var lastData = session.getItem("result");
    session.getItem("result", rowData.toString() + (lastData ? ";" + lastData : ""));


}


function valid_x(){
    if (document.getElementById("x-5").checked)
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
}

function valid_y(){
    y = document.getElementById("y").value;
    if (y.length > 17 || isNaN(parseFloat(y)) || !isFinite(y) || y < -3 || y > 3) {
        y = null;
        return false;
    }
        else return true;
}

function valid_r(){
    if (document.getElementById("r1").checked)
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
}




















