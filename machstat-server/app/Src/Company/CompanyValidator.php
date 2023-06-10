<?php

namespace App\Src\Company;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class CompanyValidator
{
    public function validateCreate(Request $request)
    {
        return validator($request->all(), [
            'code' => ['required', Rule::unique('companies', 'code'), 'max:20'],
            'description' => ['required', 'max:100']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    public function validateUpdate(Request $request)
    {
        return validator($request->all(), [
            'code' => ['required', Rule::unique('companies', 'code')->ignore($request->id), 'max:20'],
            'description' => ['required', 'max:100']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    private function validateProducts(Request $request, Validator $validator)
    {
        
    }
}
