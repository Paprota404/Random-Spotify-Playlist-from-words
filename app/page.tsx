'use client'
import React, {FormEvent, useRef} from 'react';
import Image from 'next/image'
import { Inter,Montserrat } from 'next/font/google'

import {useState} from 'react';

const inter = Inter({ subsets: ['latin'] });


//Dajesz slowo i ci generuje playliste
//mamy wygenerowac jakos spotify ID from word

export default function Home() {
  if (typeof window !== 'undefined') {
    var URLSearchParams = window.URLSearchParams || require('url').URLSearchParams;
}

  const inputRef = useRef<HTMLInputElement>(null);

  interface Track {
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[], name: string };
   }

   

  function handleSubmit(event:  FormEvent<HTMLFormElement>){
    event.preventDefault();
 
    const randomOffset =  Math.floor(Math.random() * 10);
    const searchQuery = inputRef.current?.value; // Set the search query to "going"
 
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

 const [data, setData] = useState<Track[]>([]);

  
  console.log(data);
 
  //jkak sie da enter to
  
  return (
    
    <main className={` flex flex-col items-center justify-center`}>
      <link rel="icon" href="/music.png" sizes="any" />
      <header className={`${inter.className} text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white m-5`}>Spotify Random Playlists</header>
      <div className={`${inter.className} text-center text-xl md:text-2xl lg:text-3xl text-white`}>Write random word get some songs</div>
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 sm:w-1/2">
        <input ref={inputRef} className="w-22 h-11 rounded-2xl p-3 text-white appearance-none focus:outline-none  placeholder-slate-800 m-5 bg-slate-800" type="text" placeholder="Write some wordssss"></input>
      </form>

      
      <div className="flex flex-col items-start justify-center sm:w-1/2">
              
        {data&&data.map((track: Track, index: number) => (
          <div className="flex m-3" key={index}>
            <Image src={track.album.images[0].url} width={100} height={100} alt="track.album.name"></Image>
          <div className="items-center m-7 ">
            <div className="text-lg lg:text-xl text-white line-clamp-1">{track.name}</div>
            <div className=" text-base lg:text-lg text-white line-clamp-1">{track.artists[0].name}</div>
            <p className="text-xs lg:text-base text-white line-clamp-1">{track.album.name}</p>
          </div>
          </div>
        ))}
      </div>
    </main>
  )
}

//user type slowo i leci to jako request do API i pokazuje na frontend 
