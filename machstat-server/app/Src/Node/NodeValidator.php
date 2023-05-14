<?php

namespace App\Src\Node;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class NodeValidator
{
    public function validateNode(Request $request)
    {
        return validator($request->all(), [
            'guid' => ['required', 'unique:nodes,guid'],
            'status' => ['required', Rule::in(Node::$nodeStatuses)]
        ])->after(
            fn ($validator) => $this->validateProducts($request, $validator)
        )->validate();
    }

    private function validateProducts(Request $request, Validator $validator)
    {
        
    }
}
