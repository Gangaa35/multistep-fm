import React from 'react';

interface SuccessProps {
    message: string;
}

const Success: React.FC<SuccessProps> = ({ message }) => {
    return (
        <div className="flex flex-col gap-sm items-center py-xl md:h-full md:justify-center">
            <img className='w-[64px] h-[64px]' src="/success.svg" />
            <div className='text-xl font-semibold text-primary'>Thank you!</div>
            <div className='text-text text-center leading-6'>{message}</div>
        </div>
    )
}

export default Success;