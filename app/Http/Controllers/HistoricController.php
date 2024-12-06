<?php

namespace App\Http\Controllers;

use App\Models\Historic;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricController extends Controller
{
    public function index($counter, $id)
    {
        $table = Table::findOrFail($id);
        $historic = $table->historics;
        if ($counter === 'general') {
            $tables = $this->getCounters('general');
            return Inertia::render('Electricite/General', compact('tables', 'history'));
        }
        $tables = $this->getCounters('divisional');
        return Inertia::render('Electricite/Divisional', compact('tables', 'history'));
    }

    public function destroy($id)
    {
        $historic = Historic::findOrFail($id);
        $historic->delete();
        return to_route('historic', $historic->table_id);
    }
}
