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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::get('/user/avatar/{filename}','UserController@getImage');

Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'API\UserController@details');
    Route::post('/user/upload','UserController@upload');
    Route::get('stats', 'HistorialController@stats');
    Route::get('ingresos-hoy', 'HistorialController@ingresosHoy');
    Route::post('buscar-historial', 'HistorialController@buscarHistorial');
    Route::get('lista-cargos', 'CargoController@listaCargos');
    Route::apiResources([
        'usuarios' => 'UserController',
        'cargo' => 'CargoController',
        'qr' => 'QRController',
        'historial' => 'HistorialController'
    ]);
});
 

