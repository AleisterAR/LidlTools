export default function AddTask({ handleTaskInput, handleAddTask }) {
    return (
        <div className='w-[39.5%] flex jusitfy-center gap-4'>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block basis-[90%] p-2.5 h-[25%]" onInput={handleTaskInput} />
            <button className='btn btn-sm btn-success basis-[10%] text-white h-[2.7rem]' onClick={handleAddTask}>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
            </button>
        </div>
    );
}