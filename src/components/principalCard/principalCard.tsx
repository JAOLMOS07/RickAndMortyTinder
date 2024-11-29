'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Props {
  title: string;
  count: number;
  redirectTo: string;
  image?: string;
}

export default function PrincipalCard({ title, count, image, redirectTo }: Props) {
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(count / 100); 
    const interval = setInterval(() => {
      start += increment;
      if (start >= count) {
        setCurrentCount(count);
        clearInterval(interval);
      } else {
        setCurrentCount(start);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <Link
      href={redirectTo}
      className="bg-white  rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden group"
    >
     
      {image && (
        <div className="h-32 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

  
      <div className={`p-4 text-center flex flex-col items-center ${image ? '' : 'h-32'}`}>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      
        <p className="text-sm text-gray-500 mt-1">{currentCount} elementos</p>
      </div>
    </Link>
  );
}
