<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //
    protected $fillable = [
        'user_id','name','sex','date_of_birth',
    ];
    public function user (){
        return $this->belongsTo(User::class);
    }
}
