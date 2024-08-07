import './styles.css'

import BulletList from '@tiptap/extension-bullet-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import Image from 'next/image'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import HardBreak from '@tiptap/extension-hard-break'

interface TiptapProps {
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group flex gap-4 justify-center border border-gray-300 rounded-md mb-2 h-10 m-auto items-center">
                <button disabled></button>
                <button 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active bg-gray-200 rounded-md px-2 h-8' : ''}>
                    <Image
                        src="/icon/h1.svg"
                        alt='icone H1'
                        width={20}
                        height={20}
                    />
                </button>
                <button 
                    onClick={() => editor.chain().focus().toggleBulletList().run()} 
                    className={editor.isActive('bulletList') ? 'is-active bg-gray-200 rounded-md px-2 h-8' : ''}>
                    <Image
                        src="/icon/Li.svg"
                        alt='icone Li'
                        width={20}
                        height={20}
                    />
                </button>
                <button 
                    onClick={() => editor.chain().focus().setHardBreak().run()}>
                    <Image
                        src="/icon/space.svg"
                        alt='icone space'
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </div>
    )
}

const Tiptap = ({ onChange }: TiptapProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            BulletList,
            Paragraph,
            HardBreak,
            Heading.configure({
                levels: [1],
            }),
        ],
        editorProps: {
            attributes: {
                class: "editor-content" 
            }
        },
        content: '',
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            onChange(content);
        },
    });

    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
}

export default Tiptap;
