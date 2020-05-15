<?php

namespace App\Http\Controllers;

use App\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProyectoController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show','getImage']]);
    }
    
    public function index()
    {
        $proyecto = Proyecto::all();
        if (is_object($proyecto)) {
            $data = array('code' => 200,'status' => 'success','proyectos' => $proyecto);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $proyecto = Proyecto::where('proyecto_id', '=' ,$id)->first();
        if (is_object($proyecto)) {
            $data = array('code' => 200,'status' => 'success','proyecto' => $proyecto);
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
                'descripcion' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el proyecto');
            } else {
                $proyecto = new Proyecto();
                $proyecto->nombre = $params_array['nombre'];
                $proyecto->descripcion = $params_array['descripcion'];
                $proyecto->imagen = $params_array['imagen'];
                $proyecto->develop = $params_array['develop'];
                $proyecto->save();
                $data = array( 'code' => 200, 'status' => 'success', 'proyecto' => $proyecto);
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
            'descripcion' => 'required'
        ]);
        if ($validate->fails()) {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el proyecto');
        } else {
            unset($params_array['proyecto_id']);
            unset($params_array['created_at']);
            $proyecto = Proyecto::where('proyecto_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'proyecto' => $params_array);
        }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $proyecto = Proyecto::where('proyecto_id',$id)->first();
        if (!empty($proyecto)) {
            $proyecto->delete();
            $data = array('code' => 200, 'status' => 'success', 'proyecto' => $proyecto);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Proyecto no encontrado');
        }
        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {
        $image = $request->file('file0');
        $validate = \Validator::make($request->all(),[
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        if (!$image || $validate->fails()) {
            $data = array( 'code' => 400, 'status' => 'error', 'message' => 'Error al subir la imagen');
        } else {
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('logos')->put($image_name, \File::get($image));
            $data = array( 'code' => 200, 'status' => 'success', 'image' => $image_name);
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
