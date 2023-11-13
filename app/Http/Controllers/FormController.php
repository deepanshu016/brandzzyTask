<?php

namespace App\Http\Controllers;
use App\Http\Requests\FormSubmitRequest;
use App\Models\Form;
class FormController extends Controller
{
    public function index()
    {
        return view('welcome');
    }
    public function form_submit(FormSubmitRequest $request)
    {
        $form = new Form();
        $form->first_name = $request->first_name;
        $form->last_name = $request->last_name;
        $form->email = $request->email;
        $form->mobile = $request->mobile;
        $form->save();
        if($form->id > 0){
            $response = array('status'=>'success','message'=>'Data saved successfully','type'=>'success','title'=>'Success','url'=>url('/'));
            return response()->json($response);
        }
        $response = array('status'=>'error','message'=>'Something went wrong!','type'=>'error','title'=>'Failure','url'=>'');
        return response()->json($response);
    }
}
