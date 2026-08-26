import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

interface GroupType {
    id: number;
    type: string;
}

interface CreateGroupFormProps {
    groupTypes: GroupType[];
}

export default function CreateGroupForm({ groupTypes }: CreateGroupFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        group_type_id: groupTypes.length > 0 ? groupTypes[0].id : '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/groups');
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Group Name
                </label>
                <p className="mb-2 text-xs text-gray-500">
                    The community name including capitalization (e.g. "General
                    Discussion").
                </p>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    required
                />
                {errors.name && (
                    <div className="mt-1 text-xs text-red-500">
                        {errors.name}
                    </div>
                )}
            </div>

            <div>
                <label
                    htmlFor="code"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Community Code (URL)
                </label>
                <p className="mb-2 text-xs text-gray-500">
                    This will be used in the URL: /g/your_code (no spaces,
                    letters, numbers, and underscores only).
                </p>
                <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                        g/
                    </span>
                    <input
                        id="code"
                        type="text"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        required
                        pattern="^[a-zA-Z0-9_]+$"
                    />
                </div>
                {errors.code && (
                    <div className="mt-1 text-xs text-red-500">
                        {errors.code}
                    </div>
                )}
            </div>

            <div>
                <label
                    htmlFor="group_type_id"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Group Type
                </label>
                <p className="mb-2 text-xs text-gray-500">
                    Who can view and contribute to this community.
                </p>
                <select
                    id="group_type_id"
                    value={data.group_type_id}
                    onChange={(e) => setData('group_type_id', e.target.value)}
                    className="block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    required
                >
                    {groupTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.type}
                        </option>
                    ))}
                </select>
                {errors.group_type_id && (
                    <div className="mt-1 text-xs text-red-500">
                        {errors.group_type_id}
                    </div>
                )}
            </div>

            <div className="flex justify-end border-t border-gray-100 pt-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="mr-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Create Community
                </button>
            </div>
        </form>
    );
}
