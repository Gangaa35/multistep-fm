import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

function TextInput<T extends FieldValues>({
  label,
  name,
  register,
  placeholder,
  required,
  error,
}: TextInputProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="flex justify-between items-center text-sm font-medium text-gray-700">
        {label}  {error && <p className="text-red-500 text-[12px] md:text-sm">{error}</p>}
      </label>
      <input
        id={name}
        placeholder={placeholder}
        {...register(name, { required })}
        className="mt-1 block w-full p-sm border border-border rounded-xs shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
}

export default TextInput;
