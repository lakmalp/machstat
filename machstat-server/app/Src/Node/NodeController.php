<?php

namespace App\Src\Node;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use App\Models\BaseModel;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class NodeController extends BaseController {
    function __construct(Node $node) {
        parent::__construct($node);
    }
    private $nodeStatuses = ['NotConfigurred', 'Offline', 'Online', 'Suspended'];

    public function index(Request $request):JsonResponse {
        $data = json_decode(parent::index($request)->getContent())->data;

        return response() ->json([
            'statuses' => $this->nodeStatuses, 
            'data' => $data
        ]);
    }

    public function create(Request $request):JsonResponse {
        $guid = str_pad(rand(0, 9999),4, "0", STR_PAD_LEFT) . "-" . 
            str_pad(rand(0, 9999),4, "0", STR_PAD_LEFT) . "-" . 
            str_pad(rand(0, 9999),4, "0", STR_PAD_LEFT) . "-" . 
            str_pad(rand(0, 9999),4, "0", STR_PAD_LEFT);

        $node = new Node;
        $node->guid = $guid;
        $node->status = 'NotConfigurred';
        return response()->json(['statuses' => $this->nodeStatuses, 'data' => $node]);
    }

    public function edit(BaseModel $node):JsonResponse {
        return response() ->json([
            'statuses' => $this->nodeStatuses, 
            'data' => $node
        ]);
    }

    public function update(Request $request):JsonResponse {
        return new JsonResponse;
    }
}