import React from 'react';

export default function SearchBar() {
    return (
        <div className="w-full max-w-lg lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <form action="/search" method="get" className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    id="search"
                    name="q"
                    className="block w-full rounded-full border border-gray-300 bg-gray-50 py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-orange-500 focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:outline-none sm:text-sm"
                    placeholder="Search Cortisol..."
                    type="search"
                    defaultValue={
                        new URLSearchParams(
                            typeof window !== 'undefined'
                                ? window.location.search
                                : '',
                        ).get('q') || ''
                    }
                />
            </form>
        </div>
    );
}
