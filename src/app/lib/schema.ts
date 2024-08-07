import { z } from 'zod'

export const registroSchema = z.object({
    nome: z.string().min(1, "nome é obrigatório!"),
    email: z.string().email("Email é Obrigatório!"),
    senha: z.string()
        .min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const LoginSchema = z.object({
    email: z.string().email("Email é Obrigatório!"),
    senha: z.string()
        .min(6, "Senha deve ter pelo menos 6 caracteres"),
})