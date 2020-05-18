<?php

namespace App\Http\Controllers;

use App\Historial;
use App\QR;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

class HistorialController extends Controller
{
    public function index()
    {
        $historial = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->orderBy('id', 'desc')->get();
        return response()->json($historial, 200);
    }

    public function show($id)
    {
        $historia = Historial::where('id', '=', $id)->first();
        if (is_object($historia)) {
            $data = array('code' => 200, 'status' => 'success', 'historia' => $historia);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Lista Vacia');
        }
        return response()->json($data, $data['code']);
    }

    public function store(Request $request)
    {
        $codigo = $request->input('codigo');
        $qr_exists = QR::where('codqr', '=', $codigo)->where('estado', 'Activo')->exists();
        if ($qr_exists) {
            $qr = QR::where('codqr', '=', $codigo)->first();
            $now = Carbon::now();
            $salida_tentativa = $now->addMinutes($qr['tiempo'])->toDateTimeString();
            $existeRegistros = Historial::where('qr_id', $qr['id'])
                ->whereDate('created_at', Carbon::now()->toDateString())
                ->orderBy('id', 'desc')
                ->exists();
            if ($existeRegistros) {
                $historial = Historial::where('qr_id', $qr['id'])
                    ->whereDate('created_at', Carbon::now()->toDateString())
                    ->orderBy('id', 'desc')
                    ->first();
                if ($historial->estado === 'INGRESO') {
                    $historial->estado = 'SALIDA';
                    $historial->salida = Carbon::now()->toDateTimeString();
                    $historial->tiempo = Carbon::now()->diffInMinutes(Carbon::parse($historial->ingreso));
                    $historial->save();
                    if ($qr->tiempo >= $historial->tiempo) {
                        return response()->json([
                            'tiempo_transcurrido' => $historial->tiempo,
                            'type' => 'success',
                            'observacion' => 'En hora, le quedaban ' . $qr->tiempo - $historial->tiempo . ' minutos restantes'
                        ]);
                    } else {
                        return response()->json([
                            'tiempo_transcurrido' => $historial->tiempo,
                            'type' => 'error',
                            'observacion' => 'Con retraso de ' . $historial->tiempo - $qr->tiempo . ' minutos'
                        ]);
                    }
                } else {
                    Historial::create([
                        'qr_id' => $qr['id'],
                        'nombre' => $qr['codqr'],
                        'ingreso' => Carbon::now()->toDateTimeString(),
                        'tiempo' => 0,
                        'salida' => Carbon::now()->toDateTimeString(),
                        'salida_tentativa' => $salida_tentativa,
                        'estado' => 'INGRESO'
                    ]);
                    return response()->json([
                        'tiempo_transcurrido' => 0,
                        'type' => 'info',
                        'observacion' => "Su estancia es de {$qr->tiempo} minutos"
                    ]);
                }
            } else {
                Historial::create([
                    'qr_id' => $qr['id'],
                    'nombre' => $qr['codqr'],
                    'ingreso' => Carbon::now()->toDateTimeString(),
                    'tiempo' => 0,
                    'salida' => Carbon::now()->toDateTimeString(),
                    'salida_tentativa' => $salida_tentativa,
                    'estado' => 'INGRESO'
                ]);
                return response()->json([
                    'tiempo_transcurrido' => 0,
                    'type' => 'info',
                    'observacion' => "Su estancia es de {$qr->tiempo} minutos"
                ]);
            }
        } else {
            return response()->json([
                'tiempo_transcurrido' => 0,
                'type' => 'error',
                'observacion' => 'Codigo no valido'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);
        if (!empty($params_array)) {
            $validate = Validator::make($params_array, [
                'qr_id' => 'required',
                'nombre' => 'required',
                'ingreso' => 'required',
                'salida' => 'required',
                'salida_tentativa' => 'required',
                'tiempo' => 'required',
                'estado' => 'required'
            ]);
            if ($validate->fails()) {
                $data = array('code' => 400, 'status' => 'error', 'message' => 'No se ha guardado la historia');
            } else {
                unset($params_array['id']);
                unset($params_array['created_at']);
                unset($params_array['updated_at']);
                $historia = Historial::where('id', '=', $id)->update($params_array);
                $data = array('code' => 200, 'status' => 'success', 'qr' => $historia);
            }
        } else {
            $data = array('code' => 400, 'status' => 'error', 'message' => 'No has enviado ningun dato');
        }
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request)
    {
        $historia = Historial::where('id', $id)->first();
        if (!empty($historia)) {
            $historia->delete();
            $data = array('code' => 200, 'status' => 'success', 'historia' => $historia);
        } else {
            $data = array('code' => 404, 'status' => 'error', 'message' => 'Qr no encontrado');
        }
        return response()->json($data, $data['code']);
    }
}

