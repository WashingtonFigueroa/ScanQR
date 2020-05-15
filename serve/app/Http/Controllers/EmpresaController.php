<?php

namespace App\Http\Controllers;

use App\Empresa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EmpresaController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show','getImage']]);
    }
    
    public function index()
    {
        $empresa = Empresa::all();
        if (is_object($empresa)) {
            $data = array('code' => 200,'status' => 'success','empresas' => $empresa);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $empresa = Empresa::where('empresa_id', '=' ,$id)->first();
        if (is_object($empresa)) {
            $data = array('code' => 200,'status' => 'success','empresa' => $empresa);
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
                'nombre' => 'required',
                'direccion' => 'required',
                'telefono' => 'required',
                'email' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado la empresa');
            } else {
                $empresa = new Empresa();
                $empresa->nombre = $params_array['nombre'];
                $empresa->eslogan = $params_array['eslogan'];
                $empresa->actividad = $params_array['actividad'];
                $empresa->direccion = $params_array['direccion'];
                $empresa->telefono = $params_array['telefono'];
                $empresa->email = $params_array['email'];
                $empresa->web = $params_array['web'];
                $empresa->detalle = $params_array['detalle'];
                $empresa->coordenadas = $params_array['coordenadas'];
                $empresa->logo = $params_array['logo'];
                $empresa->save();
                $data = array( 'code' => 200, 'status' => 'success', 'empresa' => $empresa);
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
            'nombre' => 'required',
            'direccion' => 'required',
            'telefono' => 'required',
            'email' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado la empresa');
        } else {
            unset($params_array['empresa_id']);
            unset($params_array['created_at']);
            unset($params_array['updated_at']);
            $empresa = Empresa::where('empresa_id','=', $id)->update($params_array);
            // $empresa = Empresa::find($id);
            // $empresa->update($request->all());

            $data = array('code' => 200, 'status' => 'success', 'empresa' => $empresa);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $empresa = Empresa::where('empresa_id',$id)->first();
        if (!empty($empresa)) {
            $empresa->delete();
            $data = array('code' => 200, 'status' => 'success', 'empresa' => $empresa);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Empresa no encontrado');
        }
        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {
        $image = $request->file('file0');
        //validacion img
        $validate = \Validator::make($request->all(),[
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        //guardar imagen
        if (!$image || $validate->fails()) {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir la imagen'
            );
        } else {
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('logos')->put($image_name, \File::get($image));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'logo' => $image_name
            );
        } 
        return response()->json($data, $data['code']);
    }

    public function getImage ($filename) {
        $isset = \Storage::disk('logos')->exists($filename);
        if ($isset) {
            $file = \Storage::disk('logos')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Imagen no Existe');
        return response()->json($data, $data['code']);
        }
    }
}
