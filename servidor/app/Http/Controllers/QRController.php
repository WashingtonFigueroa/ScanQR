<?php

namespace App\Http\Controllers;

use App\QR;
use Illuminate\Http\Request;

class QRController extends Controller
{
    public function index()
    {
        $qrs = QR::all();
        if (is_object($qrs)) {
            $data = array('code' => 200,'status' => 'success','qrs' => $qrs);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $qr = QR::where('id', '=' ,$id)->first();
        if (is_object($qr)) {
            $data = array('code' => 200,'status' => 'success','qr' => $qr);
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
                'qr' => 'required',
                'nombre' => 'required',
                'tiempo' => 'required',
                'estado' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el qr');
            } else {
                $qr = new Empresa();
                $qr->qr = $params_array['qr'];
                $qr->nombre = $params_array['nombre'];
                $qr->tiempo = $params_array['tiempo'];
                $qr->estado = $params_array['estado'];
                $qr->save();
                $data = array( 'code' => 200, 'status' => 'success', 'qr' => $qr);
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
            'qr' => 'required',
            'nombre' => 'required',
            'tiempo' => 'required',
            'estado' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el qr');
        } else {
            unset($params_array['id']);
            unset($params_array['created_at']);
            unset($params_array['updated_at']);
            $qr = QR::where('id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'qr' => $qr);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $qr = QR::where('id',$id)->first();
        if (!empty($qr)) {
            $qr->delete();
            $data = array('code' => 200, 'status' => 'success', 'qr' => $qr);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Qr no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
