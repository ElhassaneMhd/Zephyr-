<?php

namespace App\Http\Controllers;

use App\Models\Centre;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        if ($user->isSuperAdmin === 'true'){
            $centres = Centre::all();
            $allTables = [];
            foreach ($centres as $centre){
                $allTables[$centre->name][] = $centre->tables;
            }
        }else{
            $allTables = $user->centre->tables;
        }
        $tables = $this->refactorManyElements($allTables, 'tables');
            return Inertia::render('Electricite/generalCounter',compact('tables'));
    }

    public function getGenerale()
    {
        $user = auth()->user();
        $general = $user->centre->tables->where('counter', 'general');
        $tables = $this->refactorManyElements($general, 'tables');
        return Inertia::render('Electricite/generalCounter',compact('tables'));
    }
    public function getDivisional()
    {
        $user = auth()->user();
        $divisional = $user->centre->tables->where('counter', 'divisional');
        $tables = $this->refactorManyElements($divisional, 'tables');
        return Inertia::render('Electricite/divisionalCounter',compact('tables'));
    }
    public function store(Request $request)
    {
        $request->validate([
            'table_name' => 'required',
            'name' => 'required',
            'date' => 'required,date',
            'index' => 'required,numeric',
            'consummation' => 'required,numeric',
            'centre_id' => 'required,exists:centres,id',
            'counter' => 'required,in:general,divisional',
        ]);
        Table::create($request->all());
            return to_route(route: 'tables');
    }


    public function update(Request $request, $id)
    {
        $table = Table::findOrFail($id);
        $request->validate([
            'table_name' => 'required',
            'name' => 'required',
            'date' => 'required,date',
            'index' => 'required,numeric',
            'consummation' => 'required,numeric',
            'centre_id' => 'required,exists:centres,id',
            'counter' => 'required,in:general,divisional',
        ]);
        $table->update($request->all());
        return to_route(route: 'tables');

    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();
    }
}
