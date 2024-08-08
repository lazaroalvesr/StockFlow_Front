"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { FolderProps, LiItensDoEstoqueIdProps } from "../lib/interface";
import { BaseURL } from '../api/api';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import RenderHTML from '../lib/RenderHTML';
import { useAuth } from '../lib/context/AuthContext';

interface ModalTaskIdProps {
    show: boolean;
    task: LiItensDoEstoqueIdProps | null;
    folders?: FolderProps[];
    onClose: () => void;
}

export const ModalTaskId = ({ show, task, onClose, folders }: ModalTaskIdProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        nome: "",
        text: "",
        pastaId: "",
        perecivel: false,
        dataValidade: "",
        dataFabricacao: ""
    });
    const { user, token } = useAuth();

    const editor = useEditor({
        extensions: [StarterKit],
        editorProps:{
            attributes:{
                class: "editor-content"
            }
        },
        content: task?.text || '',
        onUpdate: ({ editor }) => {
            setEditData(prevState => ({ ...prevState, text: editor.getHTML() }));
        }
    });

    if (!show || !task) return null;

    const folderName = folders?.find(folder => folder.id === task.pastaId)?.nome || 'Pasta não encontrada';

    const formatToBR = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditData({ nome: task.nome, text: task.text, dataFabricacao: task.dataFabricacao,  dataValidade: task.dataValidade, perecivel: task.perecivel, pastaId: '' });
        editor?.commands.setContent(task.text);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditSubmit = async () => {
        try {
            const response = await fetch(`${BaseURL}task/${task.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(editData),
            });

            if (response.ok) {
                console.log("Edição bem-sucedida");
                onClose();
            } else {
                console.log("Erro ao editar a tarefa");
            }
        } catch (e) {
            console.log(e);
        }
    };
    
    const handleChangeSelect = (e: React.ChangeEvent<any>) => {
        const { name, value, type, checked } = e.target;
        setEditData((prevTask) => ({
            ...prevTask,
            [name]: type === "checkbox" ? checked : value
        }));
    };


    return (
        <article className="bg-black fixed flex items-center justify-center inset-0 bg-opacity-15 backdrop-blur-sm">
            <div className="bg-white p-6 lg:w-[450px] w-[350px] rounded-md shadow-xl border border-border">
                <h1 className="text-lg mb-3">Vizualize e Edite</h1>
                {isEditing ? (
                    <>
                        <div className="mb-4">
                            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={editData.nome}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="text" className="block text-sm font-medium text-gray-700">Texto</label>
                            <EditorContent editor={editor} />
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="perecivel" className="flex items-center gap-4">
                                Perecível
                                <input
                                    type="checkbox"
                                    name="perecivel"
                                    checked={task.perecivel}
                                    onChange={handleChangeSelect}
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
                                </label>                        </>
                        )}
                        <button
                            onClick={handleEditSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Salvar
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-200 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-base mb-4 border border-gray-300 p-2 rounded-md overflow-hidden">Nome: {task.nome}</h2>
                        <div className="border border-gray-300 rounded-md p-2 mb-4">
                            <RenderHTML content={task.text} />
                        </div>
                        {task.perecivel && (
                            <>
                                <p className="mb-4 border border-gray-300 p-2 rounded-md flex justify-between">Data de Fabricação: <span className='mr-2'>{formatToBR(task.dataFabricacao)}</span></p>
                                <p className="mb-4 border border-gray-300 p-2 rounded-md flex justify-between">Data de Validade: <span className='mr-2'>{formatToBR(task.dataValidade)}</span></p>
                            </>
                        )}
                        <p className="mb-4 border border-gray-300 p-2 rounded-md flex justify-between">Pasta:<span className='mr-2'>{folderName}</span></p>
                        <button
                            onClick={handleEditClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Editar
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-200 px-4 py-2 rounded"
                        >
                            Fechar
                        </button>
                    </>
                )}
            </div>
        </article>
    );
};
