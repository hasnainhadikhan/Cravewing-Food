<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Checkout orders (frontend: CheckoutPage.tsx + CartContext)
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();       // e.g. BLAZIN-1234
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('email');
            $table->string('first_name')->nullable();
            $table->string('last_name');
            $table->string('phone')->nullable();
            $table->string('address');
            $table->string('apartment')->nullable();
            $table->string('city');
            $table->string('postal_code')->nullable();
            $table->decimal('subtotal', 8, 2)->default(0);
            $table->decimal('delivery_fee', 8, 2)->default(0);
            $table->decimal('total', 8, 2)->default(0);
            $table->string('status')->default('received'); // received, preparing, on_the_way, delivered
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
