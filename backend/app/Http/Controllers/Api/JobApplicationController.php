<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    // POST /api/careers/apply
    public function store(Request $request)
    {
        $data = $request->validate([
            'role' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:40'],
            'why' => ['nullable', 'string'],
        ]);

        $application = JobApplication::create($data);

        return response()->json(['message' => 'Application received!', 'data' => $application], 201);
    }
}
