<?php

namespace App\Http\Controllers;

use App\Cupo;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CupoController extends Controller
{
    public function index()
    {
        $cupos = Cupo::orderBy('id', 'desc')->get();
        return response()->json($cupos, 200);
    }

    public function store(Request $request)
    {
        $hoy = Carbon::parse(Carbon::now()->toDateString());
        $fecha_fin = Carbon::parse($request->input('fecha_fin'));
        if ($fecha_fin->greaterThanOrEqualTo($hoy)) {
            $input = $request->all();
            $input['gasto'] = 0;
            $input['saldo'] = $request->input('carga');
            $cupo = Cupo::create($input);
            return response()->json($cupo, 201);
        } else {
            return response()->json([
                'error' => 'La fecha de fin de entrega debe ser mayor o igual a la fecha actual'
            ], 500);
        }
    }

    public function show($id)
    {
        return response()->json(Cupo::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $cupo = Cupo::find($id);
        $cupo->update($request->all());
        return response()->json($cupo, 200);
    }

    public function destroy($id)
    {
        $cupo = Cupo::find($id);
        $cupo->delete();
        return response()->json($cupo, 200);
    }

    public function activarCupo($id)
    {
        $cupo = Cupo::find($id);
        $cupo->estado = true;
        $cupo->save();
        return response()->json($cupo, 200);
    }

    public function inactivarCupo($id)
    {
        $cupo = Cupo::find($id);
        $cupo->estado = false;
        $cupo->save();
        return response()->json($cupo, 200);
    }
}
