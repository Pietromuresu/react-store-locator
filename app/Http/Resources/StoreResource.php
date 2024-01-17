<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'city' => $this->city,
            'address' => $this->address,
            'zip_code' => $this->zip_code,
            'state' => $this->state,
            'phone' => $this->phone,
            'active' => $this->active,

        ];
    }
}
