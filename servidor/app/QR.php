<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QR extends Model
{
    use SoftDeletes;

    protected $table = 'qrs';
    protected $fillable = [
        'user_id ',
        'codqr',
        'nombre',
        'tiempo',
        'estado'
    ];
    protected $dates = ['deleted_at'];

    public function historias()
    {
        return $this->hasMany('App\Historial');
    }
}
