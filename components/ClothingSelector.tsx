import React from 'react';
import type { Gender } from '../types';
import { MENS_CLOTHING_OPTIONS, WOMENS_CLOTHING_OPTIONS } from '../constants';

interface ClothingSelectorProps {
    selectedGender: Gender;
    onGenderChange: (gender: Gender) => void;
    selectedClothing: string;
    onClothingChange: (clothing: string) => void;
}

export const ClothingSelector: React.FC<ClothingSelectorProps> = ({
    selectedGender,
    onGenderChange,
    selectedClothing,
    onClothingChange
}) => {
    const options = selectedGender === 'male' ? MENS_CLOTHING_OPTIONS : WOMENS_CLOTHING_OPTIONS;

    const genderButtonClasses = (gender: Gender) => 
        `px-4 sm:px-6 py-2 rounded-md text-base sm:text-lg font-bold transition-colors w-1/2 ${
            selectedGender === gender
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`;

    return (
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            <div>
                <label className="block text-gray-700 text-lg sm:text-xl font-bold mb-3">صنف منتخب کریں:</label>
                <div className="flex rounded-lg border border-gray-300 p-1">
                    <button onClick={() => onGenderChange('male')} className={genderButtonClasses('male')}>مرد</button>
                    <button onClick={() => onGenderChange('female')} className={genderButtonClasses('female')}>خواتین</button>
                </div>
            </div>
            <div>
                <label htmlFor="clothingSelector" className="block text-gray-700 text-lg sm:text-xl font-bold mb-3">رسمی لباس کا انتخاب:</label>
                <select
                    id="clothingSelector"
                    value={selectedClothing}
                    onChange={(e) => onClothingChange(e.target.value)}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg bg-white"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};