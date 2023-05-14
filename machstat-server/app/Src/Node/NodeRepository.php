<?php

namespace App\Src\Node;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class NodeRepository
{
    public function createNode(Request $request, array $validated)
    {
        return DB::transaction(function () use ($validated, $request) {
            $node = new Node;
            $node->fill($validated);
            $node->save();
            $node->refresh();

            return $node;
        });
    }
}
