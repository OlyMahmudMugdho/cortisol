import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import { Link } from '@inertiajs/react';

interface Group {
    id: number;
    name: string;
    code: string;
    created_at: string;
}

interface Props {
    group: Group;
}

export default function ShowGroup({ group }: Props) {
    return (
        <AppLayout>
            <div className="mb-4 rounded-md bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {group.name}
                        </h1>
                        <p className="text-sm text-gray-500">g/{group.code}</p>
                    </div>
                    <button className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
                        Join
                    </button>
                </div>
            </div>

            <div className="rounded-md bg-white p-6 text-center text-gray-500 shadow">
                <p>Welcome to {group.name}! Post feed coming soon...</p>
                <Link
                    href="/posts/create"
                    className="mt-4 inline-block text-blue-500 hover:underline"
                >
                    Create the first post
                </Link>
            </div>
        </AppLayout>
    );
}
