'use client'
import React, {useRef} from 'react';
import Image from 'next/image'
import { Inter,Montserrat } from 'next/font/google'
import { URLSearchParams } from 'url';
import {useState,useEffect} from 'react';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({subsets:['latin']});

//Dajesz slowo i ci generuje playliste
//mamy wygenerowac jakos spotify ID from word

export default function Home() {
  var URLSearchParams = window.URLSearchParams || require('url').URLSearchParams;

  const inputRef = useRef();

  


  function handleSubmit(event){
    event.preventDefault();
 
    const randomOffset =  Math.floor(Math.random() * 10);
    const searchQuery = inputRef.current.value; // Set the search query to "going"
 
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchQuery}&offset=${randomOffset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();
      
      setData(result.tracks.items.slice(0,10));
      
    };
   
    fetchData();
  }

  const getAccessToken = async () => {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    const data = await response.json();
    return data.access_token;
  };

 //chce narazie dostać jakies nuty z wyrazu i wykminic jak go przekonwertowac na request

  const [data, setData] = useState(null);

  
  console.log(data);
 
  //jkak sie da enter to
  
  return (
    <main className={` flex flex-col items-center justify-center`}>
      <header className={`${inter.className} text-6xl m-5`}>Spotify Random Playlists</header>
      <div className={`${inter.className} text-3xl`}>Write random word get some playlist bro</div>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
        <input ref={inputRef} className="w-22 h-11 rounded-2xl p-3 appearance-none focus:outline-none  placeholder-slate-800 m-5 bg-slate-800" type="text" placeholder="Write some wordssss"></input>
      </form>

      
      <div className="flex flex-col items-start justify-center w-1/2">
              
        {data&&data.map((track, index) => (
          <div className="flex m-3" key={index}>
            <Image src={track.album.images[0].url} width={150} height={150} alt="track.album.name"></Image>
          <div className="items-center m-7">
            <div className="text-3xl">{track.name}</div>
            <div className="text-2xl">{track.artists[0].name}</div>
            <p className="text-xl">{track.album.name}</p>
          </div>
          </div>
        ))}
      </div>
    </main>
  )
}

//user type slowo i leci to jako request do API i pokazuje na frontend 
