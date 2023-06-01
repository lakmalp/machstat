<?php

namespace App\Src\Device;

use App\Http\Controllers\Controller;
use App\Src\Node\Node;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DeviceController extends Controller
{
    private $validator;

    private $repository;
    function __construct(DeviceValidator $validator, DeviceRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $per_page = $request->input('pageSize') ?? 10;

        $current_page = $request->input('pageNo') ?? 1;

        $starting_point = $per_page * ($current_page - 1);

        $total = Device::get()->count();

        $data = Device::orderBy('created_at', 'ASC')
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
        Log::info(Device::select('node_id')->pluck('node_id'));
        $nodes = Node::whereNotIn('id', Device::select('node_id')->pluck('node_id'))->get();
        $device = new Device;
        return response()->json(['nodes' => $nodes, 'data' => $device]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-device', Device::class), 403);

        $validated = $this->validator->validateCreate($request);

        $device = $this->repository->createDevice($validated);
        $device->load(['node']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $device]);
    }

    public function edit(Device $device): JsonResponse
    {
        $nodes = Node::get();

        return response()->json([
            'nodes' => $nodes,
            'data' => $device
        ]);
    }

    public function update(Request $request, Device $device): JsonResponse
    {
        abort_if($request->user()->cannot('edit-device', Device::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $device = $this->repository->updateDevice($device, $validated);
        $device->load(['node']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $device]);
    }

    public function delete(Device $device): bool
    {
        return $device->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        Device::destroy($request->all());
        return response()->json([]);
    }
}
