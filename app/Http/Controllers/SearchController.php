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
            $searchTerm = '%'.strtolower($query).'%';
            $groups = Group::whereRaw('lower(name) like ?', [$searchTerm])
                ->orWhereRaw('lower(code) like ?', [$searchTerm])
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
