<?php

namespace App\Models;

use Database\Factories\GroupTypeFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['type'])]
class GroupType extends Model
{
    /** @use HasFactory<GroupTypeFactory> */
    use HasFactory;
}
