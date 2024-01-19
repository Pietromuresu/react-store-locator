<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Employee;
use App\Models\Service;

class Store extends Model
{
    use HasFactory;

    protected $fillable=[
        "city",
        "address",
        "zip_code",
        "state",
        "hours",
        "coordinates",
        "phone",
        "active"
    ];

    public function employee(){
        return $this->belongsTo(Employee::class);
    }
    public function services(){
        return $this->hasMany(Service::class);
    }
}
