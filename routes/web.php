<?php

use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return inertia('NotFound');
});

Route::get('/', function () {
    return redirect('/login');
});



require __DIR__ . '/auth.php';
