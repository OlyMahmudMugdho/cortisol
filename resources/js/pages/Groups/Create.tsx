import React from 'react';
import CreateGroupForm from '../../components/CreateGroupForm';
import AppLayout from '../../layouts/AppLayout';

interface GroupType {
    id: number;
    type: string;
}

interface Props {
    groupTypes: GroupType[];
}

export default function CreateGroup({ groupTypes }: Props) {
    return (
        <AppLayout>
            <div className="mx-auto max-w-2xl rounded-md bg-white p-6 shadow">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    Create a Group
                </h1>

                <CreateGroupForm groupTypes={groupTypes} />
            </div>
        </AppLayout>
    );
}
