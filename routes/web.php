<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/electricite/general');
});

Route::inertia('/electricite/general', 'Electricite/GeneralCounter');
Route::inertia('/electricite/divisionnel', 'Electricite/DivisionalCounter');




Route::fallback(function () {
    return inertia('NotFound');
});
