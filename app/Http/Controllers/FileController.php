<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use App\Http\Resources\FileResource;

class FileController extends Controller
{

    private $pagination_no = 10;
    
    public function index()
    {
        $files = File::paginate($this->pagination_no);

        return FileResource::collection($files);
    }

    public function show($id)
    { 
        return new FileResource(File::findOrFail($id));
    }

    public function search(Request $request)
    {
        $request->validate([
            'keyword' 		         => 	'required|string|min:2',
        ]);

        $files = File::where('filename', 'like', '%' . $request->keyword . '%')
                ->orWhere('code', 'like', '%' . $request->keyword . '%')
                ->orWhere('slug', 'like', '%' . $request->keyword . '%')
                ->orWhere('description', 'like', '%' . $request->keyword . '%')
                ->paginate($this->pagination_no);

        return FileResource::collection($files);
    }

    private function validation(Request $request)
    {
        $request->validate([
            'code' 		         => 	'required|alpha_num',
            'filename' 		     =>     'required|string',
            'slug' 		         => 	'required|string|max:24',
            'description' 		 =>     'required|string',
            'user_id' 		     =>     'required|numeric',
        ]);
    }

    public function store(Request $request)
    {
        $this->validation($request);

        $file = File::create($request->all());

        return new FileResource();
    }

    public function update(Request $request, $id)
    {
        $this->validation($request);

        $file = File::findOrFail($id);
 
        $file->update($request->all());

        return new FileResource($file);
    }
    
    public function destroy($id)
    {
        $file = File::findOrFail($id);

        if($file->delete())
            return new FileResource($file);
    }

}