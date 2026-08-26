import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import PostHeader from '../../components/PostHeader';
import CommentSection from '../../components/CommentSection';

interface User {
    id: number;
    username: string;
}

interface Group {
    id: number;
    name: string;
    code: string;
}

interface Post {
    id: number;
    title: string;
    content: string | null;
    created_at: string;
    user: User;
    group: Group;
    comments_count: number;
    votes_sum_value: number | null;
    user_vote: {
        value: number;
    } | null;
}

interface Props {
    post: Post;
}

export default function ShowPost({ post }: Props) {
    return (
        <AppLayout>
            <div className="rounded-md bg-white shadow">
                <PostHeader post={post} />
                <CommentSection post={post} />
            </div>
        </AppLayout>
    );
}
