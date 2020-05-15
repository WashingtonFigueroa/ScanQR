<?php

namespace App\Http\Controllers;

use App\Parametro;
use Illuminate\Http\Request;

class ParametroController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show']]);
    }
    
    public function index()
    {
        $parametro = Parametro::all();
        if (is_object($parametro)) {
            $data = array('code' => 200,'status' => 'success','parametros' => $parametro);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $parametro = Parametro::where('parametro_id', '=' ,$id)->first();
        if (is_object($parametro)) {
            $data = array('code' => 200,'status' => 'success','parametro' => $parametro);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        $json= $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
            $validate = \Validator::make($params_array, [
                'nombre' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el parametro');
            } else {
                $parametro = new Parametro();
                $parametro->nombre = $params_array['nombre'];
                $parametro->descripcion = $params_array['descripcion'];
                $parametro->save();
                $data = array( 'code' => 200, 'status' => 'success', 'parametro' => $parametro);
            }
        } else {
            $data = array( 'code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function update(Request $request, $id)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
        $validate = \Validator::make($params_array, [
            'nombre' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el parametro');
        } else {
            unset($params_array['parametro_id']);
            unset($params_array['created_at']);
            $parametro = Parametro::where('parametro_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'parametro' => $params_array);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $parametro = Parametro::where('parametro_id',$id)->first();
        if (!empty($parametro)) {
            $parametro->delete();
            $data = array('code' => 200, 'status' => 'success', 'parametro' => $parametro);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Tipo estado no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
