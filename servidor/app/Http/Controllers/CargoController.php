<?php

namespace App\Http\Controllers;

use App\Cargo;
use Illuminate\Http\Request;
use Validator;

class CargoController extends Controller
{
    public function index()
    {
        $cargos = Cargo::whereNotIn('id', [1])->orderBy('id', 'desc')->get();
        return response()->json($cargos, 200);
    }

    public function listaCargos()
    {
        $cargos = Cargo::where('estado','1')
        ->whereNotIn('id', [1])
        ->get();
        if (is_object($cargos)) {
            $data = array('code' => 200, 'status' => 'success', 'cargos' => $cargos);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        $cargo = Cargo::create($request->all());
        return response()->json($cargo, 201);
    }

    public function show($id)
    {
        return response()->json(Cargo::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $cargo = Cargo::find($id);
        $cargo->update($request->all());
        return response()->json($cargo, 200);
    }

    public function destroy($id)
    {
        $cargo = Cargo::find($id);
        $cargo->delete();
        return response()->json($cargo, 200);
    }

}
