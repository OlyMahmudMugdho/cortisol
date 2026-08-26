import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

interface Group {
    id: number;
    name: string;
    code: string;
}

interface CreatePostFormProps {
    groups: Group[];
    defaultGroup?: string;
}

export default function CreatePostForm({
    groups,
    defaultGroup,
}: CreatePostFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        group_id: defaultGroup || (groups.length > 0 ? groups[0].id : ''),
        title: '',
        content: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/posts');
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div>
                <label
                    htmlFor="group_id"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Choose a community
                </label>
                <select
                    id="group_id"
                    value={data.group_id}
                    onChange={(e) => setData('group_id', e.target.value)}
                    className="block w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:w-1/2"
                    required
                >
                    <option value="" disabled>
                        Select a community
                    </option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            g/{group.code} - {group.name}
                        </option>
                    ))}
                </select>
                {errors.group_id && (
                    <div className="mt-1 text-xs text-red-500">
                        {errors.group_id}
                    </div>
                )}
            </div>

            <div>
                <label
                    htmlFor="title"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="Title"
                    maxLength={300}
                    className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    required
                />
                {errors.title && (
                    <div className="mt-1 text-xs text-red-500">
                        {errors.title}
                    </div>
                )}
            </div>

            <div>
                <label
                    htmlFor="content"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Text (optional)
                </label>
                <textarea
                    id="content"
                    rows={6}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder="Text (optional)"
                    className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                {errors.content && (
                    <div className="mt-1 text-xs text-red-500">
                        {errors.content}
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
                    Post
                </button>
            </div>
        </form>
    );
}
