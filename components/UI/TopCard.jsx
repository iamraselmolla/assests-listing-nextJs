import React from 'react'

const TopCard = ({title, image}) => {
  return (
    <div className='bg-secondary h-80  flex flex-col justify-center items-center bg-gradient-to-tr from-[#61045f] to-[#aa076b]'
        style={{background: `${image && `url(${image.src}) no-repeat center center/cover`}`}}
      >
            <h2 className='text-4xl font-bold text-white uppercase text-center h-full bg-secondary bg-opacity-30 w-full flex justify-center items-center'>{title}</h2>
    </div>
  )
}

export default TopCard
