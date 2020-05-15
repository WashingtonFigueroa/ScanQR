<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pedido extends Model
{
    use SoftDeletes;

    protected $table = "pedidos";
    protected $primaryKey = 'pedido_id';

    protected $dates = ['deleted_at'];

    // public function salicitud()
    // {
    //     return $this->belongsTo('App\Solicitud', 'solicitud_id');
    // }

    // public function parametro()
    // {
    //     return $this->belongsTo('App\Parametro', 'parametro_id');
    // }  
}
