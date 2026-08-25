<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q', '');

        $groups = [];
        if (! empty($query)) {
            $groups = Group::where('name', 'like', "%{$query}%")
                ->orWhere('code', 'like', "%{$query}%")
                ->withCount('users')
                ->limit(20)
                ->get();
        }

        return Inertia::render('Search/Index', [
            'q' => $query,
            'groups' => $groups,
        ]);
    }
}
