<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Beneficio extends Model
{
    use SoftDeletes;
    protected $table = "beneficios";    
    protected $primaryKey = 'beneficio_id';

    protected $dates=['deleted_at'];
    
    public function empresa()
    {
        return $this->belongsTo('App\Empresa', 'empresa_id');
    }
}
