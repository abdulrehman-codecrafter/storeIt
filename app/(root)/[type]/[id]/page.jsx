"use client"
import Card from '@/components/Card';
import { BlurFade } from '@/components/magicui/blur-fade';
import { useFilesContext } from '@/contexts/filesContext';
import { use, useEffect, useState } from 'react';

export default function Page({ params }) {
    const id = use(params).id;
    const [file, setFile] = useState(null);
    const { files } = useFilesContext();

    useEffect(() => {
        const filteredFile = files?.find((file) => file._id === id);
        setFile(filteredFile || null); 
    }, [id, files]); 

    return (
        <>
            {file ? (
                <BlurFade key={file._id} delay={0.05} inView>
                    <Card file={file} />
                </BlurFade>
            ) : (
                <p>No file found</p> 
            )}
        </>
    );
}