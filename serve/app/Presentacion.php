<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Presentacion extends Model
{
    use SoftDeletes;

    protected $table = "presentaciones";
    protected $primaryKey = 'presentacion_id';

    protected $dates = ['deleted_at'];

    public function productos()
    {
        return $this->hasMany('App\Producto');
    }
}
