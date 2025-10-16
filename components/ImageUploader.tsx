
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
    onImageUpload: (base64Image: string) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = useCallback(async (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                try {
                    const base64 = await fileToBase64(file);
                    onImageUpload(base64);
                } catch (error) {
                    console.error("Error converting file to base64:", error);
                }
            }
        }
    }, [onImageUpload]);

    const handleDragEvent = (e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(dragging);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvent(e, false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileChange(files);
        }
    };
    
    return (
        <>
            <input
                type="file"
                id="fileSelector"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files)}
            />
            <div
                id="imageInput"
                onClick={() => document.getElementById('fileSelector')?.click()}
                onDragEnter={(e) => handleDragEvent(e, true)}
                onDragLeave={(e) => handleDragEvent(e, false)}
                onDragOver={(e) => handleDragEvent(e, true)}
                onDrop={handleDrop}
                className={`border-2 dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-lg text-gray-700 font-semibold">تصویر اپ لوڈ کرنے کے لیے یہاں کلک کریں یا ڈریگ کریں</p>
                <p className="text-sm text-gray-500 mt-1">(چہرے اور لباس کی تبدیلی AI ماڈل کی پابندیوں کی وجہ سے محدود ہو سکتی ہے)</p>
            </div>
        </>
    );
};
