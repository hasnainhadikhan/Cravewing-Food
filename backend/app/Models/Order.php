<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'reference', 'user_id', 'email', 'first_name', 'last_name', 'phone',
        'address', 'apartment', 'city', 'postal_code',
        'subtotal', 'delivery_fee', 'total', 'status',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
