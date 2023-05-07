<?php

use App\Src\Node\NodeController;
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

Route::middleware(['auth:sanctum'])->get('/nodes', [NodeController::class, 'index']);

Route::middleware(['auth:sanctum'])->get('/nodes/create', [NodeController::class, 'create']);
Route::middleware(['auth:sanctum'])->patch('/nodes/deleteBatch', [NodeController::class, 'deleteBatch']);
Route::middleware(['auth:sanctum'])->post('/nodes', [NodeController::class, 'store']);
