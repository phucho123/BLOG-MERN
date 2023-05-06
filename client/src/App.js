import './App.css';
import { Login } from './components/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Layout } from './components/Layout';
import { Register } from './components/Register';
import { UserProvider } from './contexts/UserContext';
import { CreatePost } from './pages/CreatePost';
import { IndexPage } from './pages/IndexPage';
import { PostPage } from './pages/PostPage';
import { EditPost } from './pages/EditPost';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
