<?php

namespace App\Http\Controllers;

use App\Establecimiento;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use File;
use Validator;
use Storage;

class EstablecimientoController extends Controller
{
    public function index()
    {
        $establecimientos = Establecimiento::orderBy('id', 'desc')->get();
        return response()->json($establecimientos, 200);
    }

    public function store(Request $request)
    {
        $establecimiento = Establecimiento::create($request->all());
        return response()->json($establecimiento, 201);
    }

    public function show($id)
    {
        return response()->json(Establecimiento::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $establecimiento = Establecimiento::find($id);
        $establecimiento->update($request->all());
        return response()->json($establecimiento, 200);
    }

    public function destroy($id)
    {
        $establecimiento = Establecimiento::find($id);
        $establecimiento->delete();
        return response()->json($establecimiento, 200);
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
            Storage::disk('logos')->put($image_name, File::get($image));
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
        $isset = Storage::disk('logos')->exists($filename);
        if ($isset) {
            $file = Storage::disk('logos')->get($filename);
            return new Response($file, 200);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Imagen no Existe');
            return response()->json($data, $data['code']);
        }
    }
}
