<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // POST /api/orders  (frontend CheckoutPage "Pay Now")
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:40'],
            'address' => ['required', 'string', 'max:255'],
            'apartment' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:40'],
            'delivery_fee' => ['nullable', 'numeric', 'min:0'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.name' => ['required', 'string', 'max:255'],
            'items.*.price' => ['required', 'numeric', 'min:0'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.image' => ['nullable', 'string'],
        ]);

        $order = DB::transaction(function () use ($data, $request) {
            $subtotal = collect($data['items'])->sum(fn ($i) => $i['price'] * $i['quantity']);
            $deliveryFee = $data['delivery_fee'] ?? 0;

            $order = Order::create([
                'reference' => 'CRAVE-' . random_int(1000, 9999),
                'user_id' => optional($request->user())->id,
                'email' => $data['email'],
                'first_name' => $data['first_name'] ?? null,
                'last_name' => $data['last_name'],
                'phone' => $data['phone'] ?? null,
                'address' => $data['address'],
                'apartment' => $data['apartment'] ?? null,
                'city' => $data['city'],
                'postal_code' => $data['postal_code'] ?? null,
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'total' => $subtotal + $deliveryFee,
                'status' => 'received',
            ]);

            foreach ($data['items'] as $item) {
                $order->items()->create([
                    'name' => $item['name'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'image' => $item['image'] ?? null,
                ]);
            }

            return $order;
        });

        return response()->json([
            'message' => 'Order placed!',
            'reference' => $order->reference,
            'data' => $order->load('items'),
        ], 201);
    }

    // GET /api/orders/{reference}  (order tracking)
    public function show(string $reference)
    {
        $order = Order::with('items')->where('reference', $reference)->firstOrFail();

        return response()->json($order);
    }
}
