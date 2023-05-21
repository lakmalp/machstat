<?php

namespace App\Src\Node;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class NodeController extends Controller
{
    private $validator;

    private $repository;
    function __construct(NodeValidator $validator, NodeRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $data = Node::orderBy('updated_at', 'DESC')->get();

        return response()->json([
            'statuses' => Node::$nodeStatuses,
            'data' => $data
        ]);
    }

    public function create(Request $request): JsonResponse
    {
        $guid = str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT) . "-" .
            str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT) . "-" .
            str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT) . "-" .
            str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT);

        $node = new Node;
        $node->guid = $guid;
        $node->status = 'NotConfigurred';
        return response()->json(['statuses' => Node::$nodeStatuses, 'data' => $node]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-node', Node::class), 403);

        $validated = $this->validator->validateCreate($request);

        $node = $this->repository->createNode($validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $node]);
    }

    public function edit(Node $node): JsonResponse
    {
        return response()->json([
            'statuses' => Node::$nodeStatuses,
            'data' => $node
        ]);
    }

    public function update(Request $request, Node $node): JsonResponse
    {
        abort_if($request->user()->cannot('edit-node', Node::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $node = $this->repository->updateNode($node, $validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $node]);
    }

    public function delete(Node $node): bool
    {
        return $node->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        Node::destroy($request->all());
        return response()->json([]);
    }
}
