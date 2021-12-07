<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as Req;
use App\Http\Resources\RequestResource;

class RequestController extends Controller
{
    
    private $pagination_no = 10;
    
    public function index()
    {
        $reqs = Req::leftJoin('files', 'requests.file_id', '=', 'files.file_id')
                    ->leftJoin('users', 'requests.user_id', '=', 'users.user_id')
                    ->paginate($this->pagination_no);

        return RequestResource::collection($reqs);
    }

    public function show($id)
    { 
        return new RequestResource(Req::findOrFail($id));
    }

    public function search(Request $request)
    {
        $request->validate([
            'keyword' 		         => 	'required|string|min:2',
        ]);

        $reqs = Req::where('requests.description', 'like', '%' . $request->keyword . '%')
                ->orWhere('filename', 'like', '%' . $request->keyword . '%')
                ->orWhere('code', 'like', '%' . $request->keyword . '%')
                ->orWhere('name', 'like', '%' . $request->keyword . '%')
                ->leftJoin('files', 'requests.file_id', '=', 'files.file_id')
                ->leftJoin('users', 'requests.user_id', '=', 'users.user_id')
                ->paginate($this->pagination_no);

        return RequestResource::collection($reqs);
    }

    private function validation(Request $request)
    {
        $request->validate([
            'description' 		 =>     'required|string',
            'request_date' 		 =>     'required|date',
            'status' 		     => 	'required|alpha_num',
            'file_id' 		     =>     'required|numeric',
            'user_id' 		     =>     'numeric',
        ]);
    }

    public function store(Request $request)
    {
        $this->validation($request);

        $req = Req::create($request->all());

        return new RequestResource($req);
    }

    public function update(Request $request, $id)
    {
        $this->validation($request);

        $req = Req::findOrFail($id);
 
        $req->update($request->all());

        return new RequestResource($req);
    }
    
    public function destroy($id)
    {
        $req = Req::findOrFail($id);

        if($req->delete())
            return new RequestResource($req);
    }
    
}
