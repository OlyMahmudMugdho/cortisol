<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q', '');

        $groups = [];
        $users = [];
        $posts = [];

        if (! empty($query)) {
            $searchTerm = '%'.strtolower($query).'%';

            $groups = Group::whereRaw('lower(name) like ?', [$searchTerm])
                ->orWhereRaw('lower(code) like ?', [$searchTerm])
                ->withCount('users')
                ->limit(20)
                ->get();

            $users = User::whereRaw('lower(name) like ?', [$searchTerm])
                ->orWhereRaw('lower(username) like ?', [$searchTerm])
                ->limit(20)
                ->get();

            $posts = Post::whereRaw('lower(title) like ?', [$searchTerm])
                ->orWhereRaw('lower(content) like ?', [$searchTerm])
                ->with(['user', 'group', 'userVote'])
                ->withCount(['comments'])
                ->withSum('votes', 'value')
                ->limit(20)
                ->get();
        }

        return Inertia::render('Search/Index', [
            'q' => $query,
            'groups' => $groups,
            'users' => $users,
            'posts' => $posts,
        ]);
    }
}
