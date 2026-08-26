<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $feed = $request->query('feed', 'home');
        $user = $request->user();

        if (! $user) {
            $feed = 'all';
        }

        $query = Post::with(['user', 'group', 'userVote'])
            ->withCount(['comments'])
            ->withSum('votes', 'value');

        if ($feed === 'home' && $user) {
            $query->whereHas('group.users', function ($q) use ($user) {
                $q->where('users.id', $user->id);
            });
        }

        $posts = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Home', [
            'posts' => $posts,
            'currentFeed' => $feed,
        ]);
    }
}
