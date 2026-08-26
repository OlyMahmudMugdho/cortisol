<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Settings/Edit', [
            'user' => $request->user(),
        ]);
    }
}
