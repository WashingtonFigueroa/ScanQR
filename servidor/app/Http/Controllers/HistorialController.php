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
        $establecimiento_id = Auth::user()->establecimiento_id;
        if ($establecimiento_id == 1) {
            $historial = Historial::whereDate('created_at', Carbon::now()->toDateString())
                ->orderBy('id', 'desc')->get();
            return response()->json($historial, 200);
        } else {
            $users_id = User::where('establecimiento_id', $establecimiento_id)->pluck('id');
            $historial = Historial::whereDate('created_at', Carbon::now()->toDateString())
                ->whereIn('user_id', $users_id)
                ->orderBy('id', 'desc')->get();
            return response()->json($historial, 200);
        }
    }

    public function cerrarEstablecimiento()
    {
        $establecimiento_id = Auth::user()->establecimiento_id;
        $cupo_ids = Cupo::where('establecimiento_id', $establecimiento_id)
            ->whereDate('fecha_fin', '>=', Carbon::now()->toDateString())
            ->pluck('id');
        $historiales = Historial::whereIn('cupo_id', $cupo_ids)
            ->whereRaw('historiales.ingreso = historiales.salida')
            ->update([
                'salida' => Carbon::now()->toDateTimeString(),
                'estado' => 'SALIDA'
            ]);
        $historiales2 = Historial::whereIn('cupo_id', $cupo_ids)
            ->whereRaw('historiales.ingreso = historiales.salida')
            ->get();
        $data = [];
        foreach ($historiales2 as $historial) {
            $historial['tiempo'] = (int)Carbon::parse($historial['salida'])->diffInMinutes(Carbon::parse($historial['ingreso']));
            array_push($data, $historial);
        }
        return response()->json($data, 200);
    }

    public function stats()
    {
        $establecimiento_id = Auth::user()->establecimiento_id;
        $users_id = User::where('establecimiento_id', $establecimiento_id)->pluck('id');

        $ingreso = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->whereIn('user_id', $users_id)
            ->where('estado', 'INGRESO')
            ->distinct('qr_id')
            ->count();
        $salida_retraso = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->whereIn('user_id', $users_id)
            ->where('estado', '<>', 'INGRESO')
            ->where('estado', '<>', 'SALIDA')
            ->count();
        return response()->json([
            'ingreso' => $ingreso,
            'salida_retraso' => $salida_retraso,
        ], 200);
    }

    public function ingresosHoy()
    {
        $establecimiento_id = Auth::user()->establecimiento_id;
        $users_id = User::where('establecimiento_id', $establecimiento_id)->pluck('id');
        $ingresos = Historial::whereDate('created_at', Carbon::now()->toDateString())
            ->whereIn('user_id', $users_id)
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

        $establecimiento_id = Auth::user()->establecimiento_id;
        $users_id = User::where('establecimiento_id', $establecimiento_id)->pluck('id');
        if ($establecimiento_id == 1) {
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
        } else {
            switch ($input['estado']) {
                case 'INGRESO':
                    $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                        ->whereIn('user_id', $users_id)
                        ->where('estado', '=', 'INGRESO')
                        ->where('nombre', 'like', "%{$input['codigo']}%")
                        ->get();
                    break;
                case 'SALIDA':
                    $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                        ->whereIn('user_id', $users_id)
                        ->where('estado', '=', 'SALIDA')
                        ->where('nombre', 'like', "%{$input['codigo']}%")
                        ->get();
                    break;
                case 'RETRASO':
                    $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                        ->whereIn('user_id', $users_id)
                        ->where('estado', '<>', 'INGRESO')
                        ->where('estado', '<>', 'SALIDA')
                        ->where('nombre', 'like', "%{$input['codigo']}%")
                        ->get();
                    break;
                case 'TODOS':
                    $response = Historial::whereBetween('created_at', [$input['desde'], $input['hasta']])
                        ->whereIn('user_id', $users_id)
                        ->where('nombre', 'like', "%{$input['codigo']}%")
                        ->get();
                    break;
            }
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
        $ahora = Carbon::now()->toDateTimeString();
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
                                $historial2->estado = "SALIDA-RETRASO {$tiempo2} MIN.";
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
                                    'ingreso' => $ahora,
                                    'tiempo' => 0,
                                    'salida' => $ahora,
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
                                'ingreso' => $ahora,
                                'tiempo' => 0,
                                'salida' => $ahora,
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
                                'ingreso' => $ahora,
                                'tiempo' => 0,
                                'salida' => $ahora,
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
                            'ingreso' => $ahora,
                            'tiempo' => 0,
                            'salida' => $ahora,
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

    public function cargaGastoSaldo()
    {
        $tecnico_id = Auth::id();
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
            return [
                'carga' => $cupoSeleccionado['carga'],
                'gasto' => $cupoSeleccionado['gasto'],
                'saldo' => $cupoSeleccionado['saldo']
            ];
        } else {
            return [
                'carga' => 0,
                'gasto' => 0,
                'saldo' => 0
            ];
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

