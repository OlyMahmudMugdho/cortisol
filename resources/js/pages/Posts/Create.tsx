import React from 'react';
import CreatePostForm from '../../components/CreatePostForm';
import AppLayout from '../../layouts/AppLayout';

interface Group {
    id: number;
    name: string;
    code: string;
}

interface Props {
    groups: Group[];
    defaultGroup?: string;
}

export default function CreatePost({ groups, defaultGroup }: Props) {
    return (
        <AppLayout>
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-6 border-b pb-2 text-xl font-bold text-gray-900">
                    Create a post
                </h1>

                {groups.length === 0 ? (
                    <div className="mb-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    You haven't joined any communities yet! You
                                    must join a community before you can post.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-md bg-white p-6 shadow">
                        <CreatePostForm
                            groups={groups}
                            defaultGroup={defaultGroup}
                        />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
