<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tipo_Estado extends Model
{
    use SoftDeletes;

    protected $table = "tipo_estados";
    protected $primaryKey = 'tipo_estado_id';

    protected $dates = ['deleted_at'];

    public function solicitudes()
    {
        return $this->hasMany('App\Solicitud');
    }
}
