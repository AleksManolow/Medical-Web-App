<?php

session_start();

spl_autoload_register(function($className) {

    $classDirs = [
        './classes/',
    ];

    foreach ($classDirs as $dir) {
        if (file_exists($dir . $className . '.php')) {
            require_once $dir . $className . '.php';
            return;
        }
    }

    require_once "./classes/" . $className . '.php';
});

set_exception_handler(function($exception) {

    if ($exception instanceof ValidationException) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $exception->getMessage()
        ]);
        return;
    }

    http_response_code(500);
    echo json_encode([
        'error' => 'An unexpected error occurred'
    ]);

});