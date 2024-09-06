import  { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const AddTodo = () => {
  const [text, setText] = useState('');
  const [addTodo, { loading, error }] = useMutation(ADD_TODO);

  const handleValueChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await addTodo({
        variables: { text },
      });
      setText(''); // Clear input after adding
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center mt-4"
      >
        <input
          type="text"
          placeholder="Add a new todo"
          value={text}
          onChange={handleValueChange}
          className="
            border
            border-black
            px-4
            py-2
            rounded-full
            text-black
            font-bold
            text-2xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600
            focus:border-transparent
          "
        />
        <button
          type="submit"
          disabled={loading}
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
            hover:from-pink-600
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default AddTodo;