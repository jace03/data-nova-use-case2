<?php

namespace App\Http\Controllers\Api;

use App\Models\LeaveRequests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    public function index()
    {
        $leaveRequests = LeaveRequests::all();

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
}
