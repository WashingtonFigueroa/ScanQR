<?php
// cargando clases
use App\Http\Middleware\ApiAuthMiddleware;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user/repartidores', 'UserController@repartidores');
Route::get('/user/clientes', 'UserController@clientes');
Route::get('/user/index', 'UserController@index');
Route::get('/show/{id}', 'UserController@show');
Route::put('user/modificar/{id}', 'UserController@modificar')->middleware(ApiAuthMiddleware::class);
Route::delete('user/delete/{id}', 'UserController@destroy')->middleware(ApiAuthMiddleware::class);

Route::post('/register', 'UserController@register');
Route::post('/login', 'UserController@login');
Route::put('/user/update', 'UserController@update');
Route::post('/user/upload','UserController@upload')->middleware(ApiAuthMiddleware::class);
Route::get('/user/avatar/{filename}','UserController@getImage');
Route::get('/user/detail/{id}','UserController@detail');

Route::resource('/empresa', 'EmpresaController');
Route::post('/empresa/upload','EmpresaController@upload');
Route::get('/empresa/logo/{filename}','EmpresaController@getImage');

Route::resource('/presentacion', 'PresentacionController');

Route::resource('/productos', 'ProductoController');
Route::post('/productos/upload','ProductoController@upload');
Route::get('/productos/imagen/{filename}','ProductoController@getImage');

Route::resource('/beneficio', 'BeneficioController');

Route::resource('/noticia', 'NoticiaController');
Route::post('/noticia/upload','NoticiaController@upload');
Route::get('/noticia/imagen/{filename}','NoticiaController@getImage');

Route::resource('/tipoestado', 'TipoEstadoController');
Route::resource('/parametro', 'ParametroController');
Route::resource('/solicitud', 'SolicitudController');
Route::resource('/pedido', 'PedidoController');


//DELETE
Route::resource('/proyecto', 'ProyectoController');
Route::post('/proyecto/upload','ProyectoController@upload');
Route::get('/proyecto/logo/{filename}','ProyectoController@getImage');

