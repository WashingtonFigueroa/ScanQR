<?php

namespace App\Http\Controllers;

use App\Historial;
use Illuminate\Http\Request;

class HistorialController extends Controller
{
    public function index()
    {
        $historias = Historial::all();
        if (is_object($historias)) {
            $data = array('code' => 200,'status' => 'success','historias' => $historias);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $historia = Historial::where('id', '=' ,$id)->first();
        if (is_object($historia)) {
            $data = array('code' => 200,'status' => 'success','historia' => $historia);
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
                'qr_id' => 'required',
                'nombre' => 'required',
                'ingreso' => 'required',
                'salida' => 'required',
                'salida_tentativa' => 'required',
                'tiempo' => 'required',
                'estado' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el historia');
            } else {
                $historia = new Empresa();
                $historia->qr = $params_array['qr'];
                $historia->nombre = $params_array['nombre'];
                $historia->ingreso = $params_array['ingreso'];
                $historia->salida = $params_array['salida'];
                $historia->salida_tentativa = $params_array['salida_tentativa'];
                $historia->tiempo = $params_array['tiempo'];
                $historia->estado = $params_array['estado'];
                $historia->save();
                $data = array( 'code' => 200, 'status' => 'success', 'historia' => $historia);
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
            'qr_id' => 'required',
            'nombre' => 'required',
            'ingreso' => 'required',
            'salida' => 'required',
            'salida_tentativa' => 'required',
            'tiempo' => 'required',
            'estado' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado la historia');
        } else {
            unset($params_array['id']);
            unset($params_array['created_at']);
            unset($params_array['updated_at']);
            $historia = Historial::where('id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'qr' => $historia);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $historia = Historial::where('id',$id)->first();
        if (!empty($historia)) {
            $historia->delete();
            $data = array('code' => 200, 'status' => 'success', 'historia' => $historia);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Qr no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}

