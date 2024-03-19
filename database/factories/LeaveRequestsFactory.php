<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Faker\Factory as faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\leaverequests>
 */
class LeaveRequestsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create();
        $startDate = Carbon::now()->subDays(rand(1, 3652));
        $endDate = $startDate->copy()->addDays(rand(1, 7));
        $daysTotal = $startDate->copy()->diffInDays($endDate);

        return [
            'name' =>$this->faker->name,
            'leaveTypes' => $faker->randomElement(['personal','sick','vacation','bereavement']),
            'startDate' => $startDate,
            'endDate' => $endDate,
            'daysTotal' => $daysTotal,
            'reason' => 'another good reason',
            'dayRequested' => Carbon::now(),
            'status' => $faker->randomElement(['Approved','Denied']),
        ];
    }
}
