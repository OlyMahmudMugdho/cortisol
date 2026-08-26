import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';
import AppLayout from '../../layouts/AppLayout';

interface Post {
    id: number;
    title: string;
    content: string | null;
}

interface Props {
    post: Post;
}

export default function EditPost({ post }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        content: post.content || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-6 border-b pb-2 text-xl font-bold text-gray-900">
                    Edit Post
                </h1>

                <div className="rounded-md bg-white p-6 shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Title (Cannot be changed)
                            </label>
                            <input
                                type="text"
                                value={post.title}
                                disabled
                                className="block w-full cursor-not-allowed rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                            />
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
                                rows={8}
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
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
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
