<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::middleware('auth')->group(function () {
    Route::get('/groups/create', [GroupController::class, 'create'])->name('groups.create');
    Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');
    Route::post('/groups/{group}/membership', [GroupController::class, 'toggleMembership'])->name('groups.membership');

    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');

    Route::post('/posts/{post}/vote', [VoteController::class, 'votePost'])->name('posts.vote');
    Route::post('/comments/{comment}/vote', [VoteController::class, 'voteComment'])->name('comments.vote');

    Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
});

Route::get('/g/{code}', [GroupController::class, 'show'])->name('groups.show');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
Route::get('/u/{username}', [UserController::class, 'show'])->name('users.show');
