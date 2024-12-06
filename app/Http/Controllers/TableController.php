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
        if ($user->isSuperAdmin == 'true'){
            $centres = Centre::all();
            foreach ($centres as $centre){
                if ($centre->tables->count() !== 0){
                    $tables[$centre->name] = $this->refactorManyElements($centre->tables, 'tables');
                }
            }
        }else{
            $allTables = $user->centre->tables;
            $tables = $this->refactorManyElements($allTables, 'tables');
        }
        return response()->json($tables);
    }

    public function getGenerale()
    {
        $user = auth()->user();
        $general = $user->centre->tables->where('counter', 'general')??[];
        $tables = $this->refactorManyElements($general, 'tables');
        return Inertia::render('Electricite/General',compact('tables'));
    }
    public function getDivisional()
    {
        $user = auth()->user();
        $general = $user->centre->tables->where('counter', 'divisional')??[];
        $tables = $this->refactorManyElements($general, 'tables');
        return Inertia::render('Electricite/Divisional',compact('tables'));
    }

    public function store(Request $request)
    {
        $centre = $request->user()->centre;
        $data =$request->validate([
            'table_name' => 'required',
            'name' => 'required',
            'date' => 'required',
            'index' => 'required|numeric',
            'puissance' => 'required|numeric',
            'consummation' => 'required|numeric',
            'counter' => 'required|in:general,divisional',
            'cos' => 'required|numeric',
        ]);
        $data['centre_id'] = $centre->id;
        Table::create(attributes: $data);
        return redirect()->back();
    }
    public function update(Request $request, $id)
    {
        $table = Table::findOrFail($id);
        $request->validate([
            'date' => 'required|date',
            'index' => 'required|numeric',
            'puissance' => 'required|numeric',
            'consummation' => 'required|numeric',
            "cos" => 'required|numeric',
        ]);
        $table->update($request->all());
        return redirect()->back();
    }
    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();
        return redirect()->back();
    }
    public function notFound()
    {
        return Inertia::render('UnderConstruction');
    }
}
