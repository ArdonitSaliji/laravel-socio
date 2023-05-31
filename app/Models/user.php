<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'userId';
    protected $fillable = ['firstName', 'lastName', 'email', 'password', 'picturePath', 'location', 'occupation', 'viewedProfile', 'impressions', 'friends'];
    
    use HasFactory;
}