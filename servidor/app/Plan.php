<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

class Plan extends Model
{
    use SoftDeletes;

    protected $table = 'plans';
    protected $fillable = [
        'nombre',
        'detalle',
        'estado'
    ];
    protected $dates = ['deleted_at'];

}
