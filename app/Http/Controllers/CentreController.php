<?php

namespace App\Http\Controllers;

use App\Models\Centre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CentreController extends Controller
{

    public function index(){
        $allCentres = Centre::all();
        $centres = $this->refactorManyElements($allCentres,'centres');
        return response()->json($centres);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        Centre::create($request->all());
        return to_route('centres.index');
    }

    public function getAccess($id){
        $user = auth()->user();
        $user->centre_id = $id;
        $user->save();
        return back();
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
