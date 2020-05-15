<?php

namespace App\Http\Controllers;

use App\Tipo_Estado;
use Illuminate\Http\Request;

class TipoEstadoController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show']]);
    }
    
    public function index()
    {
        $tipoEstado = Tipo_Estado::all();
        if (is_object($tipoEstado)) {
            $data = array('code' => 200,'status' => 'success','tipoestados' => $tipoEstado);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $tipoEstado = Tipo_Estado::where('tipo_estado_id', '=' ,$id)->first();
        if (is_object($tipoEstado)) {
            $data = array('code' => 200,'status' => 'success','tipoestado' => $tipoEstado);
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
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el tipo estado');
            } else {
                $tipoEstado = new Tipo_Estado();
                $tipoEstado->nombre = $params_array['nombre'];
                $tipoEstado->descripcion = $params_array['descripcion'];
                $tipoEstado->save();
                $data = array( 'code' => 200, 'status' => 'success', 'tipo_estado' => $tipoEstado);
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
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el tipo estado');
        } else {
            unset($params_array['tipo_estado_id']);
            unset($params_array['created_at']);
            $tipoEstado = Tipo_Estado::where('tipo_estado_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'tipo_estado' => $params_array);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $tipoEstado = Tipo_Estado::where('tipo_estado_id',$id)->first();
        if (!empty($tipoEstado)) {
            $tipoEstado->delete();
            $data = array('code' => 200, 'status' => 'success', 'tipo_estado' => $tipoEstado);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Tipo estado no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
