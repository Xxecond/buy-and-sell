"use client"
import Image from "next/image"
import { useEffect, useState } from "react";

export default function Slider (){
const [index, setIndex] = useState(0);
    const  cards = [
        {id:1, image:"/assets/bok.png"},
        {id:2, image:"/assets/bncPic.JPG"},
        {id:3, image:"/assets/logo.JPG"},
    ]

    useEffect(() =>{
        const interval = setInterval(()=> {
            setIndex((prev) => (prev + 1) % cards.length);
        }, 5000);

        return  () => clearInterval(interval);
    }, [])
  
        return(
        <div className="overflow-hidden w-full h-75 relative">
            <ol className="slider-track flex h-full"
                style={{ "--index": index } as React.CSSProperties} >
                {[...cards, ...cards].map((card, i) =>(
                    <li key={i}
                    className="max-w-[50%] h-65 bg-red-900 text-white flex items-center justify-center rounded-xl"
                    ><div>
                    <Image
                    src={card.image}
                    alt="cards-img" 
                    fill/></div></li>))}
            </ol>

        </div>
    )
}