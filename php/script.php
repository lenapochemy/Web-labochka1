<?php

    require __DIR__ . "/Validator.php";
    require __DIR__ . "/Checker.php";

    @session_start();

    if(!isset($_SESSION["results"])) {
        $_SESSION["results"] = array();
    }

    if($_SERVER["REQUEST_METHOD"] !== "GET"){
        http_response_code(405);
        return;
    }

    //date_default_timezone_set($_GET["timezone"]);

    $x = (float) $_GET["x"];
    $y = (float) $_GET["y"];
    $r = (float) $_GET["r"];

    $validator = new Validator($x, $y, $r);
    if($validator -> checkCoord()) {
        $inArea = Checker::inArea($x, $y, $r);
        $coordsStatus = $inArea
            ? "<span class='success'>Точка попала</span>"
            : "<span class='fail'>Точка не попала</span>";

        $currentTime = date('Y-m-d H:i:s');
        $benchmarkTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];

        $newResult = array(
            "x" => $x,
            "y" => $y,
            "r" => $r,
            "coordsStatus" => $coordsStatus,
            "currentTime" => $currentTime,
            "benchmarkTime" => $benchmarkTime
        );

        array_push($_SESSION["results"], $newResult);

        echo "<table id='result_in_table'>
            <tr>
                <th>x</th>
                <th>y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Текущее время</th>
                <th>Время обработки</th>
            </tr>";

        foreach (array_reverse($_SESSION["results"]) as $tableRow) {
            echo "<tr>";
            echo "<td>" . $tableRow["x"] . "</td>";
            echo "<td>" . $tableRow["y"] . "</td>";
            echo "<td>" . $tableRow["r"] . "</td>";
            echo "<td>" . $tableRow["coordsStatus"] . "</td>";
            echo "<td>" . $tableRow["currentTime"] . "</td>";
            echo "<td>" . $tableRow["benchmarkTime"] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        http_response_code(422);
        return;
    }































/*    $start_time = microtime();
    $x = $_GET['x'];
    $y = $_GET['y'];
    $r = $_GET['R'];
    $flag = true;
    $result = "";
    $response = "";
    $max = 17;


    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (!preg_match('/^-?\d+(\.|,)?\d*$/', $x) ||
            !preg_match('/^-?\d+(\.|,)?\d*$/', $y) ||
            !preg_match('/^-?\d+(\.|,)?\d*$/', $r))
            $flag = false;

        if ($x < -5 || $x > 3)
            $flag = false;
        if ($y < -3 || $y > 3)
            $flag = false;
        if ($r < 1 || $r > 5)
            $flag = false;
        if (strlen($x) > $max || strlen($y) > $max || strlen($r) > $max)
            $flag = false;


        if ((($x * $x + $y * $y) <= $r * $r && $x >= 0 && $y <= 0) ||
            (0 <= $x && $x <= $r && 0 <= $y && $y <= $r / 2) ||
            ($y >= (-$x - $r / 2) && $x <= 0 && $y <= 0)) {
            $result = "Ура! Точка попала в область";
        } else {
            $result = "Ой... Точка не попала в область";
        }

        $response .= $flag;
        $response .= ";";
        $response .= $x;
        $response .= ";";
        $response .= $y;
        $response .= ";";
        $response .= $r;
        $response .= ";";
        $response .= $result;
        $response .= ";";
        $response .= date("Y-m-d H:i:s");
        $response .= ";";
        $response .= (microtime() - $start_time);
        $response .= "/";
        echo $response;
    }
*/

