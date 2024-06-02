import { configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { API_BASE_URL, API_KEY, BACKEND_URL } from '../utils/secrets'
import axios from "axios";

const initialState= {
    movies: [],
    genresLoaded: false,
    genres: []
}

const createArrayFromRawData=(array, moviesArray, genres)=>{
    array.forEach((movie) => {
        const movieGenres= [];
        movie.genre_ids.forEach((genre)=>{
            const name=genres.find(({id})=>id===genre);
            if(name)
                movieGenres.push(name.name)
        });
        if(movie.backdrop_path){
            moviesArray.push({
                id: movie.id,
                name: movie.original_name? movie.original_name: movie.original_title,
                image: movie.backdrop_path,
                genres:movieGenres.slice(0,3)
            })
        }
    });
}

const getRawData= async(api,genres,paging)=>{
    const moviesArray= [];
    for(let i=1; moviesArray.length<60 && i<10; i++)
    {
        const {data:{results}}= await axios.get(
            `${api}${paging?`&page=${i}`:""}`
        );
        createArrayFromRawData(results,moviesArray,genres);
    }
    return moviesArray
}

export const fetchMovies= createAsyncThunk("netflix/trending",async({type},thunkAPI)=>{
    const {netflix:{genres}}=thunkAPI.getState();
    return getRawData(`${API_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
});

export const fetchDataByGenre= createAsyncThunk("netflix/moviesByGenres",async({genre, type},thunkAPI)=>{
    const {netflix:{genres}}=thunkAPI.getState();
    return getRawData(
        `${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres
    );
});
// return getRawData(`${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres,true);

export const getGenres= createAsyncThunk("netflix/genres", async()=>{
    const {data: {genres}}= await axios.get(`${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
})

export const getUserPlaylist=createAsyncThunk("netflix/getPlaylist",async(email)=>{
    const {data: {movies}}= await axios.get(`${BACKEND_URL}/api/user/liked/${email}`);
    return movies;
})

export const removeFromPlaylist=createAsyncThunk("netflix/deleteFromPlaylist",async({movieID,email})=>{
    const {data: {movies}}= await axios.put(`${BACKEND_URL}/api/user/delete`,{
        email,movieID
    });
    return movies;
})

const NetflixSlice= createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getGenres.fulfilled,(state,action)=>{
            state.genres= action.payload;
            state.genresLoaded=true;
        })
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies= action.payload;
        })
        builder.addCase(fetchDataByGenre.fulfilled,(state,action)=>{
            state.movies= action.payload;
        })
        builder.addCase(getUserPlaylist.fulfilled,(state,action)=>{
            state.movies= action.payload;
        })
        builder.addCase(removeFromPlaylist.fulfilled,(state,action)=>{
            state.movies= action.payload;
        })
    }
})

export const store=configureStore({
    reducer:{
        netflix: NetflixSlice.reducer
    }
})