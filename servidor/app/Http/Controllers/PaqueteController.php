<?php

namespace App\Http\Controllers;

use App\Paquete;
use Illuminate\Http\Request;

class PaqueteController extends Controller
{
    public function index()
    {
        $paquetes = Paquete::all();
        return response()->json($paquetes, 200);
    }

    public function store(Request $request)
    {
        $paquete = Paquete::create($request->all());
        return response()->json($paquete, 201);
    }

    public function show($id)
    {
        return response()->json(Paquete::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $paquete = Paquete::find($id);
        $paquete->update($request->all());
        return response()->json($paquete, 200);
    }

    public function destroy($id)
    {
        $paquete = Paquete::find($id);
        $paquete->delete();
        return response()->json($paquete, 200);
    }
}
