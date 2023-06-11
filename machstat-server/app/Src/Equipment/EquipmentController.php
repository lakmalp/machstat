<?php

namespace App\Src\Equipment;

use App\Http\Controllers\Controller;
use App\Src\EquipmentType\EquipmentType;
use App\Src\Node\Node;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class EquipmentController extends Controller
{
    private $validator;

    private $repository;
    function __construct(EquipmentValidator $validator, EquipmentRepository $repository)
    {
        $this->validator = $validator;
        $this->repository = $repository;
    }

    public function index(Request $request): JsonResponse
    {
        $per_page = $request->input('pageSize') ?? 10;

        $current_page = $request->input('pageNo') ?? 1;

        $starting_point = $per_page * ($current_page - 1);

        $total = Equipment::get()->count();

        $data = Equipment::orderBy('created_at', 'ASC')
            ->with(['equipmentType'])
            ->take($per_page)
            ->skip($starting_point)
            ->get()
            ->toArray();  

        $array= new Paginator($data, $per_page, $current_page);

        $params = collect([
            'equipmentTypes' => EquipmentType::get(), 
            'total' => $total,
            'count' => $array->count(),
            'is_last_page' => (($array->count() < $per_page) || (($current_page - 1) * $per_page) + $array->count() == $total)
        ]);

        $ret = $params->merge($array);

        return response()->json($ret);
    }

    public function create(Request $request): JsonResponse
    {
        $equipmentTypes = EquipmentType::get();
        $equipment = new Equipment;
        return response()->json(['equipmentTypes' => $equipmentTypes, 'data' => $equipment]);
    }

    public function store(Request $request): JsonResponse
    {
        abort_if($request->user()->cannot('create-equipment', Equipment::class), 403);

        $validated = $this->validator->validateCreate($request);

        $equipment = $this->repository->createEquipment($validated);
        $equipment->load(['equipmentType']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $equipment]);
    }

    public function edit(Equipment $equipment): JsonResponse
    {
        $nodes = EquipmentType::get();

        return response()->json([
            'equipmentTypes' => $nodes,
            'data' => $equipment
        ]);
    }

    public function update(Request $request, Equipment $equipment): JsonResponse
    {
        abort_if($request->user()->cannot('edit-equipment', Equipment::class), 403);

        $validated = $this->validator->validateUpdate($request);

        $equipment = $this->repository->updateEquipment($equipment, $validated);
        $equipment->load(['node']);

        // SendOrderToVendor::dispatch($order)->onQueue('orders');

        // NewOrderPlaced::dispatch($order);
        
        return response()->json(['data' => $equipment]);
    }

    public function delete(Equipment $equipment): bool
    {
        return $equipment->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        Equipment::destroy($request->all());
        return response()->json([]);
    }
}
