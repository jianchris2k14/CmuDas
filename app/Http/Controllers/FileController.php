<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    
    public function index()
    {
        return File::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' 		         => 	'required|alpha_num',
            'filename' 		     =>     'required|string',
            'slug' 		         => 	'required|string|max:24',
        ]);

        return File::create($request->all());
    }

    public function show($id)
    { 
        return File::find($id);
    }
    
    public function update(Request $request, $id)
    {
        // $request->validate([
        //     'code' 		         => 	'required|alpha_num',
        //     'filename' 		     =>     'required|string',
        //     'slug' 		         => 	'required|string|max:24',
        // ]);

        $file = File::find($id);
 
        $file->update($request->all());

        return $file;
    }
    
    public function destroy($id)
    {
        return File::destroy($id);
    }

    public function search($name)
    {
        return File::where('filename', 'like', '%' . $name . '%')
                ->orWhere('code', 'like', '%' . $name . '%')
                ->orWhere('slug', 'like', '%' . $name . '%')
                ->get();
    }

}