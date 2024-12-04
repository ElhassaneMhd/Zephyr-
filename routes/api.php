<?php

Route::get('/tables', 'App\Http\Controllers\TableController@index')->middleware('auth');
