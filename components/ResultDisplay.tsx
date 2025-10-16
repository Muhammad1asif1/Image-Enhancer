
import React from 'react';

interface ResultDisplayProps {
    originalImage: string | null;
    generatedImage: string | null;
}

const ImageBox: React.FC<{ title: string; imageUrl: string | null; placeholder: string; }> = ({ title, imageUrl, placeholder }) => (
    <div className="flex-1 p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center text-center">
        <h3 className="font-semibold text-xl mb-3 text-gray-700">{title}</h3>
        {imageUrl ? (
            <img src={imageUrl} alt={title} className="max-w-full max-h-[350px] object-contain rounded-md shadow-sm" />
        ) : (
            <p className="text-gray-500">{placeholder}</p>
        )}
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
    if(!originalImage) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">مرحلہ 2: نتیجہ</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <ImageBox 
                    title="اوریجنل تصویر" 
                    imageUrl={originalImage} 
                    placeholder="یہاں اپ لوڈ کی گئی تصویر نظر آئے گی"
                />
                <ImageBox 
                    title="AI سے تیار شدہ تصویر" 
                    imageUrl={generatedImage} 
                    placeholder="تبدیل شدہ تصویر یہاں ظاہر ہو گی"
                />
            </div>
        </div>
    );
};
