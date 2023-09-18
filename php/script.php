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

    date_default_timezone_set('Europe/Moscow');

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

        echo "<table id='result_in_table' border='1'>
            <caption>Результаты:</caption>
            <thead>
                <th>x</th>
                <th>y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Текущее время</th>
                <th>Время обработки</th>
            </thead>";

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
