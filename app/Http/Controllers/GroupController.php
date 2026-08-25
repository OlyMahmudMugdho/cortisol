<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Group;
use App\Models\GroupType;
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

        $group = Group::create($validated);

        // Optionally, add the creator as a member/admin of the group here:
        $group->users()->attach($request->user()->id);

        return redirect()->route('groups.show', $group->code)
            ->with('success', 'Group created successfully.');
    }

    public function show($code)
    {
        $group = Group::where('code', $code)->firstOrFail();
        
        // We will build the Groups/Show component later. 
        // For now, let's just return a placeholder or pass it to Inertia.
        return Inertia::render('Groups/Show', [
            'group' => $group,
        ]);
    }
}
