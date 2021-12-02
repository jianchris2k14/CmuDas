<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;

Route::resource('files', FileController::class);
Route::get('/files/search/{name}', [FileController::class, 'search']);

// Route::get('/files', [FileController::class, 'index']);
// Route::post('/files', [FileController::class, 'store']);
// Route::post('/files/{id}', [FileController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
