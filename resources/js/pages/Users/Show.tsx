import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';
import PostItem, { Post } from '../../components/PostItem';

interface ProfileUser {
    id: number;
    username: string;
    created_at: string;
}

interface PaginationData {
    data: Post[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Props {
    profileUser: ProfileUser;
    posts: PaginationData;
}

export default function ShowUser({ profileUser, posts }: Props) {
    return (
        <AppLayout>
            <div className="mb-4 flex items-center space-x-4 rounded-md bg-white p-4 shadow sm:p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
                    {profileUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        u/{profileUser.username}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Joined{' '}
                        {new Date(profileUser.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="mb-2 text-lg font-bold text-gray-900">Posts</h2>
                {posts.data.length === 0 ? (
                    <div className="rounded-md bg-white p-6 text-center text-gray-500 shadow">
                        <p>
                            u/{profileUser.username} hasn't posted anything yet.
                        </p>
                    </div>
                ) : (
                    posts.data.map((p) => <PostItem key={p.id} post={p} />)
                )}

                {posts.last_page > 1 && (
                    <div className="flex items-center justify-between py-4">
                        {posts.prev_page_url ? (
                            <Link
                                href={posts.prev_page_url}
                                className="rounded-full border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                        ) : (
                            <div />
                        )}
                        {posts.next_page_url ? (
                            <Link
                                href={posts.next_page_url}
                                className="rounded-full border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        ) : (
                            <div />
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
