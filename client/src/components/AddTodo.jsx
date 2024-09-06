


const AddTodo = () => {
    return (
        <div>
            <form className="flex justify-center items-center mt-4">
                <input
                    type="text"
                    className="border-2 border-gray-400 p-2"
                    placeholder="Add a new todo"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
}

export default AddTodo;
