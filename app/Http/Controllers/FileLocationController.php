<?php

namespace App\Http\Controllers;

use App\Models\FileLocation;
use Illuminate\Http\Request;
use App\Http\Resources\FileLocationResource;

class FileLocationController extends Controller
{
    
    private $pagination_no = 10;
    
    public function index()
    {
        $files = FileLocation::leftJoin('files', 'files.file_id', '=', 'file_locations.file_id')
                ->paginate($this->pagination_no);

        return FileLocationResource::collection($files);
    }

    public function show($id)
    { 
        return new FileLocationResource(FileLocation::findOrFail($id));
    }

    public function search(Request $request)
    {
        $request->validate([
            'keyword' 		         => 	'required|string|min:2',
        ]);

        $files = FileLocation::where('filename', 'like', '%' . $request->keyword . '%')
                ->orWhere('file_location', 'like', '%' . $request->keyword . '%')
                ->leftJoin('files', 'files.file_id', '=', 'file_locations.file_id')
                ->paginate($this->pagination_no);

        return FileLocationResource::collection($files);
    }

    private function validation(Request $request)
    {
        $request->validate([
            'file_location'         => 	'required|string',
            'retention_date' 		=>  'required|date',
            'file_id' 		        =>  'required|numeric',
        ]);
    }

    public function store(Request $request)
    {
        $this->validation($request);

        $file = FileLocation::create($request->all());

        return new FileLocationResource($file);
    }

    public function update(Request $request, $id)
    {
        $this->validation($request);

        $file = FileLocation::findOrFail($id);
 
        $file->update($request->all());

        return new FileLocationResource($file);
    }
    
    public function destroy($id)
    {
        $file = FileLocation::findOrFail($id);

        if($file->delete())
            return new FileLocationResource($file);
    }

}
