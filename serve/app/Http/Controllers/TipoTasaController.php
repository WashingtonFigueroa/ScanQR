<?php

namespace App\Http\Controllers;

use App\TipoTasa;
use Illuminate\Http\Request;

class TipoTasaController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show']]);
    }
    
    public function index()
    {
        $tipoTasa = TipoTasa::all();
        if (is_object($tipoTasa)) {
            $data = array('code' => 200,'status' => 'success','tipo_tasa' => $tipoTasa);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $tipoTasa = TipoTasa::where('tipo_tasa_id', '=' ,$id)->first();
        if (is_object($tipoTasa)) {
            $data = array('code' => 200,'status' => 'success','tipo_tasa' => $tipoTasa);
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
                'tipo' => 'required',
                'porcentaje' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el tipo de tasa');
            } else {
                $tipoTasa = new TipoTasa();
                $tipoTasa->tipo = $params_array['tipo'];
                $tipoTasa->porcentaje = $params_array['porcentaje'];
                $tipoTasa->save();
                $data = array( 'code' => 200, 'status' => 'success', 'tipo_tasa' => $tipoTasa);
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
            'tipo' => 'required',
            'porcentaje' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array( 'code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el tipo de tasa');
        } else {
            unset($params_array['tipo_tasa_id']);
            unset($params_array['created_at']);
            $tipoTasa = TipoTasa::where('tipo_tasa_id','=', $id)->update($params_array);
            $data = array( 'code' => 200, 'status' => 'success', 'tipo_tasa' => $params_array);
        }
        } else {
            $data = array( 'code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }
    
    public function destroy($id, Request $request)
    {
        $tipoTasa = TipoTasa::where('tipo_tasa_id',$id)->first();
        if (!empty($tipoTasa)) {
            $tipoTasa->delete();
            $data = array('code' => 200, 'status' => 'success', 'tipo_tasa' => $tipoTasa);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Tipo Tasa no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
