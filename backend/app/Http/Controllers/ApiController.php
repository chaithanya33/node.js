<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function hello()
    {
        return response()->json([
            "message" => "Backend connected successfully 🚀"
        ]);
    }

    public function users()
    {
        return response()->json([
            [
                "id" => 1,
                "name" => "John Doe",
                "email" => "john@example.com"
            ]
        ]);
    }

    public function health()
    {
        return response()->json([
            "status" => "OK"
        ]);
    }
}
