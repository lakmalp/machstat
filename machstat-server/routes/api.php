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
        'data' => []
    ];
});

Route::middleware(['auth:sanctum'])->post('/nodes', function (Request $request) {
    return $request->all();
});
