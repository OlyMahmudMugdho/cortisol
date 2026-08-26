import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';
import PostItem, { Post } from '../components/PostItem';

interface PaginationData {
    data: Post[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface HomeProps {
    posts: PaginationData;
    currentFeed: string;
}

export default function Home({ posts, currentFeed }: HomeProps) {
    const { auth } = usePage<any>().props;

    return (
        <AppLayout>
            <div className="mb-6 flex items-center space-x-4">
                {auth?.user && (
                    <Link
                        href="/?feed=home"
                        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                            currentFeed === 'home'
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        Home
                    </Link>
                )}
                <Link
                    href="/?feed=all"
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        currentFeed === 'all'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    All Posts
                </Link>
            </div>

            <div className="space-y-4">
                {posts.data.length === 0 ? (
                    <div className="rounded-md bg-white p-6 text-center text-gray-500 shadow">
                        {currentFeed === 'home'
                            ? "You haven't joined any communities with posts yet. Join some to populate your feed, or check out 'All Posts'."
                            : 'No posts yet. Be the first to post!'}
                    </div>
                ) : (
                    posts.data.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))
                )}

                {/* Pagination */}
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
