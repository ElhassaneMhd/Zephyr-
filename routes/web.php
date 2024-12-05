<?php

use App\Http\Controllers\HistoricController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return redirect('/electricite/general');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';



Route::fallback(function () {
    return inertia('NotFound');
});
