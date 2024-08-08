import { useState, useEffect } from "react";
import { FolderProps } from "@/app/lib/interface";
import Tiptap from "../lib/tiptap";

interface ModalTaskProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (nome: string, text: string, pastaId: string, perecivel: boolean, dataValidade?: string, dataFabricacao?: string) => void;
    folders: FolderProps[];
}

export const ModalTask = ({ show, onClose, onSubmit, folders }: ModalTaskProps) => {
    const [task, setTask] = useState({
        nome: "",
        text: "",
        pastaId: "",
        perecivel: false,
        dataValidade: "",
        dataFabricacao: "",
    });
    const [errors, setErrors] = useState<{ dataValidade?: string }>({});

    useEffect(() => {
        if (show) {
            setTask({
                nome: "",
                text: "",
                pastaId: "",
                perecivel: false,
                dataValidade: "",
                dataFabricacao: "",
            });
            setErrors({});
        }
    }, [show]);

    if (!show) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (task.perecivel && !task.dataValidade) {
            setErrors({ dataValidade: "Data de validade é obrigatória para itens perecíveis." });
            return;
        } else {
            setErrors({});
        }

        const formatDate = (dateString?: string) => {
            if (!dateString) return undefined;
            const date = new Date(dateString);
            return date.toISOString();
        };

        const dataValidade = formatDate(task.dataValidade);
        const dataFabricacao = formatDate(task.dataFabricacao);

        onSubmit(task.nome, task.text, task.pastaId, task.perecivel, dataValidade, dataFabricacao);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type, checked } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleTextChange = (content: string) => {
        setTask((prevTask) => ({
            ...prevTask,
            text: content
        }));
    };

    return (
        <div className="bg-black fixed flex items-center justify-center inset-0 bg-opacity-15 backdrop-blur-sm">
            <div className="bg-white p-6 lg:w-[500px] w-[350px] rounded-md shadow-xl border border-border">
                <h2 className="text-xl mb-4">Criar Nova Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome da Tarefa"
                        value={task.nome}
                        onChange={handleChange}
                        className="border p-2 mb-4 w-full outline-none"
                        required
                    />
                    <label>
                        <Tiptap onChange={handleTextChange} />
                    </label>
                    <select
                        name="pastaId"
                        value={task.pastaId}
                        onChange={handleChange}
                        className="border p-2 mb-4 w-full outline-none"
                        required
                    >
                        <option value="" className="outline-none">Escolha uma Pasta</option>
                        {folders.map(folder => (
                            <option key={folder.id} value={folder.id} className="outline-none">
                                {folder.nome}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center mb-4">
                        <label htmlFor="perecivel" className="flex items-center gap-4">
                            Perecível
                            <input
                                type="checkbox"
                                name="perecivel"
                                checked={task.perecivel}
                                onChange={handleChange}
                                className="mr-2 "
                            />
                        </label>
                    </div>
                    {task.perecivel && (
                        <>
                            <label className="block mb-4">
                                Data de Fabricação
                                <input
                                    type="date"
                                    name="dataFabricacao"
                                    value={task.dataFabricacao}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-full outline-none "
                                />
                            </label>
                            <label className="block mb-4">
                                Data de Validade
                                <input
                                    type="date"
                                    name="dataValidade"
                                    value={task.dataValidade}
                                    onChange={handleChange}
                                    className="border p-2 mt-2 w-full outline-none"
                                />
                                {errors.dataValidade && <p className="text-red-500 mt-2">{errors.dataValidade}</p>}
                            </label>
                        </>
                    )}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Criar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
