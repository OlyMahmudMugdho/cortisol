<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show($username)
    {
        $user = User::where('username', $username)->firstOrFail();

        $posts = $user->posts()->with(['user', 'group', 'userVote'])
            ->withCount(['comments'])
            ->withSum('votes', 'value')
            ->latest()
            ->paginate(15);

        return Inertia::render('Users/Show', [
            'profileUser' => $user,
            'posts' => $posts,
        ]);
    }
}
