<?php

namespace App\Src\EquipmentType;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class EquipmentTypeController extends Controller
{
    private $validator;

    private $repository;
    function __construct(EquipmentTypeValidator $validator, EquipmentTypeRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $per_page = $request->input('pageSize') ?? 10;

        $current_page = $request->input('pageNo') ?? 1;

        $starting_point = $per_page * ($current_page - 1);

        $total = EquipmentType::get()->count();

        $data = EquipmentType::orderBy('created_at', 'ASC')
            ->take($per_page)
            ->skip($starting_point)
            ->get()
            ->toArray();  

        $array= new Paginator($data, $per_page, $current_page);

        $params = collect([
            'total' => $total,
            'count' => $array->count(),
            'is_last_page' => (($array->count() < $per_page) || (($current_page - 1) * $per_page) + $array->count() == $total)
        ]);

        $ret = $params->merge($array);

        return response()->json($ret);
    }

    public function create(Request $request): JsonResponse
    {
        $guid = str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT) . "-" .
            str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT) . "-" .
            str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT) . "-" .
            str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT);

        $equipmentType = new EquipmentType;
        return response()->json(['data' => $equipmentType]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-equipmentType', EquipmentType::class), 403);

        $validated = $this->validator->validateCreate($request);

        $equipmentType = $this->repository->createEquipmentType($validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $equipmentType]);
    }

    public function edit(EquipmentType $equipmentType): JsonResponse
    {
        return response()->json([
            'data' => $equipmentType
        ]);
    }

    public function update(Request $request, EquipmentType $equipmentType): JsonResponse
    {
        abort_if($request->user()->cannot('edit-equipmentType', EquipmentType::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $equipmentType = $this->repository->updateEquipmentType($equipmentType, $validated);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $equipmentType]);
    }

    public function delete(EquipmentType $equipmentType): bool
    {
        return $equipmentType->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        EquipmentType::destroy($request->all());
        return response()->json([]);
    }
}
