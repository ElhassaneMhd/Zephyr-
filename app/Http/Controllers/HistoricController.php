<?php

namespace App\Http\Controllers;

use App\Models\Historic;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricController extends Controller
{
    public function index($id)
    {
        $table = Table::findOrFail($id);
        $historic = $table->historics;
        return Inertia::render('Historic/Index', compact('historic', 'table'));
    }

    public function destroy($id)
    {
        $historic = Historic::findOrFail($id);
        $historic->delete();
        return to_route('historic', $historic->table_id);
    }
}
