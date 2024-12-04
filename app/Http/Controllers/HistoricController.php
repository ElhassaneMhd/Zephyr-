<?php

namespace App\Http\Controllers;

use App\Models\Historic;
use App\Models\Table;
use Illuminate\Http\Request;

class HistoricController extends Controller
{
    public function index($id)
    {
        $table = Table::findOrFail($id);
        $historics = $table->historics;
        return response()->json($historics);

    }


    public function destroy($id)
    {
        $historic = Historic::findOrFail($id);
        $historic->delete();
        return response()->json(['message' => 'Historic deleted successfully']);
    }
}
