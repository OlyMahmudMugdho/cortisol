import { useForm } from '@inertiajs/react';
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
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
                    Create Cortisol Account
                </h1>

                <form onSubmit={submit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            autoComplete="name"
                            required
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            autoComplete="username"
                            required
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
                        />
                        {errors.username && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.username}
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            autoComplete="email"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            autoComplete="new-password"
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            autoComplete="new-password"
                            required
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                        {errors.password_confirmation && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex items-center justify-end">
                        <a
                            href="/login"
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            Already registered?
                        </a>

                        <button
                            type="submit"
                            disabled={processing}
                            className="ms-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
