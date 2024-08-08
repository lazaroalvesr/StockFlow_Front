"use client";

import { BaseURL } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginProps } from "@/app/lib/interface";
import { LoginSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useAuthRedirect from "@/app/lib/hook/useAuthRedirect";

export default function LoginPage() {
    useAuthRedirect("/auth/login")

    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<LoginProps>({
        resolver: zodResolver(LoginSchema),
    });

    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [loading, setLoading] = useState<boolean>()

    const onSubmit = async (formData: LoginProps) => {
        setLoading(true)

        try {
            const response = await fetch(`${BaseURL}auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                throw new Error(data.message || 'Erro desconhecido');
            }

            setInterval(() => {
                if (response.ok) {
                    router.push("/dashboard")
                }
            }, (1000));

            Cookies.set('access_token', data.acess_token, {
                secure: true,
                sameSite: 'Strict',
                expires: 7,
            });

            setSuccess("Login realizado com sucesso");
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "email") {
            clearErrors("email");
            setError('');
        }
    };

    return (
        <section>
            <div className="m-auto lg:w-[780px] w-[340px] md:w-[780px] flex mt-32">
                <div className="bg-white shadow-md rounded-s-md border border-gray-100 lg:flex hidden md:flex">
                    <Image
                        src="/img/ImgLogin.png"
                        alt={"Foto"}
                        width={400}
                        height={90}
                    />
                </div>
                <form className="flex bg-white shadow-md border border-gray-100 lg:w-[400px] w-full pb-20 rounded-e-md" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full">
                        <div className="text-center">
                            <h2 className="mt-4 text-black text-xl">Acesse sua Conta</h2>
                        </div>
                        <div className="mx-12 flex flex-col gap-4 mt-8">
                            <label className="flex flex-col">
                                Email
                                <input
                                    type='email'
                                    className={`border mt-2 py-1 outline-none pl-2 border-black rounded-md ${errors.email ? 'border-red-500' : ''}`}
                                    {...register("email")}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="flex flex-col">
                                Senha
                                <input
                                    type='password'
                                    className={`border mt-2 py-1 outline-none pl-2 border-black rounded-md ${errors.senha ? 'border-red-500' : ''}`}
                                    {...register("senha")}
                                />
                            </label>
                        </div>
                        <div className="items-center justify-center flex">
                            {error && <p className="text-red-400 text-sm mt-2 m-auto rounded-md h-2">{error}</p>}
                            {success && <p className="bg-emerald-500 w-72 px-2 py-2 text-center rounded-md mt-4 text-white">{success}</p>}
                        </div>
                        <div className="flex flex-col items-center mt-8 h-0 gap-3 pb-4">
                            <button
                                type="submit"
                                className={`w-60 rounded-md py-2 text-white ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#0019F9]'} disabled:bg-gray-300`}
                                disabled={loading}
                            >
                                {loading ? "Entrando..." : "Entrar"}
                            </button>
                            <p>Não tem conta? <Link href="/auth/register" className="underline text-[#0019F9]"> Cadastre-se</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
