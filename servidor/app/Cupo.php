<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cupo extends Model
{
    use SoftDeletes;

    protected $table = 'cupos';
    protected $fillable = [
        'establecimiento_id',
        'paquete_id',
        'carga',
        'gasto',
        'saldo',
        'fecha_fin',
        'estado'
    ];
    protected $dates = ['deleted_at'];
    protected $appends = ['establecimiento', 'paquete'];

    public function getPaqueteAttribute()
    {
        return Paquete::find($this->paquete_id)->cupo;
    }

    public function establecimiento()
    {
        return $this->belongsTo('App\Establecimiento', 'id');
    }

    public function getEstablecimientoAttribute()
    {
        return Establecimiento::find($this->establecimiento_id)->nombre;
    }
}
