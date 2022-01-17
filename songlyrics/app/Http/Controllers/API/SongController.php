<?php

namespace App\Http\Controllers\API;
use App\Models\Song;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SongController extends Controller
{
    
    public function index()
    {
        $song = Song::all();
        return response()->json(['status'=>200, "song"=>$song]);
    }

    //create function
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            "title"=>"required", 
            "artist"=>"required", 
            "lyrics"=>"required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status'=>422, "validate_err"=>$validator->errors()]);
        }
        else {
            $song = New Song();
            $song->title=$request->input('title');
            $song->artist=$request->input('artist');
            $song->lyrics=$request->input('lyrics');
            $song->save(); //query builder orm
            return response()->json(['status'=>200, 'message'=>'Song addded succesfully!']);
        }
    }

    //edit function
    public function edit($id)
    {
        $song = Song::find($id);
        if ($song) {
            return response()->json(['status' => 200, "song" => $song]);
        } else {
            return response()->json(['status' => 404, "message" => 'No Song ID Found!']);
        }
    }

    //update function
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "title" => "required",
            "artist" => "required",
            "lyrics" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 422, "validationErrors" => $validator->errors()]);
        } else {
            $song = Song::find($id);
            if ($song) {
                $song->title = $request->input('title');
                $song->artist = $request->input('artist');
                $song->lyrics = $request->input('lyrics');
                $song->update();
                return response()->json(['status' => 200, "message" => 'Song Updated Successfully!']);
            } else {
                return response()->json(['status' => 404, "message" => 'No Song ID Found!']);
            }
        }
    }

    //delete function
    
    public function destroy($id)
    {
        $song = Song::find($id);
        if ($song) {
            $song -> delete();
            return response()->json(['status' => 200, "message" => 'Song Deleted Successfully!']);
        } else {
            return response()->json(['status' => 404, "message" => 'No song ID Found!']);
        }
    }
}
