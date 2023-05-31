<?php

use App\Src\Node\NodeController;
use App\Src\Device\DeviceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->get('/heartbeat', function (Request $request) {
    return response()->json([]);
});

Route::middleware(['auth:sanctum'])->get('/nodes', [NodeController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/nodes/create', [NodeController::class, 'create']);
Route::middleware(['auth:sanctum'])->patch('/nodes/deleteBatch', [NodeController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/nodes/{node}', [NodeController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/nodes/{node}', [NodeController::class, 'update']);
Route::middleware(['auth:sanctum'])->post('/nodes', [NodeController::class, 'store']);

Route::middleware(['auth:sanctum'])->get('/devices', [DeviceController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/devices/create', [DeviceController::class, 'create']);
Route::middleware(['auth:sanctum'])->patch('/devices/deleteBatch', [DeviceController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/devices/{device}', [DeviceController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/devices/{device}', [DeviceController::class, 'update']);
Route::middleware(['auth:sanctum'])->post('/devices', [DeviceController::class, 'store']);
