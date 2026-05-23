const OutputDataHeader = () => {

    return (
        <div className='w-full flex flex-col items-center py-4'>
            {/* Upper Star Line */}
            <div className="w-full overflow-hidden whitespace-nowrapselect-none tracking-tighter">
                {"=".repeat(200)}
            </div>

            <h1 className='text-2xl md:text-3xl font-bold text-center my-6 text-gray-700 leading-tight uppercase px-4'>
                W++ Token Analyzer - Statistical Report
            </h1>

            {/* Lower Star Line */}
            <div className="w-full overflow-hidden whitespace-nowrap select-none tracking-tighter">
                {"=".repeat(200)}
            </div>
        </div>
    );
};

export default OutputDataHeader;