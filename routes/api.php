<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Api\UpdateLeaveRequestController;
use App\Http\Controllers\UpdateDataController;
use App\Http\Controllers\ApiController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::group(['prefix' => 'Api'], function() {
//     Route::apiResource('leaveRequest', updateLeaveRequestController::class);
// });

Route::get('leaveRequests', [LeaveRequestController::class, 'index']);
Route::put('updateLeaveRequests', [UpdateLeaveRequestController::class, 'index']);
Route::put('/update-data', 'UpdateLeaveRequestController@updateData');
Route::get('/endpoint', [ApiController::class, 'index']);
Route::get('/endpoint', [UpdateDataController::class, 'index']);

// Route::get('updateLeaveRequest', [UpdateLeaveRequestController::class, 'index']);

// Route::put('/update-data/{id}', [UpdateDataController::class, 'edit']);

