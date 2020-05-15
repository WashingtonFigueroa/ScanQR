<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Solicitud extends Model
{
    use SoftDeletes;

    protected $table = "solicitudes";
    protected $primaryKey = 'solicitud_id';
    
    protected $dates = ['deleted_at'];

    public function pedidos()
    {
        return $this->hasMany('App\Pedido');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function estado()
    {
        return $this->belongsTo('App\Tipo_Estado', 'tipo_estado_id');
    }
}
