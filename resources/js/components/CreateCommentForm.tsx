import React from 'react';
import { useForm } from '@inertiajs/react';

interface CreateCommentFormProps {
    postId: number;
    parentId?: number;
    username: string;
    placeholder?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
    autoFocus?: boolean;
    rows?: number;
}

export default function CreateCommentForm({
    postId,
    parentId,
    username,
    placeholder = 'What are your thoughts?',
    onSuccess,
    onCancel,
    autoFocus = false,
    rows = 4,
}: CreateCommentFormProps) {
    const {
        data,
        setData,
        post: submitComment,
        processing,
        errors,
        reset,
    } = useForm({
        content: '',
        parent_id: parentId,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitComment(`/posts/${postId}/comments`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <form onSubmit={onSubmit}>
            {!parentId && (
                <p className="mb-2 text-sm text-gray-600">
                    Comment as{' '}
                    <span className="font-bold text-gray-900">{username}</span>
                </p>
            )}
            <textarea
                rows={rows}
                className="w-full rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder={placeholder}
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                required
                autoFocus={autoFocus}
            />
            {errors.content && (
                <div className="mt-1 text-xs text-red-500">
                    {errors.content}
                </div>
            )}
            <div
                className={`mt-2 flex ${onCancel ? 'justify-end space-x-2' : 'justify-end'}`}
            >
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full px-4 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {parentId ? 'Reply' : 'Comment'}
                </button>
            </div>
        </form>
    );
}
