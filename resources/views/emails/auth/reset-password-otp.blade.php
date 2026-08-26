<x-mail::message>
# Password Reset Code

You requested to reset your password for your Cortisol account. Please use the following One-Time Password (OTP) to reset your password. This code will expire in 15 minutes.

<x-mail::panel>
<div style="font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px;">
{{ $otp }}
</div>
</x-mail::panel>

If you did not request a password reset, no further action is required.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
