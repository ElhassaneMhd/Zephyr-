<?php

namespace App\Http\Middleware;

use App\Models\Centre;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Traits\Refactor;


class HandleInertiaRequests extends Middleware
{
    use Refactor;
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
       if( auth()->check()){
           if( $request->user()->isSuperAdmin == "true") {
               $centres = Centre::all();
                $allCentres = [];
                foreach ($centres as $c){
                    $allCentres[] = ["id"=>$c->id, "name"=>$c->name];
                }
            }
            $mainCentre = ["id"=>$request->user()->centre->id, "name"=>$request->user()->centre->name];
        }
        return array_merge(parent::share($request), [
            'auth' => auth()->check() ? ([
                "id" => $request->user()->id,
                "name" => $request->user()->name,
                "email" => $request->user()->email,
                "isSuperAdmin" => $request->user()->isSuperAdmin,
                "mainCentre" => $mainCentre,
                "centres" => $allCentres??[],
            ]) : null,
            ]
        );
    }
}
