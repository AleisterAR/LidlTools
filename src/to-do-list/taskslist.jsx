export default function TasksList({ tasks }) {
    return (
        <div className='w-[39.5%] flex justify-center gap-4'>
            <div className="relative">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <tbody>
                        {tasks.map((task) => (
                            <tr className="bg-white" key={task.id}>
                                <td className="px-6 py-4">
                                    <div className="form-control">
                                        <input type="checkbox" checked={task.finished} className="checkbox w-5 h-5 rounded [--chkbg:theme(colors.blue.600)] " />
                                    </div>
                                </td>
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {task.taskname}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="btn btn-sm btn-success h-[2.25rem] w-[3.75rem] text-white">Edit</button>
                                </td>
                                <td className="px-6 py-4">
                                <button className="btn btn-sm btn-error h-[2.25rem] text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}