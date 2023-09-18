<?php

class Checker{
    public static function inArea($x, $y, $r){
        return  (($x * $x + $y * $y) <= $r * $r && $x >= 0 && $y <= 0) ||
            (0 <= $x && $x <= $r && 0 <= $y && $y <= $r / 2) ||
            ($y >= (-$x - $r / 2) && $x <= 0 && $y <= 0);
    }
}
