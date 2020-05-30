<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Historial extends Model
{
    use SoftDeletes;

    protected $table = 'historiales';
    protected $fillable = [
        'qr_id',
        'user_id',
<<<<<<< HEAD
=======
        'cupo_id',
>>>>>>> b3e8ecb024ed5a1f8602dbc00bf6731e59598895
        'nombre',
        'ingreso',
        'salida',
        'salida_tentativa',
        'tiempo',
        'estado',
    ];
    protected $dates = ['deleted_at'];

    public function qr()
    {
        return $this->belongsTo('App\QR', 'id');
    }
}
