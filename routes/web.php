<?php

use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return inertia('NotFound');
});

Route::get('/', function () {
    return redirect('/electricite/general');
});

Route::inertia('/electricite/general', 'Electricite/GeneralCounter');




Route::fallback(function () {
    return inertia('NotFound');
});



require __DIR__ . '/auth.php';
