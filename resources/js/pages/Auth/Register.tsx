import { useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side Art / Banner */}
            <div className="hidden w-36 bg-[url('https://www.redditstatic.com/accountmanager/228d7faab11b36f7a1cb16ce09d2301a.png')] bg-cover bg-center bg-no-repeat lg:block"></div>

            {/* Right Side Form */}
            <div className="flex w-full flex-col justify-center px-6 lg:w-[calc(100%-9rem)] lg:px-24 xl:px-48">
                <div className="mx-auto w-full max-w-md">
                    <div className="mb-8">
                        {/* Logo placeholder */}
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4500]">
                            <svg
                                className="h-6 w-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.316 13.916c-.23.23-.538.345-.845.345-.308 0-.616-.115-.845-.345-1.57-1.57-4.084-1.57-5.654 0-.466.466-1.224.466-1.69 0-.466-.466-.466-1.224 0-1.69 1.258-1.258 2.93-1.95 4.708-1.95s3.45.692 4.708 1.95c.467.466.467 1.224.018 1.69zM15 11c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm-6 0c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-medium text-black">
                            Sign up
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            By continuing, you agree to our User Agreement and
                            Privacy Policy.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                placeholder="Full Name"
                                className="block w-full rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder-gray-500 transition-colors hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                autoComplete="name"
                                required
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                placeholder="Username"
                                className="block w-full rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder-gray-500 transition-colors hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                autoComplete="username"
                                required
                                onChange={(e) =>
                                    setData('username', e.target.value)
                                }
                            />
                            {errors.username && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.username}
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Email"
                                className="block w-full rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder-gray-500 transition-colors hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                autoComplete="email"
                                required
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            {errors.email && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                placeholder="Password"
                                className="block w-full rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder-gray-500 transition-colors hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                autoComplete="new-password"
                                required
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            {errors.password && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                placeholder="Confirm Password"
                                className="block w-full rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder-gray-500 transition-colors hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                autoComplete="new-password"
                                required
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                            />
                            {errors.password_confirmation && (
                                <div className="mt-1 text-xs text-red-500">
                                    {errors.password_confirmation}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 w-full rounded-full bg-[#ff4500] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#e03d00] focus:ring-2 focus:ring-[#ff4500] focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        >
                            Sign Up
                        </button>

                        <div className="mt-6 text-sm">
                            <span className="text-gray-500">
                                Already a Cortisolian?{' '}
                            </span>
                            <Link
                                href="/login"
                                className="font-bold text-blue-500 hover:underline"
                            >
                                Log In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
