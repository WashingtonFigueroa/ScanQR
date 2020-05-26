<?php

namespace App\Http\Controllers;

use App\Noticia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use File;
use Storage;
use Validator;
class NoticiaController extends Controller
{
    public function index()
    {
        $noticias = Noticia::where('estado', 1)->orderBy('id', 'desc')->get();
        return response()->json($noticias, 200);
    }

    public function store(Request $request)
    {
        $noticia = Noticia::create($request->all());
        return response()->json($noticia, 201);
    }

    public function show($id)
    {
        return response()->json(Noticia::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $noticia = Noticia::find($id);
        $noticia->update($request->all());
        return response()->json($noticia, 200);
    }

    public function destroy($id)
    {
        $noticia = Noticia::find($id);
        $noticia->delete();
        return response()->json($noticia, 200);
    }

    public function upload(Request $request)
    {
        $image = $request->file('file0');
        $validate = Validator::make($request->all(), [
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);
        if (!$image || $validate->fails()) {
            $data = array(
                'code' => 400,
                'status' => 'error',
                'message' => 'Error al subir la imagen'
            );
        } else {
            $image_name = time() . $image->getClientOriginalName();
            Storage::disk('noticias')->put($image_name, File::get($image));
            $data = array(
                'code' => 200,
                'status' => 'success',
                'image' => $image_name
            );
        }
        return response()->json($data, $data['code']);
    }

    public function getImage($filename)
    {
        $isset = Storage::disk('noticias')->exists($filename);
        if ($isset) {
            $file = Storage::disk('noticias')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Imagen no Existe');
            return response()->json($data, $data['code']);
        }
    }

}