<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $posts = Post::with(['user', 'group'])
            ->withCount(['comments', 'votes']) // If we want to show comment count and upvotes
            ->latest()
            ->paginate(15);

        return Inertia::render('Home', [
            'posts' => $posts,
        ]);
    }
}
