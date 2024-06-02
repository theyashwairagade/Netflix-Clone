import React from 'react'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Netflix from "./pages/Netflix"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Player from './pages/Player'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import UserPlaylist from './pages/UserPlaylist'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/signup' element={<Signup/>}/>
    <Route exact path='/player' element={<Player/>}/>
    <Route exact path='/movies' element={<Movies/>}/>
    <Route exact path='/tv' element={<TVShows/>}/>
    <Route exact path='/mylist' element={<UserPlaylist/>}/>
    <Route exact path='/' element={<Netflix/>}/>
    </Routes>
    </BrowserRouter>
  )
}
