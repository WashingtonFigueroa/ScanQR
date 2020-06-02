<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

class Paquete extends Model
{
    use SoftDeletes;

    protected $table = 'paquetes';
    protected $fillable = [
        'plan_id',
        'cupo',
        'valor',
        'estado'
    ];
    protected $dates = ['deleted_at'];

    protected $appends = ['plan'];

    public function getPlanAttribute()
    {
        return Plan::find($this->plan_id)->nombre;
    }

}
