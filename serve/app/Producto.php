<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use SoftDeletes;
    protected $table = "productos";    
    protected $primaryKey = 'producto_id';

    protected $dates=['deleted_at'];

    public function empresa()
    {
        return $this->belongsTo('App\Empresa', 'empresa_id');
    }
    
    public function presentacion()
    {
        return $this->belongsTo('App\Presentacion', 'presentacion_id');
    }
}
