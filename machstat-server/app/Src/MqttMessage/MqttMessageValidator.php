<?php

namespace App\Src\MqttMessage;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class MqttMessageValidator
{
    public function validateCreate(Request $request)
    {
        return validator($request->all(), [
            'guid' => ['required', 'max:20'],
            'body' => ['required', 'exists:nodes,id'],
            'received_at' => ['required', 'timestamp'],
            'processed' => ['required', 'boolean']
        ])->after(
            fn ($validator) => $this->validateNext($request, $validator)
        )->validate();
    }

    public function validateUpdate(Request $request)
    {
        return validator($request->all(), [
            'guid' => ['required', 'max:20'],
            'body' => ['required', 'exists:nodes,id'],
            'received_at' => ['required', 'timestamp'],
            'processed' => ['required', 'boolean']
        ])->after(
            fn ($validator) => $this->validateNext($request, $validator)
        )->validate();
    }

    private function validateNext(Request $request, Validator $validator)
    {
        
    }
}
