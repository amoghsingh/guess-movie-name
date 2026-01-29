import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import About from './pages/about';
import ThemeWrapper from './components/themeWrapper';
import ProtectedRoute from './components/protectedRoute';
import Header from './components/header/header';
import { ApiInterceptorProvider } from './services/ApiInterceptorProvider';
import { AuthProvider } from './context/context';
import Quiz from './pages/quiz';
import Result from './pages/result';

function App() {
  return (
   
     <ThemeWrapper>
      <div className='app'>
     <Router> 
      <AuthProvider>
      <ApiInterceptorProvider>
       
      <Header/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route element={<ProtectedRoute/>}> 
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/result' element={<Result/>} />
        </Route>
      </Routes>
      </ApiInterceptorProvider>
      </AuthProvider>
     </Router>
     </div>
     </ThemeWrapper>
    
  );
}

export default App;
