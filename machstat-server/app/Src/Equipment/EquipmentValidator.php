<?php

namespace App\Src\Equipment;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class EquipmentValidator
{
    public function validateCreate(Request $request)
    {
        return validator($request->all(), [
            'code' => [ 'required', 'max:20', Rule::unique('equipment', 'code') ],
            'description' => [ 'required', 'max:100' ],
            'equipment_type_id' => [ 'required', 'exists:equipment_types,id']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    public function validateUpdate(Request $request)
    {
        return validator($request->all(), [
            'code' => [ 'required', 'max:20', Rule::unique('equipment', 'code')->ignore($request->id) ],
            'description' => [ 'required', 'max:100' ],
            'equipment_type_id' => [ 'required', 'exists:equipment_types,id']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    private function validateProducts(Request $request, Validator $validator)
    {
    }
}
