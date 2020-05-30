<?php

namespace App\Http\Controllers;

use App\Cupo;
use App\Historial;
use App\QR;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class HistorialController extends Controller
{
    public function index()
    {
        $historial = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->orderBy('id', 'desc')->get();
        return response()->json($historial, 200);
    }

    public function stats()
    {
         $habilitados = QR::where('estado', 'Activo')->count();
        // $habilitados = Cupo::whereDate('created_at', Carbon::now()->toDateString())
        // ->where('estado', 'INGRESO')
        // ->distinct('qr_id')
        // ->count();

        $ingreso = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->where('estado', 'INGRESO')
            ->distinct('qr_id')
            ->count();
        $salida = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->where('estado', 'SALIDA')
            ->count();
        $salida_retraso = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->where('estado', '<>', 'INGRESO')
            ->where('estado', '<>', 'SALIDA')
            ->count();
        return response()->json([
            'habilitados' => $habilitados,
            'ingreso' => $ingreso,
            'salida' => $salida,
            'salida_retraso' => $salida_retraso,
        ], 200);
    }

    public function ingresosHoy()
    {
        $establecimiento  = Auth::establecimiento_id();
      echo $establecimiento;

        $ingresos = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->where('estado', 'INGRESO')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($ingresos, 200);
    }

    public function buscarHistorial()
    {
        $input = \request()->all();
        $input['hasta'] = Carbon::parse($input['hasta'])->addDay();
        $response = null;
        switch ($input['estado']) {
            case 'INGRESO':
                $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                    ->where('estado', '=', 'INGRESO')
                    ->where('nombre', 'like', "%{$input['codigo']}%")
                    ->get();
                break;
            case 'SALIDA':
                $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                    ->where('estado', '=', 'SALIDA')
                    ->where('nombre', 'like', "%{$input['codigo']}%")
                    ->get();
                break;
            case 'RETRASO':
                $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                    ->where('estado', '<>', 'INGRESO')
                    ->where('estado', '<>', 'SALIDA')
                    ->where('nombre', 'like', "%{$input['codigo']}%")
                    ->get();
                break;
            case 'TODOS':
                $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                    ->where('nombre', 'like', "%{$input['codigo']}%")
                    ->get();
                break;
        }
        return response()->json($response, 200);
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
        $currentTime = Carbon::now();
        if (Historial::count() > 0) {
            $latest = Historial::orderBy('id', 'desc')->first()->updated_at;
            if ($currentTime->diffInSeconds(Carbon::parse($latest)) > 5) {
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
                            $historial2 = Historial::find($historial['id']);
                            $historial2->user_id = Auth::id();
                            $historial2->estado = 'SALIDA';
                            $historial2->salida = Carbon::now()->toDateTimeString();
                            $historial2->tiempo = (int)Carbon::now()->diffInMinutes(Carbon::parse($historial2->ingreso));
                            $historial2->save();
                            if ($qr->tiempo >= $historial2->tiempo) {
                                $tiempo = $qr->tiempo - $historial2->tiempo;
                                return response()->json([
                                    'tiempo_transcurrido' => $historial2->tiempo,
                                    'type' => 'success',
                                    'observacion' => 'En hora, le quedaban ' . $tiempo . ' minutos restantes'
                                ]);
                            } else {
                                $tiempo2 = $historial2->tiempo - $qr->tiempo;
                                $historial2->user_id = Auth::id();
                                $historial2->estado = "SALIDA CON RETRASO DE {$tiempo2} MIN.";
                                $historial2->save();
                                return response()->json([
                                    'tiempo_transcurrido' => $historial2->tiempo,
                                    'type' => 'warning',
                                    'observacion' => 'Con retraso de ' . $tiempo2 . ' minutos'
                                ]);
                            }
                        } else {
                            $buscarCupo = $this->buscarCupo(Auth::id());
                            if ($buscarCupo !== false) {
                                Historial::create([
                                    'qr_id' => $qr['id'],
                                    'user_id' => Auth::id(),
                                    'cupo_id' => $buscarCupo,
                                    'nombre' => $qr['nombre'],
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
                            } else {
                                return response()->json([
                                    'tiempo_transcurrido' => 0,
                                    'type' => 'error',
                                    'observacion' => 'No hay cupos disponibles, no puede ingresar aún.'
                                ]);
                            }
                        }
                    } else {
                        $buscarCupo = $this->buscarCupo(Auth::id());
                        if ($buscarCupo !== false) {
                            Historial::create([
                                'qr_id' => $qr['id'],
                                'user_id' => Auth::id(),
                                'cupo_id' => $buscarCupo,
                                'nombre' => $qr['nombre'],
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
                        } else {
                            return response()->json([
                                'tiempo_transcurrido' => 0,
                                'type' => 'error',
                                'observacion' => 'No hay cupos disponibles, no puede ingresar aún.'
                            ]);
                        }
                    }
                } else {
                    return response()->json([
                        'tiempo_transcurrido' => 0,
                        'type' => 'error',
                        'observacion' => 'Codigo no valido'
                    ]);
                }
            } else {
                return response()->json([
                    'tiempo_transcurrido' => 0,
                    'type' => 'timeout',
                    'observacion' => 'Espere unos segundos...'
                ]);
            }
        } else {
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
                        $historial2 = Historial::find($historial['id']);
                        $historial2->estado = 'SALIDA';
                        $historial2->user_id = Auth::id();
                        $historial2->salida = Carbon::now()->toDateTimeString();
                        $historial2->tiempo = (int)Carbon::now()->diffInMinutes(Carbon::parse($historial2->ingreso));
                        $historial2->save();
                        if ($qr->tiempo >= $historial2->tiempo) {
                            $tiempo = $qr->tiempo - $historial2->tiempo;
                            return response()->json([
                                'tiempo_transcurrido' => $historial2->tiempo,
                                'type' => 'success',
                                'observacion' => 'En hora, le quedaban ' . $tiempo . ' minutos restantes'
                            ]);
                        } else {
                            $tiempo2 = $historial2->tiempo - $qr->tiempo;
                            $historial2->user_id = Auth::id();
                            $historial2->estado = "SALIDA CON RETRASO DE {$tiempo2} MIN.";
                            $historial2->save();
                            return response()->json([
                                'tiempo_transcurrido' => $historial2->tiempo,
                                'type' => 'warning',
                                'observacion' => 'Con retraso de ' . $tiempo2 . ' minutos'
                            ]);
                        }
                    } else {
                        $buscarCupo = $this->buscarCupo(Auth::id());
                        if ($buscarCupo !== false) {
                            Historial::create([
                                'qr_id' => $qr['id'],
                                'user_id' => Auth::id(),
                                'cupo_id' => $buscarCupo,
                                'nombre' => $qr['nombre'],
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
                        } else {
                            return response()->json([
                                'tiempo_transcurrido' => 0,
                                'type' => 'error',
                                'observacion' => 'No hay cupos disponibles, no puede ingresar aún.'
                            ]);
                        }
                    }
                } else {
                    $buscarCupo = $this->buscarCupo(Auth::id());
                    if ($buscarCupo !== false) {
                        Historial::create([
                            'qr_id' => $qr['id'],
                            'user_id' => Auth::id(),
                            'cupo_id' => $buscarCupo,
                            'nombre' => $qr['nombre'],
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
                    } else {
                        return response()->json([
                            'tiempo_transcurrido' => 0,
                            'type' => 'error',
                            'observacion' => 'No hay cupos disponibles, no puede ingresar aún.'
                        ]);
                    }
                }
            } else {
                return response()->json([
                    'tiempo_transcurrido' => 0,
                    'type' => 'error',
                    'observacion' => 'Codigo no valido'
                ]);
            }
        }
    }

    private function buscarCupo($tecnico_id)
    {
        $establecimiento_id = User::find($tecnico_id)->establecimiento_id;
        $hoy = Carbon::now()->toDateString();
        $existenCupos = Cupo::where('establecimiento_id', $establecimiento_id)
            ->where('estado', 1)
            ->where('saldo', '>', 0)
            ->whereDate('fecha_fin', '>=', $hoy)
            ->exists();
        if ($existenCupos) {
            $cupoSeleccionado = Cupo::where('establecimiento_id', $establecimiento_id)
                ->where('estado', 1)
                ->where('saldo', '>', 0)
                ->whereDate('fecha_fin', '>=', $hoy)
                ->first();
            $cupoActualizar = Cupo::find($cupoSeleccionado->id);
            $cupoActualizar->gasto = $cupoActualizar->gasto + 1;
            $cupoActualizar->saldo = $cupoActualizar->saldo - 1;
            $cupoActualizar->save();
            return $cupoSeleccionado->id;
        } else {
            return false;
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

