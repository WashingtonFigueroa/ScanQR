<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QR extends Model
{
    use SoftDeletes;

    protected $table = 'qrs';
    protected $fillable = [
        'qr',
        'nombre',
        'tiempo',
        'estado'
    ];
    protected $dates = ['deleted_at'];
}
