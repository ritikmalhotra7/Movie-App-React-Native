import axios from 'axios';
import {api_key} from '../constants';


const BASE_URL = "https://api.themoviedb.org/3"
const trendingMoviesEndpoint=`${BASE_URL}/trending/movie/day?api_key=${api_key}`;
const upcomingMoviesEndpoint=`${BASE_URL}/movie/upcoming?api_key=${api_key}`;
const topRatedMoviesEndpoint=`${BASE_URL}/movie/top_rated?api_key=${api_key}`;
const searchMoviesEndpoint = `${BASE_URL}/search/movie?api_key=${api_key}`;


// movie
const movieDetailsEndpoint = id=> `${BASE_URL}/movie/${id}?api_key=${api_key}`;
const movieCreditsEndpoint = id=> `${BASE_URL}/movie/${id}/credits?api_key=${api_key}`;
const similarMoviesEndpoint = id=> `${BASE_URL}/movie/${id}/similar?api_key=${api_key}`;

// person
const personDetailsEndpoint = id=> `${BASE_URL}/person/${id}?api_key=${api_key}`;
const personMoviesEndpoint = id=> `${BASE_URL}/person/${id}/movie_credits?api_key=${api_key}`;

export const image500 = posterPath=> posterPath? `https://image.tmdb.org/t/p/w500`+posterPath : null;
export const image342 = posterPath=> posterPath? `https://image.tmdb.org/t/p/w342`+posterPath : null;
export const image185 = posterPath=> posterPath? `https://image.tmdb.org/t/p/w185`+posterPath : null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


const apiCall = async(endPoint,params)=>{
    const options ={
        method:'GET',
        url: endPoint,
        params:params?params:{}
    }
    try{
        const response = await axios.request(options)
        return response.data;
    }catch(error){
        console.log('errors',error)
        return {}
    }
}
export const fetchTrendingMovies = ()=>{
    return apiCall(endPoint=trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(endPoint=upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(endPoint=topRatedMoviesEndpoint);
}
// movie screen apis
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}

// person screen apis
export const fetchPersonDetails = (personId)=>{
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId)=>{
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}