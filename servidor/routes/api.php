<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::get('/user/avatar/{filename}', 'UserController@getImage');
Route::get('/empresa/logo/{filename}', 'EstablecimientoController@getImage');
Route::get('establecimientos', 'EstablecimientoController@index');
Route::get('/noticia/imagen/{filename}', 'NoticiaController@getImage');

Route::post('/user/upload', 'UserController@upload');
Route::post('/empresa/upload', 'EstablecimientoController@upload');
Route::post('/noticia/upload', 'NoticiaController@upload');

Route::group(['middleware' => ['auth:api', 'token.review']], function () {
    Route::post('logout', 'UserController@logout');
    Route::post('details', 'API\UserController@details');

    Route::get('stats', 'HistorialController@stats');
    Route::get('ingresos-hoy', 'HistorialController@ingresosHoy');
    Route::post('buscar-historial', 'HistorialController@buscarHistorial');
    Route::get('lista-cargos', 'CargoController@listaCargos');

    Route::get('/cliente', 'UserController@indexClientes');
    Route::get('/lista-usuarios', 'UserController@listaUsuarios');
    Route::apiResources([
        'usuarios' => 'UserController',
        'plan' => 'PlanController',
        'paquete' => 'PaqueteController',
        'cargo' => 'CargoController',
        'cupo' => 'CupoController',
        'noticia' => 'NoticiaController',
        'establecimiento' => 'EstablecimientoController',
        'qr' => 'QRController',
        'historial' => 'HistorialController'
    ]);

    Route::put('activar-cupo/{id}', 'CupoController@activarCupo');
    Route::put('inactivar-cupo/{id}', 'CupoController@inactivarCupo');
    Route::get('carga-gasto-saldo', 'HistorialController@cargaGastoSaldo');
});
Route::get('revocar', 'UserController@revocar');


