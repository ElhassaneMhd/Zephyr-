<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historic extends Model
{
    /** @use HasFactory<\Database\Factories\HistoricFactory> */
    use HasFactory;

    protected $fillable = [
        'table_id',
        'date',
        'index'
    ];
    public function table()
    {
        return $this->belongsTo(Table::class);
    }
}
