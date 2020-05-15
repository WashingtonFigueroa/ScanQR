<?php

namespace App\Http\Controllers;

use App\Noticia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NoticiaController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show','getImage']]);
    }
    
    public function index()
    {
        $noticias = Noticia::all()->load('empresa')->load('user');
        if (is_object($noticias)) {
            $data = array('code' => 200,'status' => 'success','noticias' => $noticias);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
    return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $noticia = Noticia::where('noticia_id', '=' ,$id)->first();
        if (is_object($noticia)) {
            $data = array('code' => 200,'status' => 'success','noticia' => $noticia);
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
                'user_id' => 'required',
                'nombre' => 'required',
                'detalle' => 'required',
                'fecha_ini' => 'required',
                'fecha_fin' => 'required'

            ]);
          //  if ($validate->fails()) {
          //      $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el noticia');
         //   } else {
                $noticia = new Noticia();
                $noticia->empresa_id = $params_array['empresa_id'];
                $noticia->user_id = $params_array['userid'];
                $noticia->nombre = $params_array['nombre'];
                $noticia->detalle = $params_array['detalle'];
                $noticia->imagen = $params_array['imagen'];
                $noticia->fecha_ini = $params_array['fecha_ini'];
                $noticia->fecha_fin = $params_array['fecha_fin'];
                $noticia->save();
                $data = array( 'code' => 200, 'status' => 'success', 'noticia' => $noticia);
           // }
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
            'user_id' => 'required',
            'nombre' => 'required',
            'detalle' => 'required',
            'fecha_ini' => 'required',
            'fecha_fin' => 'required'
        ]);
       // if ($validate->fails()) {
       //     $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el noticia');
       // } else {
            unset($params_array['noticia_id']);
            unset($params_array['created_at']);
            unset($params_array['updated_at']);
            $noticia = Noticia::where('noticia_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'noticia' => $params_array);
        //}
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $noticia = Noticia::where('noticia_id',$id)->first();
        if (!empty($noticia)) {
            $noticia->delete();
            $data = array('code' => 200, 'status' => 'success', 'noticia' => $noticia);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Noticia no encontrado');
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
            \Storage::disk('noticias')->put($image_name, \File::get($image));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'logo' => $image_name
            );
        } 
        return response()->json($data, $data['code']);
    }

    public function getImage ($filename) {
        $isset = \Storage::disk('noticias')->exists($filename);
        if ($isset) {
            $file = \Storage::disk('noticias')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Imagen no Existe');
        return response()->json($data, $data['code']);
        }
    }
}

