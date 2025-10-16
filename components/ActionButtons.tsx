
import React from 'react';

interface ActionButtonsProps {
    isProcessing: boolean;
    isProcessDisabled: boolean;
    onProcess: () => void;
    generatedImage: string | null;
    error: string | null;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
);

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10 2.5c.862 0 1.682.23 2.433.642a.75.75 0 0 1-.666 1.334A3.997 3.997 0 0 0 10 4a3.997 3.997 0 0 0-1.767.476.75.75 0 0 1-.666-1.334A5.49 5.49 0 0 1 10 2.5ZM8.233 6.023a.75.75 0 0 1 1.054.223 3.997 3.997 0 0 0 1.42 1.42.75.75 0 0 1 .223 1.054l-2.062 4.123-1.264 1.264a.75.75 0 0 1-1.06 0l-.884-.884a.75.75 0 0 1 0-1.06l1.264-1.264 1.23-2.461ZM15 9.25a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V10a.75.75 0 0 1 .75-.75ZM10 12.5a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V13.25a.75.75 0 0 1 .75-.75ZM7.75 10a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5H7.75ZM12.25 10a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5H12.25Z" clipRule="evenodd" />
    </svg>
);


export const ActionButtons: React.FC<ActionButtonsProps> = ({ isProcessing, isProcessDisabled, onProcess, generatedImage, error }) => {

    const handleDownload = () => {
        if (!generatedImage) return;
        const a = document.createElement('a');
        a.href = generatedImage;
        a.download = 'passport_photo.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 text-center">
            <button
                onClick={onProcess}
                disabled={isProcessDisabled || isProcessing}
                className="w-full md:w-auto text-xl font-bold bg-red-600 text-white py-4 px-10 rounded-lg shadow-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
            >
                {isProcessing ? (
                    <>
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        پروسیسنگ جاری ہے...
                    </>
                ) : (
                    <>
                       <SparkleIcon />
                        تصویر کو پاسپورٹ فارمیٹ میں تبدیل کریں
                    </>
                )}
            </button>

            {error && <p className="text-red-600 mt-4 text-center text-lg">{error}</p>}

            {generatedImage && !isProcessing && (
                 <button
                    onClick={handleDownload}
                    className="w-full md:w-auto text-xl mt-6 font-bold bg-blue-600 text-white py-4 px-10 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                >
                    <DownloadIcon />
                    تصویر ڈاؤن لوڈ کریں
                </button>
            )}
        </div>
    );
};
