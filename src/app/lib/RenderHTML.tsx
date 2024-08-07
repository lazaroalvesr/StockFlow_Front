import React from 'react';
import DOMPurify from 'dompurify';

interface RenderHTMLProps {
    content: string;
}

const RenderHTML = ({ content }: RenderHTMLProps) => {
    const cleanHTML = DOMPurify.sanitize(content);

    return (
        <div className='break-words h-32 overflow-auto  ' dangerouslySetInnerHTML={{ __html: cleanHTML }} />
    );
};

export default RenderHTML;
