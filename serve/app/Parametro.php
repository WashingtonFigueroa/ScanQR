<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Parametro extends Model
{
    use SoftDeletes;
    protected $table = "parametros";    
    protected $primaryKey = 'parametro_id';

    protected $dates=['deleted_at'];
    
    public function pedidos()
    {
        return $this->hasMany('App\Pedido');
    }
}
