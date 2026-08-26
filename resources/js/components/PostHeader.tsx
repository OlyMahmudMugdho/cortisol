import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PostAuthorMenu from './PostAuthorMenu';
import PostVoteBlock from './PostVoteBlock';

dayjs.extend(relativeTime);

interface Post {
    id: number;
    title: string;
    content: string | null;
    created_at: string;
    user: { id: number; username: string };
    group: { id: number; name: string; code: string };
    comments_count: number;
    votes_sum_value: number | null;
    user_vote: { value: number } | null;
}

interface PostHeaderProps {
    post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
    const { auth } = usePage<any>().props;

    return (
        <>
            <div className="border-b border-gray-100 p-4 sm:p-6">
                <div className="mb-2 flex items-start justify-between">
                    <div className="flex flex-wrap items-center text-xs text-gray-500">
                        <Link
                            href={`/g/${post.group.code}`}
                            className="mr-1 font-bold text-gray-900 hover:underline"
                        >
                            g/{post.group.code}
                        </Link>
                        <span>•</span>
                        <span className="mx-1">Posted by</span>
                        <Link
                            href={`/u/${post.user.username}`}
                            className="mr-1 hover:underline"
                        >
                            u/{post.user.username}
                        </Link>
                        <span>{dayjs(post.created_at).fromNow()}</span>
                    </div>
                    {auth?.user?.id === post.user.id && (
                        <PostAuthorMenu postId={post.id} />
                    )}
                </div>
                <h1 className="mb-4 text-2xl font-bold text-gray-900">
                    {post.title}
                </h1>

                {post.content && (
                    <div className="mt-4 break-words whitespace-pre-wrap text-gray-800">
                        {post.content}
                    </div>
                )}

                <div className="mt-6 flex items-center space-x-4 text-sm font-bold text-gray-500">
                    <PostVoteBlock
                        postId={post.id}
                        votesSum={post.votes_sum_value || 0}
                        userVote={post.user_vote?.value || null}
                    />
                    <div className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-100">
                        <svg
                            className="mr-1.5 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        {post.comments_count} Comments
                    </div>
                </div>
            </div>
        </>
    );
}
