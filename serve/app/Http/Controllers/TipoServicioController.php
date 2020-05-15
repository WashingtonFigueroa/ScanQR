<?php

namespace App\Http\Controllers;

use App\TipoServicio;
use Illuminate\Http\Request;

class TipoServicioController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show', 'getPostByUser']]);
    }

     public function index()
    {
        $tipoServicio = TipoServicio::all()->load('tipoTasa')->load('empresa')->load('proyecto');
        if (is_object($tipoServicio)) {
            $data = array('code' => 200, 'status' => 'success', 'tipo_servicios' => $tipoServicio);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $tipoServicio = TipoServicio::find($id);
        if (is_object($tipoServicio)) {
            $tipoServicio = TipoServicio::find($id)->load('tipoTasa')->load('empresa')->load('proyecto');
            $data = array('code' => 200,'status' => 'success', 'tipo_servicio' => $tipoServicio);
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
            //$user = $this->getIdentity($request);
            $validate = \Validator::make($params_array, [
                'proyecto_id' => 'required',
                'empresa_id' => 'required',
                'tipo_tasa_id' => 'required',
                'nombre' => 'required',
                'interes' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400,'status' => 'error', 'message' => 'No se ha guardado el tipo de servicio');
            } else {
                $tipoServicio = new TipoServicio();
                $tipoServicio->proyecto_id = $params_array['proyecto_id'];
                $tipoServicio->empresa_id = $params_array['empresa_id'];
                $tipoServicio->tipo_tasa_id = $params_array['tipo_tasa_id'];
                $tipoServicio->nombre = $params_array['nombre'];
                $tipoServicio->descripcion = $params_array['descripcion'];
                $tipoServicio->interes = $params_array['interes'];
                $tipoServicio->save();
                $data = array('code' => 200,'status' => 'success', 'tipo_servicio' => $tipoServicio);
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
                'proyecto_id' => 'required',
                'empresa_id' => 'required',
                'tipo_tasa_id' => 'required',
                'nombre' => 'required',
                'interes' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha modificar el tipo de servicio');
            } else {
                unset($params_array['tipo_servicio_id']);
                unset($params_array['created_at']);
                $tipoServicio = TipoServicio::where('tipo_servicio_id','=', $id)
                                            ->update($params_array);
                if ($tipoServicio === 1) {
                    $data = array('code' => 200, 'status' => 'success', 'tipo_servicio' => $tipoServicio);
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
        $tipoServicio = TipoServicio::where('tipo_servicio_id',$id)->first();
        if (!empty($tipoServicio)) {
            $tipoServicio->delete();
            $data = array('code' => 200, 'status' => 'success', 'tipo_servicio' => $tipoServicio);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Tipo de Servicio no encontrado');
        }
        return response()->json($data, $data['code']);
    }

   /* private function getIdentity ($request){
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);
        return $user;
    }

    public function getPostByUser($id) {
        $tipoServicio = post::where('id_user',$id)->get();
        return response()->json([
            'status' => 'success',
            'post' => $tipoServicio
        ], 200); 
    } */
}
