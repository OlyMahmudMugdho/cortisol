<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create(Request $request)
    {
        $groups = $request->user()->groups()->select('groups.id', 'groups.name', 'groups.code')->get();

        return Inertia::render('Posts/Create', [
            'groups' => $groups,
            'defaultGroup' => $request->query('group_id', ''),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'group_id' => ['required', 'exists:groups,id'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
        ]);

        if (! $request->user()->groups()->where('groups.id', $validated['group_id'])->exists()) {
            return back()->withErrors(['group_id' => 'You must join this community to post.']);
        }

        $validated['user_id'] = $request->user()->id;

        $post = Post::create($validated);

        return redirect()->route('posts.show', $post->id)
            ->with('success', 'Post created successfully.');
    }

    public function show($id)
    {
        $post = Post::with(['user', 'group', 'userVote', 'comments' => function ($q) {
            $q->with(['user', 'userVote'])->withSum('votes', 'value')->latest();
        }])
            ->withCount(['comments'])
            ->withSum('votes', 'value')
            ->findOrFail($id);

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }
}
