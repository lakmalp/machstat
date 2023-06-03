<?php

namespace App\Src\MqttMessage;

use App\Http\Controllers\Controller;
use App\Src\Node\Node;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MqttMessageController extends Controller
{
    private $validator;

    private $repository;
    function __construct(MqttMessageValidator $validator, MqttMessageRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $per_page = $request->input('pageSize') ?? 10;

        $current_page = $request->input('pageNo') ?? 1;

        $starting_point = $per_page * ($current_page - 1);

        $total = MqttMessage::get()->count();

        $data = MqttMessage::orderBy('created_at', 'ASC')
            ->with(['node'])
            ->take($per_page)
            ->skip($starting_point)
            ->get()
            ->toArray();  

        $array= new Paginator($data, $per_page, $current_page);

        $params = collect([
            'nodes' => Node::get(), 
            'total' => $total,
            'count' => $array->count(),
            'is_last_page' => (($array->count() < $per_page) || (($current_page - 1) * $per_page) + $array->count() == $total)
        ]);

        $ret = $params->merge($array);

        return response()->json($ret);
    }

    public function create(Request $request): JsonResponse
    {
        Log::info(MqttMessage::select('node_id')->pluck('node_id'));
        $nodes = Node::whereNotIn('id', MqttMessage::select('node_id')->pluck('node_id'))->get();
        $mqttMessage = new MqttMessage;
        return response()->json(['nodes' => $nodes, 'data' => $mqttMessage]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-mqttMessage', MqttMessage::class), 403);

        $validated = $this->validator->validateCreate($request);

        $mqttMessage = $this->repository->createMqttMessage($validated);
        $mqttMessage->load(['node']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $mqttMessage]);
    }

    public function edit(MqttMessage $mqttMessage): JsonResponse
    {
        $nodes = Node::get();

        return response()->json([
            'nodes' => $nodes,
            'data' => $mqttMessage
        ]);
    }

    public function update(Request $request, MqttMessage $mqttMessage): JsonResponse
    {
        abort_if($request->user()->cannot('edit-mqttMessage', MqttMessage::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $mqttMessage = $this->repository->updateMqttMessage($mqttMessage, $validated);
        $mqttMessage->load(['node']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $mqttMessage]);
    }

    public function delete(MqttMessage $mqttMessage): bool
    {
        return $mqttMessage->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        MqttMessage::destroy($request->all());
        return response()->json([]);
    }
}
