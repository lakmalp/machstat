<?php

namespace App\Src\Device;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class DeviceValidator
{
    public function validateCreate(Request $request)
    {
        return validator($request->all(), [
            'name' => ['required', 'max:100'],
            'node_id' => ['required', 'exists:nodes,id']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    public function validateUpdate(Request $request)
    {
        return validator($request->all(), [
            'name' => ['required', 'max:100'],
            'node_id' => ['required', 'exists:nodes,id']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    private function validateProducts(Request $request, Validator $validator)
    {
        
    }
}
