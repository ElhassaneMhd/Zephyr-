<?php

use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return redirect('/electricite/general');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
Route::inertia('/electricite/general', 'Electricite/GeneralCounter');
Route::inertia('/electricite/divisionnel', 'Electricite/DivisionalCounter');




Route::fallback(function () {
    return inertia('NotFound');
});
