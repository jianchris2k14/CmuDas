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
        $files = FileLocation::leftJoin('files', 'files.file_id', '=', 'file_locations.file_id')->get();
/*         ->join('users','users.user_id', '=', 'files.user_id')
        ->select('users.name as name','files.*') */
/*         ->paginate($this->pagination_no); */

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
            'file_location'         => 	'required|mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf|max:2048',
            'file_id' 		        =>  'required|numeric',
        ]);
    }

    public function store(Request $request)
    {
        $this->validation($request);
        //$file = FileLocation::create($request->all());

        if($request->hasFile('file_location')) {


            $filelocation = $request->file('file_location');
            $filename = $filelocation->getClientOriginalName();
            $filelocation->storePubliclyAs('public',$filename);

            $file = FileLocation::create([
                'file_id' => $request->file_id,
                'file_location' => $filename
            ]);
            return new FileLocationResource($file);

        }
    }

    public function update(Request $request, $id)
    {
        $this->validation($request);

        $file = FileLocation::findOrFail($id);

 
        //$file->update($request->all());
        if($request->hasFile('file_location')) {
            
            unlink(storage_path('app/public/'.$request->filename));

            $filelocation = $request->file('file_location');

            $filename = $filelocation->getClientOriginalName();

            $filelocation->storePubliclyAs('public',$filename);

            $file->file_id = $request->file_id;

            $file->file_location = $filename;

            $file->save();

            return new FileLocationResource($file);

        }

        
    }
    
    public function destroy($id)
    {
        $file = FileLocation::findOrFail($id);
        unlink(storage_path('app/public/'.$file->file_location));
        if($file->delete())
            return new FileLocationResource($file);
    }

}
