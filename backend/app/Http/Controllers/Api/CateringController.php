<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CateringRequest;
use Illuminate\Http\Request;

class CateringController extends Controller
{
    // POST /api/catering
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:40'],
            'event_date' => ['required', 'date'],
            'guests' => ['required', 'integer', 'min:1'],
            'package' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $catering = CateringRequest::create($data);

        return response()->json(['message' => "Request sent! We'll reach out within 24 hours.", 'data' => $catering], 201);
    }
}
