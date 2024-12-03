<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
 protected $fillable = [
        'table_name',
        'name',
        'date',
        'index',
        'consummation',
        'puissance',
        'cos',
        'centre_id',
        'compteur'
    ];
     public function centre()
    {
        return $this->belongsTo(Centre::class);
    }
}
