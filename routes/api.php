<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;

// Public Routes
// Route::resource('files', FileController::class);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/files', [FileController::class, 'index']);
Route::post('/files/{id}', [FileController::class, 'show']);
Route::get('/files/search/{name}', [FileController::class, 'search']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/files', [FileController::class, 'store']);
    Route::put('/files/{id}', [FileController::class, 'update']);
    Route::delete('/files/{id}', [FileController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
