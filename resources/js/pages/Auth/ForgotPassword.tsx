import React, { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthInput from '../../components/AuthInput';

interface Props {
    status?: string;
}

export default function ForgotPassword({ status }: Props) {
    const [step, setStep] = useState<1 | 2>(1);

    // Step 1: Request OTP
    const otpForm = useForm({
        email: '',
    });

    // Step 2: Reset Password
    const resetForm = useForm({
        email: '',
        otp: '',
        password: '',
        password_confirmation: '',
    });

    const submitOtpRequest: FormEventHandler = (e) => {
        e.preventDefault();
        otpForm.post('/forgot-password-otp', {
            onSuccess: () => {
                resetForm.setData('email', otpForm.data.email);
                setStep(2);
            },
        });
    };

    const submitReset: FormEventHandler = (e) => {
        e.preventDefault();
        resetForm.post('/reset-password-otp');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head title="Forgot Password" />
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-8">
                        <Link href="/" className="inline-block">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                <svg
                                    className="h-6 w-6 text-orange-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                        </Link>
                        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                            Reset your password
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            {step === 1
                                ? "Enter your email address and we'll send you a 6-digit OTP to reset your password."
                                : 'Enter the 6-digit OTP sent to your email and choose a new password.'}
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {step === 1 ? (
                        <form onSubmit={submitOtpRequest} className="space-y-6">
                            <AuthInput
                                id="email"
                                type="email"
                                name="email"
                                value={otpForm.data.email}
                                placeholder="Email Address"
                                autoComplete="email"
                                required
                                onChange={(e) =>
                                    otpForm.setData('email', e.target.value)
                                }
                                error={otpForm.errors.email}
                            />

                            <button
                                type="submit"
                                disabled={otpForm.processing}
                                className="flex w-full justify-center rounded-full bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            >
                                Send OTP
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={submitReset} className="space-y-4">
                            <AuthInput
                                id="otp"
                                type="text"
                                name="otp"
                                value={resetForm.data.otp}
                                placeholder="6-digit OTP"
                                required
                                maxLength={6}
                                className="text-center text-lg tracking-widest"
                                onChange={(e) =>
                                    resetForm.setData('otp', e.target.value)
                                }
                                error={resetForm.errors.otp}
                            />

                            <AuthInput
                                id="password"
                                type="password"
                                name="password"
                                value={resetForm.data.password}
                                placeholder="New Password"
                                required
                                onChange={(e) =>
                                    resetForm.setData(
                                        'password',
                                        e.target.value,
                                    )
                                }
                                error={resetForm.errors.password}
                            />

                            <AuthInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={resetForm.data.password_confirmation}
                                placeholder="Confirm New Password"
                                required
                                onChange={(e) =>
                                    resetForm.setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                error={resetForm.errors.password_confirmation}
                            />

                            <button
                                type="submit"
                                disabled={resetForm.processing}
                                className="mt-6 flex w-full justify-center rounded-full bg-orange-600 px-4 py-3 text-sm font-bold text-white hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            >
                                Reset Password
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center text-sm">
                        <Link
                            href="/login"
                            className="font-medium text-orange-600 hover:text-orange-500"
                        >
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3140&q=80"
                    alt="Reset password background"
                />
            </div>
        </div>
    );
}
