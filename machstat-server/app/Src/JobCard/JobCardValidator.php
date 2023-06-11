<?php

namespace App\Src\JobCard;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class JobCardValidator
{
    public function validateCreate(Request $request)
    {
        return validator($request->all(), [
            'description' => ['required', 'max:200'],
            'schedule_date' => ['required'],
            'site_ref' => ['numeric', 'required', 'exists:sites,id'],
            'time_taken' => ['numeric',],
            'status' => ['max:50'],
            'notes' => ['max:400'],
            'owner_user_ref' => ['numeric', 'nullable', 'exists:users,id'],
            'authorizer_user_ref' => ['numeric', 'nullable', 'exists:users,id'],
            'is_manual' => ['required']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    public function validateUpdate(Request $request)
    {
        return validator($request->all(), [
            'description' => ['required', 'max:200'],
            'schedule_date' => ['required'],
            'site_ref' => ['numeric', 'required', 'exists:sites,id'],
            'time_taken' => ['numeric',],
            'status' => ['max:50'],
            'notes' => ['max:400'],
            'owner_user_ref' => ['numeric', 'nullable', 'exists:users,id'],
            'authorizer_user_ref' => ['numeric', 'nullable', 'exists:users,id'],
            'is_manual' => ['required']
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    private function validateProducts(Request $request, Validator $validator)
    {
    }
}
