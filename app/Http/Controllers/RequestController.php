<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as Req;
use App\Http\Resources\RequestResource;
use Illuminate\Support\Facades\Storage;

class RequestController extends Controller
{
    
    private $pagination_no = 10;
    
    public function index()
    {
        $reqs = Req::leftJoin('files', 'requests.file_id', '=', 'files.file_id')
                    ->leftJoin('users', 'requests.user_id', '=', 'users.user_id')->get();
                    /* ->paginate($this->pagination_no); */

        return RequestResource::collection($reqs);
    }

    public function show($id)
    {
        
        $file = Req::findOrFail($id);
        $filename = $file->request_form;
        $contents = Storage::url('request/'.$filename);
        $extension = pathinfo(storage_path('request/'.$filename), PATHINFO_EXTENSION);
        $data = array('request_id' => $id, 'filecontent' => $contents, 'filetype' => $extension);

        return response($data);

        //return new RequestResource(Req::findOrFail($id));
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
            'request_form'       => 	'required|mimes:pdf|max:2048',
            'expiration_date'    =>     'required|date',
            'status' 		     => 	'required|alpha_num',
            'file_id' 		     =>     'required|numeric',
            'user_id' 		     =>     'numeric',
        ]);
    }

    public function store(Request $request)
    {
        $this->validation($request);

        if($request->hasFile('request_form')) {


            $request_form = $request->file('request_form');
            $request_name = $request_form->getClientOriginalName();
            $request_form->storePubliclyAs('public/request',$request_name);

            $req = Req::create([
                'file_id' => $request->file_id,
                'request_form' => $request_name,
                'request_date' => $request->request_date,
                'description' => $request->description,
                'status' => $request->status,
                'expiration_date' => $request->expiration_date,
                'user_id' => $request->user_id,
            ]);
            return new RequestResource($req);

        }





        /* $req = Req::create($request->all());

        return new RequestResource($req); */
    }

    public function update(Request $request, $id)
    {
        //$this->validation($request);

        $req = Req::findOrFail($id);

        $req->status = $request->status;
        $req->expiration_date = $request->expiration_date;
        $req->save();

        return new RequestResource($req);
    }
    
    public function destroy($id)
    {
        $req = Req::findOrFail($id);

        if($req->delete())
            return new RequestResource($req);
    }


    public function destroyRecords(Request $request)
    {
        $ids = $request;
        $req = Req::whereIn('request_id',$ids)->delete();
        
        return response($req);

    }
    
}
