<?php

use Illuminate\Support\Facades\Route;

// Semua URL diserahkan ke React SPA — tidak ada database yang dibutuhkan
Route::get('/{any?}', fn() => view('app'))->where('any', '.*');
