<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{

    private $pagination_no = 20;

    public function index()
    {
        $users = User::orderBy('created_at','DESC')->get();
        return UserResource::collection($users);
    }

    public function show($id)
    {
        return new UserResource(User::findOrFail($id));
    }

    public function search(Request $request)
    {
        $request->validate([
            'keyword' 		         => 	'required|string|min:2',
        ]);

        $users = User::where('name', 'like', '%' . $request->keyword . '%')
                ->orWhere('email', 'like', '%' . $request->keyword . '%')
                ->orWhere('phone_no', 'like', '%' . $request->keyword . '%')
                ->orWhere('address', 'like', '%' . $request->keyword . '%')
                ->paginate($this->pagination_no);

        return UserResource::collection($users);
    }

    private function validation(Request $request)
    {
        return $request->validate([
            'name'          => 'required|string',
            'email'         => 'required|string|email|unique:users,email',
            'password'      => 'required|string|confirmed',
            'user_type'     => 'required|string|alpha',
            'phone_no'      => 'required|string',
            'address'       => 'required|string'
        ]);
    }

    public function store(Request $request)
    {
        $fields = $this->validation($request);

        $user = User::create([
            'name'          => $fields['name'],
            'email'         => $fields['email'],
            'password'      => bcrypt($fields['password']),
            'user_type'     => $fields['user_type'],
            'phone_no'      => $fields['phone_no'],
            'address'       => $fields['address']
        ]);

        $token = $user->createToken('cmudas')->plainTextToken;

        $response = [
            'user'          => $user,
            'token'         => $token
        ];

        return response(new UserResource($user), 201);
    }

    public function update(Request $request, $id)
    {
        //$this->validation($request);

        $user = User::findOrFail($id);

        $user->update($request->all());

        return new UserResource($user);
    }
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if($user->delete())
            return new UserResource($user);
    }

}
