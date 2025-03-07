<?php

use App\Console\Commands\CleanTmpImages;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->everyFiveMinutes();

Schedule::command(CleanTmpImages::class)->daily();
