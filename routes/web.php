<?php

use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return redirect('/electricite/general');
});

require __DIR__ . '/auth.php';

Route::fallback(function () {
    return inertia('NotFound');
});
