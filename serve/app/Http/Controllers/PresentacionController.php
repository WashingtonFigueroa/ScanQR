<?php

namespace App\Http\Controllers;

use App\Presentacion;
use Illuminate\Http\Request;

class PresentacionController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show', 'getPostByUser']]);
    }

     public function index()
    {
        $presentaciones = Presentacion::all();
        if (is_object($presentaciones)) {
            $data = array('code' => 200, 'status' => 'success', 'presentaciones' => $presentaciones);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $presentacion = Presentacion::find($id);
        if (is_object($presentacion)) {
            $presentacion = Presentacion::find($id);
            $data = array('code' => 200,'status' => 'success', 'presentacion' => $presentacion);
        } else {
            $data = array('code' => 404,'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        $json= $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'abreviatura' => 'required',
                'presentacion' => 'required',
                'cantidad' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400,'status' => 'error', 'message' => 'No se ha guardado la presentacion');
            } else {
                $presentacion = new Presentacion();
                $presentacion->abreviatura = $params_array['abreviatura'];
                $presentacion->presentacion = $params_array['presentacion'];
                $presentacion->cantidad = $params_array['cantidad'];
                $presentacion->descripcion = $params_array['descripcion'];
                $presentacion->estado = $params_array['estado'];
                $presentacion->save();
                $data = array('code' => 200,'status' => 'success', 'presentacion' => $presentacion);
            }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato' );
        }
        return response()->json($data, $data['code']);
    }

    public function update(Request $request, $id)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'abreviatura' => 'required',
                'presentacion' => 'required',
                'cantidad' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha modificado la presentacion');
            } else {
                unset($params_array['presentacion_id']);
                unset($params_array['created_at']);
                unset($params_array['updated_at']);
                $presentacion = Presentacion::where('presentacion_id','=', $id)
                                            ->update($params_array);
                if ($presentacion === 1) {
                    $data = array('code' => 200, 'status' => 'success', 'presentacion' => $presentacion);
                } else {
                    $data = array('code' => 400,'status' => 'error', 'message' => 'No has enviado ningun dato');
                }
            }
        } else {
            $data = array('code' => 400,'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $presentacion = Presentacion::where('presentacion_id',$id)->first();
        if (!empty($presentacion)) {
            $presentacion->delete();
            $data = array('code' => 200, 'status' => 'success', 'presentacion' => $presentacion);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Tipo de Servicio no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
