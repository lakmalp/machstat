<?php

namespace App\Http\Controllers;

use App\Models\BaseModel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

interface IBaseController {
    public function index(Request $request):JsonResponse;
    public function create(Request $request):JsonResponse;
    public function store(Request $request):JsonResponse;
    public function edit(BaseModel $abstractModel):JsonResponse;
    public function update(Request $request):JsonResponse;
    public function delete(BaseModel $abstractModel):bool;
    public function deleteBatch(Request $request):JsonResponse;
}