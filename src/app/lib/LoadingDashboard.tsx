export const LoadingDashboard = () => {
    return (
        <div>
            <div className="m-4 flex flex-col">
                <h2 className="text-2xl w-72 bg-slate-200 animate-pulse h-12 rounded-2xl ml-4"></h2>
                <div className="lg:w-[1150px] md:w-[700px] flex gap-4 overflow-x-auto w-80">
                    <div className="flex  p-4 gap-4">
                        <div className="flex bg-gray-200 lg:w-44 lg:h-44 animate-pulse h-36 w-36 border-border border rounded-2xl shadow-md cursor-pointer hover:scale-110 transition .3s ease-in"></div>
                        <div className="flex bg-gray-200 lg:w-44 lg:h-44 h-36 w-36  animate-pulse  border-border border rounded-2xl shadow-md cursor-pointer hover:scale-110 transition .3s ease-in"></div>
                        <div className="flex bg-gray-200 lg:w-44 lg:h-44 h-36 w-36  animate-pulse  border-border border rounded-2xl shadow-md cursor-pointer hover:scale-110 transition .3s ease-in"></div>
                        <div className="flex bg-gray-200 lg:w-44 lg:h-44 h-36 w-36  animate-pulse  border-border border rounded-2xl shadow-md cursor-pointer hover:scale-110 transition .3s ease-in"></div>
                        <div className="flex bg-gray-200 w-36 animate-pulse  border-border border rounded-2xl shadow-md cursor-pointer hover:scale-110 transition .3s ease-in"></div>
                    </div>
                </div>
            </div>
            <div className="ml-8 flex gap-4 flex-col">
                <div className="flex justify-between mr-12 lg:mr-24 md:mr-20">
                    <div className="text-2xl w-32 bg-slate-200 animate-pulse h-12 rounded-2xl"></div>
                    <div className="text-2xl w-20 bg-slate-200 animate-pulse h-12 rounded-2xl"></div>
                </div>
                <div className="flex gap-6 flex-col">
                    <p className="flex bg-gray-200 lg:w-[1100px] w-72 md:w-[700px] animate-pulse p-4 border-border border rounded-md shadow-md cursor-pointer "></p>
                    <p className="flex bg-gray-200 lg:w-[1100px] w-72  md:w-[700px] animate-pulse p-4 border-border border rounded-md shadow-md cursor-pointer "></p>
                    <p className="flex bg-gray-200 lg:w-[1100px] w-72  md:w-[700px] animate-pulse p-4 border-border border rounded-md shadow-md cursor-pointer "></p>
                </div>
            </div>
        </div>
    )
}