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
            $tables = [];
            foreach ($centres as $centre){
                $tables[$centre->name][] = $centre->tables;
            }
        }else{
            $tables = $user->centre->tables;
        }
            return Inertia::render('Tables',compact('tables'));
    }
    public function create()
    {
        //
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
            'compteur' => 'required,in:general,divisionnel',
        ]);
        Table::create($request->all());
    }

    public function show(Table $table)
    {
        //
    }

    public function edit(Table $table)
    {
        //
    }

    public function update(Request $request, Table $table)
    {
        //
    }

    public function destroy(Table $table)
    {
        //
    }
}
