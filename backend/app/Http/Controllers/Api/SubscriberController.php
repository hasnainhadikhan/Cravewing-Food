<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    // POST /api/subscribe
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        $subscriber = Subscriber::firstOrCreate(['email' => $data['email']]);

        return response()->json(['message' => "You're on the list. Stay hungry.", 'data' => $subscriber], 201);
    }
}
