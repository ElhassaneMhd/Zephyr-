<?php

namespace App\Traits;

trait Refactor
{
    protected function refactorManyElements($elements, $data)
    {
        foreach ($elements as $element) {
            ($data === 'tables') && $all[] = $this->refactorTable($element);
            ($data === 'users') && $all[] = $this->refactorUser($element);
            ($data === 'centres') && $all[] = $this->refactorCentre($element);
        }
        return $all ?? [];
    }
    protected function refactorTable($table)
    {
        $centre = $table->centre;
        return [
            'id' => $table->id,
            'table_name' => $table->table_name,
            'name' => $table->name,
            'date' => $table->date,
            'index' => $table->index,
            'consummation' => $table->consummation,
            "cos" => $table->cos,
            "puissance" => $table->puissance,
            'centre_id' => $table->centre_id,
            'counter' => $centre->name,
            'created_at' => $table->created_at,
            'updated_at' => $table->updated_at,
        ];
    }
    protected function refactorUser($user)
    {
        $centre = $user->centre;
        return [
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
            "isSuperAdmin" => $user->isSuperAdmin,
            "centre" => $centre ? $this->refactorCentre($centre) : null,
            "created_at" => $user->created_at,
            "updated_at" => $user->updated_at,
        ];
    }
    protected function refactorCentre($centre)
    {
        $centre->load('tables');
        $allUsers = $centre->users;
        foreach ($allUsers as $user) {
            $users[] = [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
            ];
        }
        return [
            "id" => $centre->id,
            "name" => $centre->name,
            "created_at" => $centre->created_at,
            "updated_at" => $centre->updated_at,
            "users" => $users ?? [],
            "tables" => $this->refactorManyElements($centre->tables, 'tables'),
        ];
    }
}
