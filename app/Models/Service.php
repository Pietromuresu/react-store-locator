<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Store;

class Service extends Model
{
    use HasFactory;

    protected $fillable=[
        "name"
    ];

    public function stores(){
        return $this->hasMany(Store::class);
    }
}
