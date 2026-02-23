<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function hello()
    {
        return response()->json([
            'message' => 'Hello from Laravel Backend! 🚀',
            'timestamp' => now()->toDateTimeString(),
            'status' => 'success'
        ]);
    }

    public function users()
    {
        $users = [
            [
                'id' => 1,
                'name' => 'John Doe',
                'email' => 'john@example.com'
            ],
            [
                'id' => 2,
                'name' => 'Jane Smith',
                'email' => 'jane@example.com'
            ],
            [
                'id' => 3,
                'name' => 'Bob Johnson',
                'email' => 'bob@example.com'
            ],
            [
                'id' => 4,
                'name' => 'Alice Williams',
                'email' => 'alice@example.com'
            ]
        ];

        return response()->json($users);
    }

    public function health()
    {
        return response()->json([
            'status' => 'healthy',
            'service' => 'Laravel API',
            'version' => app()->version(),
            'timestamp' => now()->toDateTimeString()
        ]);
    }
}
