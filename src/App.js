import './App.css';
import { RouterProvider} from 'react-router-dom';
import { Routes } from './Routers/Routes';

function App() {
  return (
    <div className=''>
      <RouterProvider router={Routes}></RouterProvider>
    </div>
  );
}

export default App;
