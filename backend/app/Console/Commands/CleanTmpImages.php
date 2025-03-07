<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanTmpImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clean-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Limpiar imágenes temporales';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Storage::disk('public')->deleteDirectory('tmp/images');
        $this->info('Imágenes temporales eliminadas correctamente.');
    }
}
