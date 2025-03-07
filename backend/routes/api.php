<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "hello world";
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/posts', [PostController::class, 'index']);
Route::get('/my-posts', [PostController::class, 'index'])->middleware('auth:sanctum');
Route::post('/posts', [PostController::class, 'store'])->middleware('auth:sanctum');
Route::get('/posts/{post:slug}', [PostController::class, 'show']);
Route::put('/posts/{post:slug}', [PostController::class, 'update'])->middleware('auth:sanctum');
Route::post('/posts/{post:slug}/images', [PostController::class, 'uploadImage'])->middleware('auth:sanctum');
