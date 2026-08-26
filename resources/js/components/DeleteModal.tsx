import React from 'react';
import { router } from '@inertiajs/react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Delete item?',
    description = "Once you delete this, it can't be restored.",
}: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white shadow">
                <div className="flex items-center justify-between rounded-t border-b p-4">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
                <div className="flex items-center justify-end rounded-b border-t border-gray-200 p-4">
                    <button
                        onClick={onClose}
                        className="mr-3 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-full bg-red-600 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
