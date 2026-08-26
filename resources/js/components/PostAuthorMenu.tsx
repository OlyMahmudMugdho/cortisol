import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import DeleteModal from './DeleteModal';
import { router } from '@inertiajs/react';

interface PostAuthorMenuProps {
    postId: number;
}

export default function PostAuthorMenu({ postId }: PostAuthorMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <div className="relative ml-auto">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center rounded p-2 text-gray-500 hover:bg-gray-100"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                </svg>
            </button>
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>
                    <div className="ring-opacity-5 absolute right-0 z-20 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black">
                        <Link
                            href={`/posts/${postId}/edit`}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg
                                className="mr-3 h-4 w-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                            Edit Post
                        </Link>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsDeleteModalOpen(true);
                            }}
                            className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                        >
                            <svg
                                className="mr-3 h-4 w-4 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            Delete Post
                        </button>
                    </div>
                </>
            )}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => router.delete(`/posts/${postId}`)}
                title="Delete post?"
                description="Once you delete this post, it can't be restored."
            />
        </div>
    );
}
