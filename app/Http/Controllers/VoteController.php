<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function votePost(Request $request, Post $post)
    {
        $validated = $request->validate([
            'value' => ['required', 'in:1,-1'],
        ]);

        $user = $request->user();
        $existingVote = $post->votes()->where('user_id', $user->id)->first();

        if ($existingVote) {
            if ($existingVote->value == $validated['value']) {
                // If they click the same vote again, remove it (toggle off)
                $existingVote->delete();
            } else {
                // Change vote
                $existingVote->update(['value' => $validated['value']]);
            }
        } else {
            // New vote
            $post->votes()->create([
                'user_id' => $user->id,
                'value' => $validated['value'],
            ]);
        }

        return back();
    }

    public function voteComment(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'value' => ['required', 'in:1,-1'],
        ]);

        $user = $request->user();
        $existingVote = $comment->votes()->where('user_id', $user->id)->first();

        if ($existingVote) {
            if ($existingVote->value == $validated['value']) {
                $existingVote->delete();
            } else {
                $existingVote->update(['value' => $validated['value']]);
            }
        } else {
            $comment->votes()->create([
                'user_id' => $user->id,
                'value' => $validated['value'],
            ]);
        }

        return back();
    }
}
