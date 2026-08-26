import React, { FormEventHandler } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthInput from './AuthInput';

export default function RegisterForm() {
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
        <form onSubmit={submit} className="space-y-4">
            <AuthInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                placeholder="Full Name"
                autoComplete="name"
                required
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
            />

            <AuthInput
                id="username"
                type="text"
                name="username"
                value={data.username}
                placeholder="Username"
                autoComplete="username"
                required
                onChange={(e) => setData('username', e.target.value)}
                error={errors.username}
            />

            <AuthInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                placeholder="Email"
                autoComplete="email"
                required
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
            />

            <AuthInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                placeholder="Password"
                autoComplete="new-password"
                required
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
            />

            <AuthInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                placeholder="Confirm Password"
                autoComplete="new-password"
                required
                onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                }
                error={errors.password_confirmation}
            />

            <button
                type="submit"
                disabled={processing}
                className="mt-6 w-full rounded-full bg-[#ff4500] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#e03d00] focus:ring-2 focus:ring-[#ff4500] focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
                Sign Up
            </button>

            <div className="mt-6 text-sm">
                <span className="text-gray-500">Already a Cortisolian? </span>
                <Link
                    href="/login"
                    className="font-bold text-blue-500 hover:underline"
                >
                    Log In
                </Link>
            </div>
        </form>
    );
}
