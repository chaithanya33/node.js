<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/hello', [ApiController::class, 'hello']);
Route::get('/users', [ApiController::class, 'users']);
Route::get('/health', [ApiController::class, 'health']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
