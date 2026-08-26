import React, { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface Props {
    user: User;
}

export default function UpdateProfileInformationForm({ user }: Props) {
    const profileForm = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
    });

    const updateProfile: FormEventHandler = (e) => {
        e.preventDefault();
        profileForm.put('/user/profile-information', {
            preserveScroll: true,
        });
    };

    return (
        <div className="rounded-md bg-white p-4 shadow sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
                Profile Information
            </h2>
            <form onSubmit={updateProfile} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        value={profileForm.data.name}
                        onChange={(e) =>
                            profileForm.setData('name', e.target.value)
                        }
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    {profileForm.errors.name && (
                        <div className="mt-1 text-xs text-red-500">
                            {profileForm.errors.name}
                        </div>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        value={profileForm.data.username}
                        onChange={(e) =>
                            profileForm.setData('username', e.target.value)
                        }
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    {profileForm.errors.username && (
                        <div className="mt-1 text-xs text-red-500">
                            {profileForm.errors.username}
                        </div>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={profileForm.data.email}
                        onChange={(e) =>
                            profileForm.setData('email', e.target.value)
                        }
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                    {profileForm.errors.email && (
                        <div className="mt-1 text-xs text-red-500">
                            {profileForm.errors.email}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end pt-2">
                    {profileForm.recentlySuccessful && (
                        <span className="mr-3 text-sm font-medium text-green-600">
                            Saved.
                        </span>
                    )}
                    <button
                        type="submit"
                        disabled={profileForm.processing}
                        className="rounded-full bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
