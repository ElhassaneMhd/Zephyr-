<?php

namespace App\Traits;

trait Get
{

        protected function getCounters($elements){
            $user = auth()->user();
            $counter = $user->centre->tables->where('counter', $elements)??[];
            return $this->refactorManyElements($counter, 'tables');
        }

}
