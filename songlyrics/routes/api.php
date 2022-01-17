<?php

use App\Http\Controllers\API\SongController; 
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
Route::post('/addsong', [SongController::class, 'create']);
Route::get('/editsong/{id}', [SongController::class, 'edit']);
Route::put('/updatesong/{id}', [SongController::class, 'update']);
Route::delete('/deletesong/{id}', [SongController::class, 'destroy']);
Route::get('song', [SongController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
