import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import { Link, useForm, usePage } from '@inertiajs/react';

interface Group {
    id: number;
    name: string;
    code: string;
    created_at: string;
}

interface Props {
    group: Group;
    isJoined: boolean;
}

export default function ShowGroup({ group, isJoined }: Props) {
    const { post, processing } = useForm();
    const { auth } = usePage<any>().props;

    const toggleMembership = () => {
        if (!auth?.user) {
            window.location.href = '/login';
            return;
        }
        post(`/groups/${group.id}/membership`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <div className="mb-4 rounded-md bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
                            g/
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {group.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                g/{group.code}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={toggleMembership}
                        disabled={processing}
                        className={`rounded-full px-6 py-2 text-sm font-bold ${
                            isJoined
                                ? 'border border-blue-600 bg-white text-blue-600 hover:bg-blue-50'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        } disabled:opacity-50`}
                    >
                        {isJoined ? 'Joined' : 'Join'}
                    </button>
                </div>
            </div>

            <div className="rounded-md bg-white p-6 text-center text-gray-500 shadow">
                <p>Welcome to {group.name}! Post feed coming soon...</p>
                <Link
                    href={`/posts/create?group_id=${group.id}`}
                    className="mt-4 inline-block text-blue-500 hover:underline"
                >
                    Create the first post
                </Link>
            </div>
        </AppLayout>
    );
}
