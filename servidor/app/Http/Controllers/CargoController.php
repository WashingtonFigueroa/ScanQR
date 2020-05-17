<?php

namespace App\Http\Controllers;

use App\Cargo;
use Illuminate\Http\Request;
use Validator;

class CargoController extends Controller
{
    public function index()
    {
        $cargos = Cargo::all();
        if (is_object($cargos)) {
            $data = array('code' => 200, 'status' => 'success', 'cargos' => $cargos);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function show($id)
    {
        $cargo = Cargo::where('id', '=', $id)->first();
        if (is_object($cargo)) {
            $data = array('code' => 200, 'status' => 'success', 'cargo' => $cargo);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'nombre' => 'required'
        ]);
        if ($validate->fails()) {
            return response()->json([
                'code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el cargo'
            ]);
        } else {
            $cargo = Cargo::create($request->all());
            return response()->json(['code' => 200, 'status' => 'success', 'cargo' => $cargo], 201);
        }
    }

    public function update(Request $request, $id)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
            $validate = Validator::make($params_array, [
                'nombre' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado el cargo');
            } else {
                unset($params_array['id']);
                unset($params_array['created_at']);
                unset($params_array['updated_at']);
                $cargo = Cargo::where('id', '=', $id)->update($params_array);
                $data = array('code' => 200, 'status' => 'success', 'cargo' => $cargo);
            }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $cargo = Cargo::where('id', $id)->first();
        if (!empty($cargo)) {
            $cargo->delete();
            $data = array('code' => 200, 'status' => 'success', 'cargo' => $cargo);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Cargo no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}
