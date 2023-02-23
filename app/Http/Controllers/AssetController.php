<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AssetController extends Controller
{
    public function serve($path)
    {
        return response()->file(public_path('assets/' . $path));
    }
}