<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('homepage/landing');
});

Route::get('/login', function () {
    return view('system/login');
});

Route::get('/dashboard', function () {
    return view('system/dashboard');
});