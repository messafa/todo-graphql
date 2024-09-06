
import TodoList from './components/TodoCard';


function App() {



  return (
    <>
      <div className="container mx-auto p-4 bg-pink-600 rounded-xl
      min-h-screen flex flex-col justify-center items-center
      ">
        <h1 className="text-3xl font-bold text-center">Todo List</h1>
        <TodoList />
      </div>
    </>
  )
}

export default App
