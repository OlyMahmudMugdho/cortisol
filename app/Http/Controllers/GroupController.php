<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GroupController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Groups/Create', [
            'groupTypes' => GroupType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:50', 'unique:groups', 'regex:/^[a-zA-Z0-9_]+$/'],
            'group_type_id' => ['required', 'exists:group_types,id'],
        ]);

        $validated['creator_id'] = $request->user()->id;

        $group = Group::create($validated);

        // Optionally, add the creator as a member/admin of the group here:
        $group->users()->attach($request->user()->id);

        return redirect()->route('groups.show', $group->code)
            ->with('success', 'Group created successfully.');
    }

    public function show(Request $request, $code)
    {
        $group = Group::where('code', $code)->firstOrFail();
        
        $isJoined = false;
        if ($request->user()) {
            $isJoined = $group->users()->where('user_id', $request->user()->id)->exists();
        }

        $posts = $group->posts()->with(['user', 'group', 'userVote'])
            ->withCount(['comments'])
            ->withSum('votes', 'value')
            ->latest()
            ->paginate(15);

        return Inertia::render('Groups/Show', [
            'group' => $group,
            'isJoined' => $isJoined,
            'posts' => $posts,
        ]);
    }

    public function toggleMembership(Request $request, Group $group)
    {
        $user = $request->user();

        if ($group->users()->where('user_id', $user->id)->exists()) {
            // Cannot leave if you are the creator (optional logic, but standard for now)
            if ($group->creator_id === $user->id) {
                return back()->with('error', 'You cannot leave a community you created.');
            }
            $group->users()->detach($user->id);
            return back()->with('success', 'You have left the community.');
        } else {
            $group->users()->attach($user->id);
            return back()->with('success', 'You have joined the community.');
        }
    }
}
