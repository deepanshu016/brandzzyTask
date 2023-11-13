<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Spatie\Backup\BackupDestination\Backup;
use App\Models\Backups;
use Artisan;

class BackupController extends Controller
{
    public function index()
    {
        $backUpList  = Backups::all();
        return view('backup',compact('backUpList'));
    }
    //Generate Database Backup
    public function generate_backup(Request $request)
    {
        try {
            $customName = 'custom_backup_' . now()->format('Y-m-d-His');
            Artisan::call('backup:run', [
                '--filename' => $customName . '.zip'
            ]);
            $backups = new Backups();
            $backups->backup_file = $customName . '.zip';
            $backups->backup_time = date('Y-m-d H:i:s');
            $backups->save();
            $response = [
                'status' => 'success',
                'message' => 'Backup saved successfully',
                'type' => 'success',
                'title' => 'Success',
                'url' => url('url/backups'),
            ];
        } catch (\Exception $exception) {
            $response = [
                'status' => 'error',
                'message' => $exception->getMessage(),
                'type' => 'error',
                'title' => 'Failure',
                'url' => '',
            ];
        }
        return response()->json($response);

    }
}
