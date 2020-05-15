<?php

namespace App\Http\Controllers;

use App\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show']]);
    }
    
    public function index()
    {
        $pedido = Pedido::all()->load('salicitud')->load('parametro');
        if (is_object($pedido)) {
            $data = array('code' => 200,'status' => 'success','parametro' => $pedido);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $pedido = Pedido::find($id);
        if (is_object($pedido)) {
            $pedido = Pedido::find($id)->load('salicitud')->load('parametro');
            $data = array('code' => 200,'status' => 'success', 'parametro' => $pedido);
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
                'solicitud_id' => 'required',
                'parametro_id' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el pedido');
            } else {
                $pedido = new pedido();
                $pedido->solicitud_id = $params_array['solicitud_id'];
                $pedido->parametro_id = $params_array['parametro_id'];
                $pedido->archivo = $params_array['archivo'];
                $pedido->descripcion = $params_array['descripcion'];
                $pedido->save();
                $data = array( 'code' => 200, 'status' => 'success', 'pedido' => $pedido);
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
            'solicitud_id' => 'required',
            'parametro_id' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el pedido');
        } else {
            unset($params_array['pedido_id']);
            unset($params_array['created_at']);
            $pedido = Pedido::where('pedido_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'pedido' => $params_array);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $pedido = Pedido::where('pedido_id',$id)->first();
        if (!empty($pedido)) {
            $pedido->delete();
            $data = array('code' => 200, 'status' => 'success', 'pedido' => $pedido);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'pedido no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
