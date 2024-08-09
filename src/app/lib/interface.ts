import { FormEventHandler, ReactNode } from "react"

export interface LinkRedirectProps {
    href: string
    children: ReactNode
}

export interface HeaderLiProps {
    href: string
    text: string
}

export interface ButtonProps {
    href: string
    text: string
}

export interface RegisterProps {
    nome: string
    email: string
    senha: string
}

export interface LoginProps {
    email: string
    senha: string
}

export interface FormPageProps {
    onSubmit: FormEventHandler<HTMLFormElement>;
    srcIMG: string
    altIMG: string
    titulo: string
    label: { text: string; type: string }[];
    textButton: string
    textLinkRedirect: string
    textLink: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: { [key: string]: string };
    href: string
    errors: { [key: string]: string };
}

export interface User {
    id: string
    nome: string;
    email: string;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;
    setToken: (token: string | null) => void;
}

export interface ItemDashboardUser {
    href: string
    path: string
    src: string
    alt: string
    text: string
    onClick: () => void
}

export interface FolderProps {
    id: string
    nome: string
    _count: {
        Tarefa: number;
    };
}

export interface TaskProps {
    id: string
    nome: string
    text: string
    perecivel: boolean
    pasta: {
        nome: string
    }
}

export interface FetchOptions {
    method?: string;
    headers?: HeadersInit;
    body?: any;
}

export interface LiItensDoEstoqueProps {
    id: string
    titulo: string
    nomePasta: string
    perecivel: boolean
}


export interface GerenciamentoEstoqueProps {
    params: {
        id: string;
    };
}


export interface ItensEstoqueProps {
    params: {
        id: string;
    };
}

export interface PastaTarefasProps {
    id: string
    nome: string
    created_at: Date
    Tarefa: [{
        id: string
        nome: string
        text: string
        perecivel: boolean
        dataValidade: Date | null
        dataFabricacao: Date | null
        created_at: Date

    }]
}

export interface LiItensDoEstoqueIdProps {
    pastaId?: ReactNode
    id: string
    nome: string
    text: string
    perecivel: boolean
    dataValidade?: Date | any
    dataFabricacao?: Date | any
    created_at?: Date
    pasta?: {
        nome: string
    }
}

export interface CreateTarefaProps {
    nome: string,
    text: string,
    perecivel: boolean,
    pastaId: string
    usuarioId: string,
    dataValidade?: Date | null
    dataFabricacao?: Date | null
}

export interface LiTaskProps {
    key: string
    nome: string
    pasta?: {
        nome: string
    },
    item: {
        perecivel: boolean
    }
    onclick: () => void
    handleDelete: () => void
}

export interface UserProps {
    id: string
    nome: string
    email: string
}

export interface DivItemProps{
    src: string
    alt: string
    titulo: string
    text: string
}