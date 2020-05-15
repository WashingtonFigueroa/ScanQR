<?php

namespace App\Http\Controllers;

use App\Beneficio;
use Illuminate\Http\Request;

class BeneficioController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show']]);
    }
    
    public function index()
    {
        $beneficios = Beneficio::all()->load('empresa');
        if (is_object($beneficios)) {
            $data = array('code' => 200,'status' => 'success','beneficios' => $beneficios);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $beneficio = Beneficio::where('beneficio_id', '=' ,$id)->first();
        if (is_object($beneficio)) {
            $data = array('code' => 200,'status' => 'success','beneficio' => $beneficio);
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
                'empresa_id' => 'required',
                'nombre' => 'required|regex:/^[\pL\s\-]+$/u'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el beneficio');
            } else {
                $beneficio = new Beneficio();
                $beneficio->empresa_id = $params_array['empresa_id'];
                $beneficio->nombre = $params_array['nombre'];
                $beneficio->save();
                $data = array( 'code' => 200, 'status' => 'success', 'beneficio' => $beneficio);
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
            'empresa_id' => 'required',
            'nombre' => 'required|regex:/^[\pL\s\-]+$/u'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el beneficio');
        } else {
            unset($params_array['beneficio_id']);
            unset($params_array['created_at']);
            unset($params_array['updated_at']);
            $beneficio = Beneficio::where('beneficio_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'beneficio' => $params_array);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $beneficio = Beneficio::where('beneficio_id',$id)->first();
        if (!empty($beneficio)) {
            $beneficio->delete();
            $data = array('code' => 200, 'status' => 'success', 'beneficio' => $beneficio);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Beneficio no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
