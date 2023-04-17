<?php

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

Route::middleware(['auth:sanctum'])->get('/nodes/query', function (Request $request) {
    return [
        'statuses' => ['NotConfigurred', 'Offline', 'Online', 'Suspended'], 
        'data' => [
            ['id' => 1, 'guid' => '4689-3689-2257-6497', 'status' => 'NotConfigurred'],
            ['id' => 2, 'guid' => '4976-7916-1796-4698', 'status' => 'Online'],
            ['id' => 3, 'guid' => '1367-8945-1125-2356', 'status' => 'Offline'],
            ['id' => 4, 'guid' => '4689-3689-2257-6497', 'status' => 'Suspended'],
            ['id' => 5, 'guid' => '4976-7916-1796-4698', 'status' => 'Suspended'],
            ['id' => 6, 'guid' => '1367-9745-1125-2356', 'status' => 'Offline'],
            ['id' => 7, 'guid' => '1111-9745-1125-2222', 'status' => 'Online']
        ]
    ];
});

Route::middleware(['auth:sanctum'])->post('/nodes', function (Request $request) {
    return $request->all();
});
