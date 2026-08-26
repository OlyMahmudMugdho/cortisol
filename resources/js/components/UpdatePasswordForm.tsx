import React, { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';

export default function UpdatePasswordForm() {
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
        passwordForm.put('/user/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <div className="rounded-md bg-white p-4 shadow sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
                Update Password
            </h2>
            <form onSubmit={updatePassword} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        value={passwordForm.data.current_password}
                        onChange={(e) =>
                            passwordForm.setData(
                                'current_password',
                                e.target.value,
                            )
                        }
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    {passwordForm.errors.current_password && (
                        <div className="mt-1 text-xs text-red-500">
                            {passwordForm.errors.current_password}
                        </div>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={passwordForm.data.password}
                        onChange={(e) =>
                            passwordForm.setData('password', e.target.value)
                        }
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    {passwordForm.errors.password && (
                        <div className="mt-1 text-xs text-red-500">
                            {passwordForm.errors.password}
                        </div>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        value={passwordForm.data.password_confirmation}
                        onChange={(e) =>
                            passwordForm.setData(
                                'password_confirmation',
                                e.target.value,
                            )
                        }
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    {passwordForm.errors.password_confirmation && (
                        <div className="mt-1 text-xs text-red-500">
                            {passwordForm.errors.password_confirmation}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end pt-2">
                    {passwordForm.recentlySuccessful && (
                        <span className="mr-3 text-sm font-medium text-green-600">
                            Password Updated.
                        </span>
                    )}
                    <button
                        type="submit"
                        disabled={passwordForm.processing}
                        className="rounded-full bg-gray-900 px-6 py-2 text-sm font-bold text-white hover:bg-black disabled:opacity-50"
                    >
                        Save Password
                    </button>
                </div>
            </form>
        </div>
    );
}
