<?php

namespace App\Http\Controllers;

use App\Models\Centre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CentreController extends Controller
{

    public function index(){
        $centres = Centre::all();
        return Inertia::render('Centres',compact('centres'));
    }

    public function create()
    {

    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        Centre::create($request->all());
        return to_route('centres.index');
    }
    public function show(Centre $centre)
    {

    }


    public function edit(Centre $centre)
    {
        //
    }


    public function update(Request $request,$id)
    {
        $centre = Centre::findOrFail($id);
        $request->validate([
            'name' => 'required',
        ]);
        $centre->update($request->all());
        return to_route('centres.index');
    }

    public function destroy($id)
    {
        $centre = Centre::findOrFail($id);
        $centre->delete();
        return to_route('centres.index');
    }
}
