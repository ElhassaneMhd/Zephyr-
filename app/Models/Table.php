<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
 protected $fillable = [
        'table_name',
        'name',
        'date',
        'index',
        'consummation',
        'puissance',
        'cos',
        'centre_id',
        'counter'
    ];
     public function centre()
    {
        return $this->belongsTo(Centre::class);
    }
}
