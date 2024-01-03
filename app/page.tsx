'use client'
import React, {useRef} from 'react';
import Image from 'next/image'
import { Inter,Montserrat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({subsets:['latin']});

//Dajesz slowo i ci generuje playliste

export default function Home() {

  const inputRef = useRef()

  function handleSubmit(event){
    event.preventDefault();
    console.log(inputRef.current.value)
  }

  //jkak sie da enter to
  
  return (
    <main className={` flex flex-col items-center justify-center`}>
      <header className={`${inter.className} text-6xl m-5`}>Spotify Random Playlists</header>
      <div className={`${inter.className} text-3xl`}>Write random word get some playlist bro</div>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
        <input ref={inputRef} className="w-22 h-11 rounded-2xl p-3 appearance-none focus:outline-none  placeholder-slate-800 m-5 bg-slate-800" type="text" placeholder="Write some wordssss"></input>
      </form>
    </main>
  )
}

//jak sie wpisze i da enter jakies slowo to kurde daje nuty normalnie
