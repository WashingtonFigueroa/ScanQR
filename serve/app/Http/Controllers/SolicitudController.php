<?php

namespace App\Http\Controllers;

use App\Solicitud;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show']]);
    }
    
    public function index()
    {
        $solicitud = Solicitud::all()->load('user')->load('estado');
        if (is_object($solicitud)) {
            $data = array('code' => 200,'status' => 'success','solicituds' => $solicitud);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $solicitud = Solicitud::find($id);
        if (is_object($solicitud)) {
            $solicitud = Solicitud::find($id)->load('user')->load('estado');
            $data = array('code' => 200,'status' => 'success', 'solicituds' => $solicitud);
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
                'user_id' => 'required',
                'tipo_estado_id' => 'required',
                'fecha_ini' => 'required',
                'fecha_fin' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado la Solicitud');
            } else {
                $solicitud = new Solicitud();
                $solicitud->user_id = $params_array['user_id'];
                $solicitud->tipo_estado_id = $params_array['tipo_estado_id'];
                $solicitud->fecha_ini = $params_array['fecha_ini'];
                $solicitud->fecha_fin = $params_array['fecha_fin'];
                $solicitud->descripcion = $params_array['descripcion'];
                $solicitud->save();
                $data = array( 'code' => 200, 'status' => 'success', 'solicitud' => $solicitud);
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
            'user_id' => 'required',
            'tipo_estado_id' => 'required',
            'fecha_ini' => 'required',
            'fecha_fin' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado la Solicitud');
        } else {
            unset($params_array['solicitud_id']);
            unset($params_array['created_at']);
            $solicitud = Solicitud::where('solicitud_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'solicitud' => $params_array);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $solicitud = Solicitud::where('solicitud_id',$id)->first();
        if (!empty($solicitud)) {
            $solicitud->delete();
            $data = array('code' => 200, 'status' => 'success', 'solicitud' => $solicitud);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Solicitud no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
