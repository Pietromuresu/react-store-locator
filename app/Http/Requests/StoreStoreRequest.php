<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "city" => "required|max:55",
            "address" => "required|max:255",
            "phone" => "required|max:10",
            "zip_code" => "required|numeric",
            "state" => "required|max:255",
            "hours" => "max:255",
            "coordinates" => "min:3",
            "active" => "required|boolean"
        ];
    }
}
