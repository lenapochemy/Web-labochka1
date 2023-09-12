<?php
    $start_time = microtime();
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
        $response .= microtime() - $start_time;
        $response .= "/";
        echo $response;
    }
