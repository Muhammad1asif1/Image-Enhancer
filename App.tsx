
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ClothingSelector } from './components/ClothingSelector';
import { ActionButtons } from './components/ActionButtons';
import { ResultDisplay } from './components/ResultDisplay';
import { generatePassportPhoto } from './services/geminiService';
import type { Gender } from './types';
import { MENS_CLOTHING_OPTIONS, WOMENS_CLOTHING_OPTIONS } from './constants';

const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<Gender>('male');
    const [selectedClothing, setSelectedClothing] = useState<string>(MENS_CLOTHING_OPTIONS[0].value);

    const handleImageUpload = (base64Image: string) => {
        setOriginalImage(base64Image);
        setGeneratedImage(null);
        setError(null);
    };
    
    const handleGenderChange = (gender: Gender) => {
        setSelectedGender(gender);
        setSelectedClothing(
            gender === 'male' ? MENS_CLOTHING_OPTIONS[0].value : WOMENS_CLOTHING_OPTIONS[0].value
        );
    };

    const processImage = useCallback(async () => {
        if (!originalImage) {
            setError('براہ کرم پروسیس کرنے سے پہلے ایک تصویر اپ لوڈ کریں۔');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            // The `selectedClothing` state already holds the English description (the `value` of the option).
            // Passing it directly to the service.
            const generated = await generatePassportPhoto(originalImage, selectedClothing);
            setGeneratedImage(generated);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setError(`تصویر بنانے میں خرابی: ${err.message}. براہ کرم دوبارہ کوشش کریں یا مختلف تصویر استعمال کریں۔`);
            } else {
                setError('ایک نامعلوم خرابی پیش آگئی۔');
            }
        } finally {
            setIsLoading(false);
        }
    }, [originalImage, selectedClothing]);

    return (
        <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 min-h-screen">
            <Header />

            <main>
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">مرحلہ 1: تصویر اور لباس منتخب کریں</h2>
                    <ImageUploader onImageUpload={handleImageUpload} />
                    {originalImage && (
                         <ClothingSelector
                            selectedGender={selectedGender}
                            onGenderChange={handleGenderChange}
                            selectedClothing={selectedClothing}
                            onClothingChange={setSelectedClothing}
                         />
                    )}
                </div>

                <ActionButtons
                    isProcessing={isLoading}
                    onProcess={processImage}
                    generatedImage={generatedImage}
                    isProcessDisabled={!originalImage}
                    error={error}
                />
                
                <ResultDisplay originalImage={originalImage} generatedImage={generatedImage} />
            </main>
        </div>
    );
};

export default App;
