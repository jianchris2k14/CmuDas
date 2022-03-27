<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\FileLocationController;
use Illuminate\Routing\Router;

// Public Routes
// Route::resource('files', FileController::class);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

Route::get('/files', [FileController::class, 'index']);
Route::get('/files/{id}', [FileController::class, 'show']);
Route::post('/files/search', [FileController::class, 'search']);

Route::get('/requests', [RequestController::class, 'index']);
Route::get('/requests/{id}', [RequestController::class, 'show']);
Route::post('/requests/search', [RequestController::class, 'search']);

Route::get('/requestreportsdaily', [RequestController::class, 'requestReportsDaily']);
Route::get('/requestreportsweekly', [RequestController::class, 'requestReportsWeekly']);
Route::get('/requestreportsmonthly', [RequestController::class, 'requestReportsMonthly']);


Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users/search', [UserController::class, 'search']);

Route::get('/filelocations', [FileLocationController::class, 'index']);
Route::get('/filelocations/{id}', [FileLocationController::class, 'show']);
Route::post('/filelocations/search', [FileLocationController::class, 'search']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', [AuthController::class,'user']);
    Route::post('/files', [FileController::class, 'store']);
    Route::put('/files/{id}', [FileController::class, 'update']);
    Route::delete('/files/{id}', [FileController::class, 'destroy']);
    Route::post('/destroyfilerecords', [FileController::class, 'destroyRecords']);

    Route::post('/requests', [RequestController::class, 'store']);
    Route::put('/requests/{id}', [RequestController::class, 'update']);
    Route::delete('/requests/{id}', [RequestController::class, 'destroy']);
    Route::post('/destroyrecords', [RequestController::class, 'destroyRecords']);

    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::post('/filelocations', [FileLocationController::class, 'store']);
    Route::put('/filelocations/{id}', [FileLocationController::class, 'update']);
    Route::delete('/filelocations/{id}', [FileLocationController::class, 'destroy']);
    Route::post('/destroyfilelocationrecords', [FileLocationController::class, 'destroyRecords']);

    Route::post('/logout', [AuthController::class, 'logout']);
    
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
