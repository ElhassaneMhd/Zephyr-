
<?php
use App\Http\Controllers\CentreController;
use App\Http\Controllers\HistoricController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckSuperAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'formLogin'])->name('formLogin');
    Route::POST('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/electricite', function () {
        return redirect('/electricite/general');
    });
    Route::get('/electricite/general', [TableController::class ,'getGenerale'])->name('general');
    Route::get('/electricite/divisional', [TableController::class ,'getDivisional'])->name('divisional');
    Route::post('/electricite/store', [TableController::class ,'store'])->name('row.store');
    Route::put('/electricite/update/{id}', [TableController::class ,'update'])->name(' row.update');
    Route::delete('/electricite/delete/{id}', [TableController::class ,'destroy'])->name('row.destroy');

    Route::get('/row/{id}/historic', [HistoricController::class ,'index'])->name('historic');
    Route::delete('/row/{id}/historic/delete', [HistoricController::class ,'destroy'])->name('historic.destroy');

    Route::get('/eau', [TableController::class ,'notFound'])->name('eau');
    Route::get('/carburan', [TableController::class ,'notFound'])->name('carburan');
    Route::get('/gaz', [TableController::class ,'notFound'])->name('gaz');
    Route::get('/biomasse', [TableController::class ,'notFound'])->name('biomasse');

});
Route::middleware(['auth', CheckSuperAdmin::class])->group(function () {
     Route::get('/settings', function () {
        return redirect('/settings/users');
    });
    Route::get('/settings/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/settings/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/settings/users/{id}/update', [UserController::class, 'update'])->name('users.update');
    Route::delete('/settings/users/{id}/delete', [UserController::class, 'destroy'])->name('users.destroy');



    Route::get('/centres', [CentreController::class, 'index'])->name('centres.index');
    Route::post('/centres', [CentreController::class, 'store'])->name('centres.store');
    Route::put('/centres/{centre}', [CentreController::class, 'update'])->name('centres.update');
    Route::delete('/centres/{centre}', [CentreController::class, 'destroy'])->name('centres.destroy');
    Route::post('/centres/{id}/access', [CentreController::class, 'getAccess'])->name('centres.access');

});


