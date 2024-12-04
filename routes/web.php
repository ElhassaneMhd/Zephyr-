<?php

use Illuminate\Support\Facades\Route;


require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';



Route::fallback(function () {
    return inertia('NotFound');
});
