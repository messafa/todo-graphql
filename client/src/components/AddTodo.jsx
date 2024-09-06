const AddTodo = () => {
  return (
    <div>
      <form
        className="
            flex 
            justify-center 
            items-center 
            mt-4"
      >
        <input
          type="text"
          className="
                    border-2 
                    border-black
                    bg-transparent
                    rounded-lg
                    p-2
                    color-black
                    "
          placeholder={
            "Enter your todo here"
          }

          />
        <button
          type="submit"
          className="
                    bg-gradient-to-r 
                    from-blue-600
                    to-pink-600
                    border
                    px-4 
                    py-2
                    rounded-full
                    text-black
                    font-bold
                    text-2xl
                    ml-2
                    hover:from-pink-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>


        </button>
      </form>
    </div>
  );
};

export default AddTodo;
