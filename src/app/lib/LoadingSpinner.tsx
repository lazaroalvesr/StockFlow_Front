import Image from 'next/image';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Image src="/icon/spinner.gif" alt="Loading..." width={60} height={60}/>
        </div>
    );
};

export default LoadingSpinner;
