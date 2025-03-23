import React from 'react'

import bannerImg from "../../assets/banner.jpg"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse  justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>Welcome to The Kitab Art!</h1>
            <p className='mb-10'>At The Kitab Art, we believe that every book is a masterpiece, and every reader is an artist crafting their own imagination. Our bookstore offers a carefully curated collection of books across various genres — from timeless classics to contemporary bestsellers, thought-provoking non-fiction to captivating fiction.</p>

            {/* <button className='btn-primary'>Subscribe</button> */}
        </div>

       
    </div>
  )
}

export default Banner