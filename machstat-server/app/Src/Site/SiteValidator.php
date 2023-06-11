<?php

namespace App\Src\Site;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class SiteValidator
{
    public function validateCreate(Request $request)
    {
        return validator($request->all(), [
            'code' => ['required', Rule::unique('companies', 'code'), 'max:20'],
            'description' => ['required', 'max:100'],
            'company_ref' => [ 'required', 'exists:companies,id']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    public function validateUpdate(Request $request)
    {
        return validator($request->all(), [
            'code' => ['required', Rule::unique('companies', 'code')->ignore($request->id), 'max:20'],
            'description' => ['required', 'max:100'],
            'company_ref' => [ 'required', 'exists:companies,id']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    private function validateProducts(Request $request, Validator $validator)
    {
        
    }
}
