import React from 'react';
import { usePage, useForm } from '@inertiajs/react';

interface GroupHeaderProps {
    group: {
        name: string;
        description: string;
        code: string;
        created_at: string;
        users_count: number;
        is_joined: boolean;
    };
}

export default function GroupHeader({ group }: GroupHeaderProps) {
    const { auth } = usePage<any>().props;
    const { post: joinGroup, processing } = useForm();

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.user) {
            window.location.href = '/login';
            return;
        }
        joinGroup(`/g/${group.code}/join`, { preserveScroll: true });
    };

    return (
        <div className="mb-4 rounded-md bg-white p-4 shadow sm:p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
                        g/
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {group.name}
                        </h1>
                        <p className="text-sm font-bold text-gray-500">
                            g/{group.code}
                        </p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleJoin}
                        disabled={processing}
                        className={`rounded-full px-6 py-2 font-bold ${
                            group.is_joined
                                ? 'border border-gray-500 text-gray-500 hover:bg-gray-50'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {group.is_joined ? 'Joined' : 'Join'}
                    </button>
                </div>
            </div>
            {group.description && (
                <div className="mt-4 text-gray-700">{group.description}</div>
            )}
            <div className="mt-4 flex space-x-6 text-sm text-gray-500">
                <div>
                    <span className="font-bold text-gray-900">
                        {group.users_count}
                    </span>{' '}
                    Members
                </div>
                <div>
                    Created {new Date(group.created_at).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
