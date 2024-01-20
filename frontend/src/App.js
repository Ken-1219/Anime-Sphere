import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnimeDetails from './components/AnimeDetails';
// import Footer from './components/Footer'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favourites from './pages/Favourites';
import Home from './pages/Home';


function App() {

    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/anime/:mal_id'
                        element={<AnimeDetails />}
                    />
                    <Route
                        path='/my-anime'
                        element={<Favourites />}
                    />
                    <Route
                        path='/login'
                        element={<Login />}
                    />
                    <Route
                        path='/signup'
                        element={<Signup />}
                    />
                    <Route
                        path='*'
                        element={<Home />}
                    />
                </Routes>
            </BrowserRouter>
            {/* <Footer /> */}
        </div>
    )
}

export default App