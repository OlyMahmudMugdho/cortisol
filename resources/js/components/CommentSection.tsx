import React, { useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import CommentItem, { Comment } from './CommentItem';
import CreateCommentForm from './CreateCommentForm';

interface Post {
    id: number;
    comments?: Comment[];
}

interface CommentSectionProps {
    post: Post;
}

export default function CommentSection({ post }: CommentSectionProps) {
    const { auth } = usePage<any>().props;

    const commentsTree = useMemo(() => {
        if (!post.comments) return [];
        const commentMap: Record<number, Comment> = {};
        const roots: Comment[] = [];

        post.comments.forEach((c) => {
            commentMap[c.id] = { ...c, replies: [] };
        });

        post.comments.forEach((c) => {
            if (c.parent_id) {
                if (commentMap[c.parent_id]) {
                    commentMap[c.parent_id].replies!.push(commentMap[c.id]);
                }
            } else {
                roots.push(commentMap[c.id]);
            }
        });

        return roots;
    }, [post.comments]);

    return (
        <div className="rounded-b-md bg-gray-50 p-4 sm:p-6">
            {auth?.user ? (
                <div className="mb-8">
                    <CreateCommentForm
                        postId={post.id}
                        username={auth.user.username}
                    />
                </div>
            ) : (
                <div className="mb-8 flex items-center justify-between rounded border border-gray-200 bg-white p-4">
                    <p className="font-medium text-gray-600">
                        Log in or sign up to leave a comment
                    </p>
                    <div>
                        <Link
                            href="/login"
                            className="mr-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {commentsTree.length > 0 ? (
                    commentsTree.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment as any}
                        />
                    ))
                ) : (
                    <p className="py-4 text-center text-gray-500">
                        No comments yet. Be the first to share what you think!
                    </p>
                )}
            </div>
        </div>
    );
}
