<?php
spl_autoload_register(function($className) {

    $classDirs = [
        '../models/',
    ];

    foreach ($classDirs as $dir) {
        if (file_exists($dir . $className . '.php')) {
            require_once $dir . $className . '.php';
            return;
        }
    }

    require_once "./models/" . $className . '.php';
});