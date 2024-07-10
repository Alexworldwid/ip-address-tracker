import React from 'react';
import { IPData } from '../utils/types';
import Image from 'next/image';
import iconArrow from '../../../public/images/icon-arrow.svg'

interface InputIpInfoProps {
    ip: string;
    setIp: React.Dispatch<React.SetStateAction<string>>;
    handleFetchData: () => void;
    ipData: IPData | null;
    loading: boolean;
    error: Error | null;
}

const InputIpInfo: React.FC<InputIpInfoProps> = ({ ip, setIp, handleFetchData, ipData, loading, error }) => {

    return (
        <section className="absolute top-10 lg:top-20 left-1/2 -translate-x-1/2 w-5/6 z-[1000]" role="region">
            <h1 className="text-center mb-6 text-2xl font-semibold font-sans text-white">IP Address Tracker</h1>
            <div className="relative w-full flex items-center justify-center">
                <div className="relative w-full lg:w-[40vw]">
                    <input 
                    type="text" 
                    placeholder="Enter Your IP Address"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    aria-label="Enter IP Address"
                    className="w-full p-5 rounded-2xl lg:max-w-[40vw]" />
                    
                    <button 
                    className="absolute bg-black z-30 top-0 right-0 bottom-0 w-16 rounded-tr-2xl rounded-br-2xl flex items-center justify-center hover:bg-opacity-70 focus:border-spacing-2" 
                    onClick={handleFetchData} 
                    disabled={loading} 
                    aria-label="Fetch IP Data">
                        {loading ? <span className='loader'></span> : <Image src={iconArrow} width={20} height={20} alt="icon-Arrow" priority />}
                    </button>
                </div>
                </div>
            {error && <p className='text-white'>{error.message}</p>}

            {!error && ipData && (
                <div aria-label='ip information' className='w-full bg-white mt-6 lg:mt-12 rounded-2xl p-6 lg:grid lg:grid-cols-4 lg:py-20 lg:px-10'>
                    <p className='flex flex-col items-center mb-4 lg:border-r-4 '>
                        <span className='font-bold font-mono tracking-wide text-lg text-opacity-80 text-slate-700'>IP ADDRESS</span>
                        <span className='text-2xl font-bold'>{ipData.ip}</span>
                    </p>

                    <p className='flex flex-col items-center mb-4 lg:border-r-4 text-left'>
                        <span className='font-bold font-mono tracking-wide text-lg text-opacity-80 text-slate-700'>LOCATION</span>
                        <span className='text-2xl font-bold'>{ipData.location.city}, {ipData.location.country}</span>
                    </p>

                    <p className='flex flex-col items-center mb-4 lg:border-r-4'>
                        <span className='font-bold font-mono tracking-wide text-lg text-opacity-80 text-slate-700'>TIMEZONE</span>
                        <span className='text-2xl font-bold'>{ipData.location.timezone}</span>
                    </p>

                    <p className='flex flex-col items-center'>
                        <span className='font-bold font-mono tracking-wide text-lg text-opacity-80 text-slate-700'>ISP</span>
                        <span className='text-2xl font-bold'>{ipData.isp}</span>
                    </p>
                </div>
            )}
        </section>
    );
};

export default InputIpInfo;