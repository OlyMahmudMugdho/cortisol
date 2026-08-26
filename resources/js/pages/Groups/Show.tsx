import React from 'react';
import { Link } from '@inertiajs/react';
import GroupHeader from '../../components/GroupHeader';
import AppLayout from '../../layouts/AppLayout';
import PostItem, { Post } from '../../components/PostItem';

interface Group {
    id: number;
    name: string;
    description: string;
    code: string;
    created_at: string;
    users_count: number;
    is_joined: boolean;
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
}

interface Props {
    group: Group;
}

export default function ShowGroup({ group }: Props) {
    return (
        <AppLayout>
            <GroupHeader group={group} />

            <div className="space-y-4">
                {group.posts.data.length === 0 ? (
                    <div className="rounded-md bg-white p-6 text-center text-gray-500 shadow">
                        No posts in this community yet. Be the first to post!
                    </div>
                ) : (
                    group.posts.data.map((p) => (
                        <PostItem key={p.id} post={p} showGroup={false} />
                    ))
                )}

                {group.posts.last_page > 1 && (
                    <div className="flex items-center justify-between py-4">
                        {group.posts.prev_page_url ? (
                            <Link
                                href={group.posts.prev_page_url}
                                className="rounded-full border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                        ) : (
                            <div />
                        )}
                        {group.posts.next_page_url ? (
                            <Link
                                href={group.posts.next_page_url}
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
