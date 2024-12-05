
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
    Route::get('/electricite/divisional', [TableController::class ,'getDivisional'])->name('division');
    Route::post('/electricite/store', [TableController::class ,'store'])->name('row.store');
    Route::put('/electricite/update/{id}', [TableController::class ,'update'])->name(' row.update');
    Route::delete('/electricite/delete/{id}', [TableController::class ,'delete'])->name('row.delete');

    Route::get('/row/{id}/historic', [HistoricController::class ,'index'])->name('historic');
    Route::delete('/row/{id}/historic/delete', [HistoricController::class ,'destroy'])->name('deleteHistoric');
});
Route::middleware(['auth', CheckSuperAdmin::class])->group(function () {
    Route::get('/centres', [CentreController::class, 'index']);
    Route::get('/settings/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/settings/users/create', [UserController::class, 'create']);
    Route::post('/settings/users', [UserController::class, 'store'])->name('users.store');


    Route::post('/centres/{id}/access', [CentreController::class, 'getAccess']);

    Route::post('/centres', [CentreController::class, 'store']);
    Route::put('/centres/{centre}', [CentreController::class, 'update']);
    Route::delete('/centres/{centre}', [CentreController::class, 'destroy']);

    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);
});


