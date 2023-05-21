<?php

namespace App\Src\Node;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NodeRepository
{
    public function createNode(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $node = new Node;
            $node->fill($validated);
            $node->save();
            $node->refresh();

            return $node;
        });
    }

    public function updateNode(Node $node, array $validated)
    {
        return DB::transaction(function () use ($validated, $node) {
            $node->fill($validated);
            $node->save();
            $node->refresh();

            return $node;
        });
    }
}
