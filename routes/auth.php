
<?php
use App\Http\Controllers\CentreController;
use App\Http\Controllers\TableController;
use App\Http\Middleware\CheckSuperAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;




Route::middleware('auth')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/electricite', function () {
        return redirect('/generalCounter');
    });
    Route::get('/electricite/generalCounter', [TableController::class ,'getGenerale'])->name('generalCounter');
    Route::get('/electricite/divisionCounter', [TableController::class ,'getDivisional'])->name('divisionCounter');
    Route::post('/electricite/store', [TableController::class ,'store'])->name('store');
    Route::put('/electricite/update/{id}', [TableController::class ,'update'])->name('update');
    Route::delete('/electricite/delete/{id}', [TableController::class ,'delete'])->name('delete');
});
Route::middleware(['auth', CheckSuperAdmin::class])->group(function () {
    Route::get('/centres', [CentreController::class, 'index']);
    Route::get('/centres/create', [CentreController::class, 'create']);
    Route::post('/centres', [CentreController::class, 'store']);
    Route::get('/centres/{centre}', [CentreController::class, 'show']);
    Route::put('/centres/{centre}', [CentreController::class, 'update']);
    Route::delete('/centres/{centre}', [CentreController::class, 'destroy']);
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'formLogin'])->name('formLogin');
    Route::POST('/login', [AuthController::class, 'login'])->name('login');
});

