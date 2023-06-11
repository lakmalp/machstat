<?php

use App\Src\Company\CompanyController;
use App\Src\Node\NodeController;
use App\Src\Device\DeviceController;
use App\Src\Equipment\EquipmentController;
use App\Src\EquipmentType\EquipmentTypeController;
use App\Src\MqttMessage\MqttMessageController;
use App\Src\Site\SiteController;
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

Route::middleware(['auth:sanctum'])->get('/companies', [CompanyController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/companies/create', [CompanyController::class, 'create']);
Route::middleware(['auth:sanctum'])->post('/companies', [CompanyController::class, 'store']);
Route::middleware(['auth:sanctum'])->delete('/companies/deleteBatch', [CompanyController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/companies/{company}', [CompanyController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/companies/{company}', [CompanyController::class, 'update']);

Route::middleware(['auth:sanctum'])->get('/sites', [SiteController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/sites/create', [SiteController::class, 'create']);
Route::middleware(['auth:sanctum'])->post('/sites', [SiteController::class, 'store']);
Route::middleware(['auth:sanctum'])->delete('/sites/deleteBatch', [SiteController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/sites/{site}', [SiteController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/sites/{site}', [SiteController::class, 'update']);

Route::middleware(['auth:sanctum'])->get('/nodes', [NodeController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/nodes/create', [NodeController::class, 'create']);
Route::middleware(['auth:sanctum'])->post('/nodes', [NodeController::class, 'store']);
Route::middleware(['auth:sanctum'])->delete('/nodes/deleteBatch', [NodeController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/nodes/{node}', [NodeController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/nodes/{node}', [NodeController::class, 'update']);

Route::middleware(['auth:sanctum'])->get('/devices', [DeviceController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/devices/create', [DeviceController::class, 'create']);
Route::middleware(['auth:sanctum'])->post('/devices', [DeviceController::class, 'store']);
Route::middleware(['auth:sanctum'])->delete('/devices/deleteBatch', [DeviceController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/devices/{device}', [DeviceController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/devices/{device}', [DeviceController::class, 'update']);

Route::middleware(['auth:sanctum'])->get('/equipmentTypes', [EquipmentTypeController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/equipmentTypes/create', [EquipmentTypeController::class, 'create']);
Route::middleware(['auth:sanctum'])->post('/equipmentTypes', [EquipmentTypeController::class, 'store']);
Route::middleware(['auth:sanctum'])->delete('/equipmentTypes/deleteBatch', [EquipmentTypeController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/equipmentTypes/{equipmentType}', [EquipmentTypeController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/equipmentTypes/{equipmentType}', [EquipmentTypeController::class, 'update']);

Route::middleware(['auth:sanctum'])->get('/equipment', [EquipmentController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/equipment/create', [EquipmentController::class, 'create']);
Route::middleware(['auth:sanctum'])->post('/equipment', [EquipmentController::class, 'store']);
Route::middleware(['auth:sanctum'])->delete('/equipment/deleteBatch', [EquipmentController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->get('/equipment/{equipment}', [EquipmentController::class, 'edit']);
Route::middleware(['auth:sanctum'])->put('/equipment/{equipment}', [EquipmentController::class, 'update']);

Route::middleware(['auth:sanctum'])->get('/mqttMessages', [MqttMessageController::class, 'index']);
