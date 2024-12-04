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
            return response()->json($tables);
        }else{
            $allTables = $user->centre->tables;
            $tables = $this->refactorManyElements($allTables, 'tables');
        }
        return Inertia::render('Electricite/generalCounter',compact('tables'));
    }

    public function getGenerale()
    {
        $user = auth()->user();
         if ($user->isSuperAdmin == 'true'){
            $centres = Centre::all();
            foreach ($centres as $centre) {
                $generalTables = $centre->tables->where('counter', 'general');
                if ($generalTables->count() !== 0) {
                    $tables[$centre->name] = $this->refactorManyElements($generalTables, 'tables');
                }
            }
        }else{
            $general = $user->centre->tables->where('counter', 'general');
            $tables = $this->refactorManyElements($general, 'tables');
        }
       return Inertia::render('Electricite/GeneralCounter',compact('tables'));
    }
    public function getDivisional()
    {
            $user = auth()->user();
         if ($user->isSuperAdmin == 'true'){
            $centres = Centre::all();
            foreach ($centres as $centre) {
                $divisionalTables = $centre->tables->where('counter', 'divisional');
                if ($divisionalTables->count() !== 0) {
                    $tables[$centre->name] = $this->refactorManyElements($divisionalTables, 'tables');
                }
            }
        }else{
            $general = $user->centre->tables->where('counter', 'divisional');
            $tables = $this->refactorManyElements($general, 'tables');
        }
        return Inertia::render('Electricite/DivisionalCounter',compact('tables'));

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
        return redirect()->back();
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
        return redirect()->back();

    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();
    }
}
