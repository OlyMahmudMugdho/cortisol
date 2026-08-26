<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Mail\ResetPasswordOtpMail;

class OtpPasswordResetController extends Controller
{
    /**
     * Send the OTP to the user's email.
     */
    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $otp = str_pad(strval(random_int(0, 999999)), 6, '0', STR_PAD_LEFT);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => Hash::make($otp),
                'created_at' => Carbon::now(),
            ]
        );

        Mail::to($request->email)->send(new ResetPasswordOtpMail($otp));

        return back()->with('status', 'OTP has been sent to your email.');
    }

    /**
     * Verify the OTP and reset the password.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$record) {
            return back()->withErrors(['otp' => 'Invalid or expired OTP.']);
        }

        // Check expiry (15 minutes)
        if (Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return back()->withErrors(['otp' => 'OTP has expired.']);
        }

        // Check hash
        if (!Hash::check($request->otp, $record->token)) {
            return back()->withErrors(['otp' => 'Invalid OTP.']);
        }

        // Update password
        $user = User::where('email', $request->email)->firstOrFail();
        $user->forceFill([
            'password' => Hash::make($request->password)
        ])->save();

        // Delete token
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return redirect()->route('login')->with('status', 'Your password has been reset!');
    }

    /**
     * Verify the OTP without resetting the password.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$record) {
            return back()->withErrors(['otp' => 'Invalid or expired OTP.']);
        }

        // Check expiry (15 minutes)
        if (Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return back()->withErrors(['otp' => 'OTP has expired.']);
        }

        // Check hash
        if (!Hash::check($request->otp, $record->token)) {
            return back()->withErrors(['otp' => 'Invalid OTP.']);
        }

        return back()->with('status', 'OTP verified successfully.');
    }
}
