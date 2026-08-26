<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'content' => ['required', 'string', 'max:1000'],
            'parent_id' => ['nullable', 'exists:comments,id'],
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['post_id'] = $post->id;

        Comment::create($validated);

        return back()->with('success', 'Comment added.');
    }
}
