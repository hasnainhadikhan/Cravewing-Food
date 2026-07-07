<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CateringRequest extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'event_date', 'guests', 'package', 'notes', 'status'];
}
