<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;
use App\Http\Controllers\BackupController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('url/forms',[FormController::class,'index'])->name('urls.forms');
Route::post('url/forms',[FormController::class,'form_submit'])->name('urls.forms');
Route::get('url/backups',[BackupController::class,'index'])->name('url.backups');
Route::post('url/backup',[BackupController::class,'generate_backup'])->name('urls.backup');
