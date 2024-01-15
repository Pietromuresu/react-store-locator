<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable=[
        "city",
        "address",
        "zip_code",
        "state",
        "long",
        "lat",
        "hours",
        "phone",
        "active"
    ];
}
