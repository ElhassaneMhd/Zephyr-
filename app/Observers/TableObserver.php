<?php
namespace App\Observers;

use App\Models\Table;
use App\Models\Historic;

class TableObserver {
public function created(Table $table): void
    {
        $historic = new Historic();
        $historic->table_id = $table->id;
        $historic->index = $table->index;
        $historic->date = $table->date;
        $historic->save();

    }

    public function updated(Table $table): void
    {
        $historic = new Historic();
        $historic->table_id = $table->id;
        $historic->index = $table->index;
        $historic->date = $table->date;
        $historic->save();
    }
}
