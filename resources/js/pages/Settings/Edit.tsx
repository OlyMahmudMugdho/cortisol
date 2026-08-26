import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import UpdateProfileInformationForm from '../../components/UpdateProfileInformationForm';
import UpdatePasswordForm from '../../components/UpdatePasswordForm';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface Props {
    user: User;
}

export default function EditSettings({ user }: Props) {
    return (
        <AppLayout>
            <div className="mx-auto max-w-3xl space-y-6 pb-12">
                <h1 className="mb-6 border-b pb-4 text-2xl font-bold text-gray-900">
                    User Settings
                </h1>

                <UpdateProfileInformationForm user={user} />

                <UpdatePasswordForm />
            </div>
        </AppLayout>
    );
}
