<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Artisan;
use Spatie\Backup\BackupDestination\BackupDestination;

class CustomBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:custom {customName?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a custom database backup with a custom name';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $customName = $this->argument('customName');
        $fileName = $customName ?: 'backup-' . now()->format('Y-m-d-His') . '.zip';
        // Run the backup with the specified or default file name
        $this->info('Starting custom backup...');
        Artisan::call('backup:run', [
            '--only-db' => true,
            '--filename' => $fileName,
        ]);
        $this->info('Custom backup completed.');
        $sourcePath = storage_path('app/backup/' . $fileName); // Adjust the path as needed
        $destinationPath = storage_path('app/backup/custom/' . $fileName); // Specify the new path and filename

        if (file_exists($sourcePath)) {
            rename($sourcePath, $destinationPath);
        }
    }
}
