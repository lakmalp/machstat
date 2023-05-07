<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\BaseModel;
use Illuminate\Support\Facades\Log;

abstract class BaseController extends Controller implements IBaseController
{
    private $model;
    function __construct(BaseModel $baseModel)
    {
        $this->model = $baseModel;
    }
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'data' => $this->model::orderBy('updated_at', 'DESC')->get()
        ]);
    }
    public function create(Request $request): JsonResponse
    {
        return response()->json();
    }
    public function store(Request $request): JsonResponse
    {
        $this->model= new $this->model;
        $this->model->fill($request->all());
        $this->model->save();
        $this->model->refresh();
        return response()->json(['data' => $this->model]);
    }
    public function edit(BaseModel $abstractModel): JsonResponse
    {
        return response()->json();
    }
    public function update(Request $request): JsonResponse
    {
        return response()->json();
    }
    public function delete(BaseModel $abstractModel): bool
    {
        return $abstractModel->delete();
    }
    public function deleteBatch(Request $request): JsonResponse
    {
        $this->model->destroy($request->all());
        return response()->json([]);
    }
}
