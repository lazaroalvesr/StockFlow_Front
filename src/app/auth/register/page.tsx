"use client";

import { BaseURL } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterProps } from "@/app/lib/interface";
import { registroSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useAuthRedirect from "@/app/lib/hook/useAuthRedirect";

export default function RegisterPage() {
    useAuthRedirect("/auth/register")
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<RegisterProps>({
        resolver: zodResolver(registroSchema),
    });

    const router = useRouter()
    const [error, setError] = useState<string>();
    const [sucess, setSucess] = useState<string>()
    const [loading, setLoading] = useState<boolean>()

    const onSubmit = async (formData: RegisterProps) => {
        setLoading(true)
        try {
            const response = await fetch(`${BaseURL}auth/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message)
                throw new Error(data.message || 'Erro desconhecido');
            }


            setInterval(() => {
                if (response.ok) {
                    router.push("/auth/login")
                }
            }, (1000));

            Cookies.set('access_token', data.acess_token, {
                secure: true,
                sameSite: 'Strict',
                expires: 7,
            });

            setSucess("Cadastro realizado com sucesso")
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
            <div className="m-auto lg:w-[780px] w-[360px] md:w-[780px] flex mt-32">
                <div className="bg-white shadow-md border border-gray-100 rounded-s-md lg:flex hidden md:flex">
                    <Image
                        src="/img/ImgLogin.png"
                        alt={"Foto"}
                        width={400}
                        height={90}
                    />
                </div>
                <form className="flex bg-white shadow-md border border-gray-100 w-[400px] pb-20 rounded-e-md" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full">
                        <div className="text-center">
                            <h2 className="mt-4 text-black text-xl">Criar Conta</h2>
                        </div>
                        <div className="mx-12 flex flex-col gap-4 mt-8">
                            <label className="flex flex-col">
                                Nome
                                <input
                                    type='text'
                                    className={`border mt-2 py-1 pl-2 outline-none border-black rounded-md ${errors.nome ? 'border-red-500' : ''}`}
                                    {...register("nome")}
                                />
                                {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                            </label>
                            <label className="flex flex-col">
                                Email
                                <input
                                    type='email'
                                    className={`border mt-2 py-1 pl-2 outline-none border-black rounded-md ${errors.email ? 'border-red-500' : ''}`}
                                    {...register("email")}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                                {error ? <p className="text-red-400 text-sm mt-2 rounded-md h-2">{error}</p> : ""}
                            </label>
                            <label className="flex flex-col">
                                Senha
                                <input
                                    type='password'
                                    className={`border mt-2 py-1 pl-2 outline-none border-black rounded-md ${errors.senha ? 'border-red-500' : ''}`}
                                    {...register("senha")}
                                />
                                {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
                            </label>
                        </div>
                        {sucess ? <p className="bg-emerald-500 w-72 m-auto px-2 py-2 rounded-md  mt-4 text-white">{sucess}</p> : ""}
                        <div className="flex flex-col items-center mt-8 h-0 gap-3 pb-4">
                            <button
                                type="submit"
                                className={`w-60 rounded-md py-2 text-white ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#0019F9]'} disabled:bg-gray-300`}
                                disabled={loading}
                            >
                                {loading ? "Criando conta..." : "Criar Minha Conta"}
                            </button>
                            <p>Já tem conta? <Link href="/auth/login" className="underline text-[#0019F9]"> Fazer Login</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
