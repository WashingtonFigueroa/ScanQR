<?php

namespace App\Http\Controllers;

use App\Producto;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;




class ProductoController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index','show','getImage']]);
    }
    
    public function index()
    {
        $productos = Producto::all()->load('empresa')->load('presentacion');
        if (is_object($productos)) {
            $data = array('code' => 200,'status' => 'success','productos' => $productos);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $producto = Producto::where('producto_id', '=' ,$id)->first();
        if (is_object($producto)) {
            $data = array('code' => 200,'status' => 'success','producto' => $producto);
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


            $validator = Validator::make($params_array, [
                'empresa_id ' => 'required',
                'presentacion_id ' => 'required',
                'nombre' => 'required'
            ]);

            // if ($validator->fails()) {
            //     $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el Producto');
            //  } else {
                $producto = new Producto();
                $producto->empresa_id  = $params_array['empresa_id'];
                $producto->presentacion_id  = $params_array['presentacion_id'];
                $producto->nombre = $params_array['nombre'];
                $producto->descripcion = $params_array['descripcion'];
                $producto->imagen = $params_array['imagen'];
                $producto->valor = $params_array['valor'];
                $producto->stock = $params_array['stock'];
                $producto->cantidad = $params_array['cantidad'];
                $producto->inventariable = $params_array['inventariable'];
                $producto->estado = $params_array['estado'];
                $producto->save();
                $data = array( 'code' => 200, 'status' => 'success', 'empresa' => $producto);
            //  }
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
        $v = \Validator::make($params_array, [
            'empresa_id ' => 'required',
            'presentacion_id ' => 'required',
            'nombre' => 'required',
            'valor' => 'required'
        ]);
        // if ($v->fails()) {
        //     $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el producto');
        // } else {
            unset($params_array['producto_id']);
            unset($params_array['created_at']);
            unset($params_array['updated_at']);
            $producto = Producto::where('producto_id','=', $id)->update($params_array);
            $data = array('code' => 200, 'status' => 'success', 'producto' => $producto);
       // }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $producto = Producto::where('producto_id',$id)->first();
        if (!empty($producto)) {
            $producto->delete();
            $data = array('code' => 200, 'status' => 'success', 'producto' => $producto);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Producto no encontrado');
        }
        return response()->json($data, $data['code']);
    }

    public function upload(Request $request)
    {
        $image = $request->file('file0');
        //validacion img
        $v = \Validator::make($request->all(),[
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        //guardar imagen
        if (!$image || $v->fails()) {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir la imagen'
            );
        } else {
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('productos')->put($image_name, \File::get($image));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'imagen' => $image_name
            );
        } 
        return response()->json($data, $data['code']);
    }

    public function getImage ($filename) {
        $isset = \Storage::disk('productos')->exists($filename);
        if ($isset) {
            $file = \Storage::disk('productos')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array('code' => 404,'status' => 'error','message' => 'Imagen no Existe');
        return response()->json($data, $data['code']);
        }
    }
}
