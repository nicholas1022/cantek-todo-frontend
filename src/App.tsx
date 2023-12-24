import Title from './components/Title';
import TodoList from './components/TodoList'
import "./styles/main.css";

function App() {
  // const [count, setCount] = useState(0)
  console.log("Prd / Dev: " + import.meta.env.MODE);
  console.log("Prd?: " + import.meta.env.PROD);
  console.log("Dev?: " + import.meta.env.DEV);
  return (
    <div>
      <Title />
      <TodoList />
    </div>
  )
}

export default App
