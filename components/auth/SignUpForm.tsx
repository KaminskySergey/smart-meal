'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '../ui/Button';
import { cn } from '@/utils/utils';
import { EyeOff, Eye } from 'lucide-react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


export default function SingUpForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
    })
    const [type, setType] = useState('password')

    const handleToggleType = () => {
        if (type === "password") {
            setType("text")
        }
        if (type === 'text') {
            setType("password")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev, [name]: value
        }))
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send registration request
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                // Registration error
                console.error("Registration failed:", data);
                toast.error(data.message || "Registration failed");
                return;
            }

            console.log("Register response:", data);
            toast.success("Registration successful!");

            // Attempt to sign in after successful registration
            const loginResponse = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (loginResponse?.error) {
                console.error("Login failed:", loginResponse.error);
                toast.error("Login failed: " + loginResponse.error);
                return;
            }

            console.log("Login successful:", loginResponse);
            toast.success("Logged in successfully!");

            // Redirect after successful login
            router.push("/");

        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error("Something went wrong, please try again later.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-white p-8 rounded-2xl shadow-md w-full ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[350px]">
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col items-center'>
                        <h1 className='mb-4 text-4xl font-extrabold text-black'>SignUp</h1>

                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="fullName"
                            className="text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            onChange={handleChange}
                            placeholder="Jon Snow"
                            className="px-4 py-2 border rounded-lg bg-gray-50 border-gray-300 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                                   focus:border-blue-500 transition"
                        />
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
                        {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                </div>
            </form>
        </div>
    );
}