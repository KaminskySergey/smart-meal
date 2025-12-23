'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '../ui/Button';
import { cn } from '@/utils/utils';
import { EyeOff, Eye } from 'lucide-react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function SignInForm() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [type, setType] = useState('password')
    const [loading, setLoading] = useState(false);

    const handleToggleType = () => {
        if (type === "password") {
            setType("text")
        }
        if (type === 'text') {
            setType("password")
        }
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const loginResponse = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (loginResponse?.error) {
                toast.error("Incorrect email or password");
                return;
            }

            toast.success("Logged in successfully!");
            router.push("/");
        } catch (error) {
            toast.error("Something went wrong, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev, [name]: value
        }))
    }
    return (
        <div className="bg-white p-8 rounded-2xl shadow-md w-full ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[350px]">
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col items-center'>
                        <h1 className='mb-4 text-4xl font-extrabold text-black'>SignIn</h1>

                    </div>


                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="px-4 py-2 border rounded-lg bg-gray-50 border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   focus:border-blue-500 transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className='relative'>

                            <input
                                type={type}
                                required
                                name="password"
                                id="password"
                                onChange={handleChange}
                                placeholder="*********"
                                className="px-4 py-2 w-full border rounded-lg bg-gray-50 border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            focus:border-blue-500 transition"
                            />
                            <span className={cn('absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-300', {
                                "text-blue-600": type === "text"
                            })} onClick={handleToggleType}>
                                {type === "password" ? <Eye /> : <EyeOff />}
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <Button isAuth type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </div>
            </form>
        </div >
    );
}