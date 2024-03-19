<?php

namespace App\Http\Controllers\Api;

use App\Models\UpdateLeaveRequests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UpdateLeaveRequestController extends Controller
{ 

    public function index()
    {
        return response()->json("update Request");

        $request->validate([
            'field1' => 'required',
            'field2' => 'required',
            // Add more validation rules as needed
        ]);

         if($leaveRequests->count() > 0){
            
            return response()->json([
                'status' =>200,
                'leaverequest'=>$leaveRequests
            ], 200);
        }else {

            return response()->json([
                'status' =>400,
                'leaverequest'=>$leaveRequests
            ], 200);
        }
    }
    public function updateData(Request $request){
        die("updateData");
    }
}
