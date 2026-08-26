<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with(['user', 'group', 'userVote'])
            ->withCount(['comments'])
            ->withSum('votes', 'value')
            ->latest()
            ->paginate(15);

        return Inertia::render('Home', [
            'posts' => $posts,
        ]);
    }
}
