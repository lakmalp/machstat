<?php

namespace App\Src\Node;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class NodeValidator
{
    public function validateCreate(Request $request)
    {
        return validator($request->all(), [
            'guid' => ['required', Rule::unique('nodes', 'guid'), 'max:20'],
            'status' => ['required', Rule::in(Node::$nodeStatuses)]
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    public function validateUpdate(Request $request)
    {
        return validator($request->all(), [
            'guid' => ['required', Rule::unique('nodes', 'guid')->ignore($request->id), 'max:20'],
            'status' => ['required', Rule::in(Node::$nodeStatuses)]
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    private function validateProducts(Request $request, Validator $validator)
    {
        
    }
}
