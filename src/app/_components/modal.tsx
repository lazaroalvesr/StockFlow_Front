'use client'

import { useState } from "react";

export const Modal = ({ show, onClose, onSubmit }: { show: boolean, onClose: () => void, onSubmit: (nome: string) => void }) => {
    const [nome, setNome] = useState("");

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(nome);
        setNome("");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-xl border border-border">
                <h2 className="text-xl mb-4">Criar Nova Pasta</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome da Pasta"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border p-2 mb-4 w-full"
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Criar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
