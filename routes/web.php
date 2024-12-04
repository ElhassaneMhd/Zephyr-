<?php

use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return redirect('/electricite/general');
});

// Route::inertia('/electricite/general', 'Electricite/GeneralCounter');





require __DIR__ . '/auth.php';

Route::fallback(function () {
    return inertia('NotFound');
});
