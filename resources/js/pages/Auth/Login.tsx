import { useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side Art / Banner */}
            <div className="hidden w-36 bg-[url('https://www.redditstatic.com/accountmanager/228d7faab11b36f7a1cb16ce09d2301a.png')] bg-cover bg-center bg-no-repeat lg:block"></div>

            {/* Right Side Form */}
            <div className="flex w-full flex-col justify-center px-6 lg:w-[calc(100%-9rem)] lg:px-24 xl:px-48">
                <div className="mx-auto w-full max-w-md">
                    <div className="mb-8 flex flex-col items-center text-center">
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
                            Log in
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            By continuing, you agree to our User Agreement and
                            Privacy Policy.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <AuthInput
                            id="login"
                            type="text"
                            name="login"
                            value={data.login}
                            placeholder="Username or Email"
                            autoComplete="username"
                            required
                            onChange={(e) => setData('login', e.target.value)}
                            error={
                                errors.login || errors.email || errors.username
                            }
                        />

                        <AuthInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            error={errors.password}
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-6 w-full rounded-full bg-[#ff4500] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#e03d00] focus:ring-2 focus:ring-[#ff4500] focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        >
                            Log In
                        </button>

                        <div className="mt-6 text-sm">
                            <span className="text-gray-500">
                                New to Cortisol?{' '}
                            </span>
                            <Link
                                href="/register"
                                className="font-bold text-blue-500 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
