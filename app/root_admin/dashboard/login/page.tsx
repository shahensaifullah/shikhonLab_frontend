'use client';

import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '@/lib/api';

type LoginResponse = {
    access: string;
    refresh: string;
    user: {
        id: number;
        phone: string;
        full_name: string;
        email: string | null;
    };
};

const schema = Yup.object({
    phone: Yup.string()
        .trim()
        .min(6, 'Enter a valid phone number')
        .required('Phone is required'),
    password: Yup.string()
        .min(3, 'Password must be at least 3 characters')
        .required('Password is required'),
});

function extractAxiosErrorMessage(err: any): string {
    const data = err?.response?.data;
    if (!data) return 'Login failed. Please try again.';
    if (typeof data.detail === 'string') return data.detail;
    if (Array.isArray(data.non_field_errors) && data.non_field_errors[0]) return data.non_field_errors[0];
    if (Array.isArray(data.phone) && data.phone[0]) return data.phone[0];
    if (Array.isArray(data.password) && data.password[0]) return data.password[0];
    return 'Login failed. Check phone/password.';
}

export default function AdminLoginPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-sm border border-neutral-200 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-neutral-900">Admin Login</h1>
                    <p className="text-neutral-600 mt-1">
                        Sign in to manage courses, lessons, and dashboard access.
                    </p>
                </div>

                <Formik
                    initialValues={{ phone: '', password: '' }}
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        setStatus(null);
                        setSubmitting(true);

                        try {
                            const res = await api.post<LoginResponse>('/api/root-admin/auth/login', {
                                phone: values.phone.trim(),
                                password: values.password,
                            });

                            const payload = res.data;

                            // MVP storage (later: refresh in httpOnly cookie)
                            localStorage.setItem('admin_access', payload.access);
                            localStorage.setItem('admin_refresh', payload.refresh);
                            localStorage.setItem('admin_user', JSON.stringify(payload.user));

                            router.push('/dashboard');
                        } catch (err: any) {
                            setStatus(extractAxiosErrorMessage(err));
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          status,
                      }) => (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {status && (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                                    {status}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    name="phone"
                                    type="text"
                                    inputMode="tel"
                                    placeholder="017XXXXXXXX"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
                                />
                                {touched.phone && errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400"
                                />
                                {touched.password && errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-neutral-900 text-white py-2.5 font-medium hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Signing in…' : 'Sign in'}
                            </button>

                            <div className="pt-2 text-sm text-neutral-500">
                                If you don’t have access, ask the Super Admin to assign you a dashboard role.
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}