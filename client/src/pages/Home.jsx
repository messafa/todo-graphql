import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

const Home = () => {
  return (
    <>
      <div className="
      container 
      mx-auto 
      p-4 
     bg-whit
       min-h-screen 
       flex flex-col 
       justify-start 
       items-center 
       bg-gradient-to-r 
       from-pink-600 
       to-blue-600
       ">
        <div>
            <h1 className="
        text-3xl 
        font-bold 
        font-serif
        text-center
        ">Todo List</h1>
        <AddTodo />
        </div>
        <TodoList />
        
      </div>
    </>
  );
};

export default Home;

{
  /* <div
className="container mx-auto p-4 bg- rounded-xl
min-h-screen flex flex-col justify-start items-center
bg-gradient-to-r from-green-400 to-blue-500
"
>
<h1 className="text-3xl font-bold text-center">Todo List</h1>
<TodoList />
</div> */
}
