import React from 'react'
import {IMAGES} from '../assets/Images';
import './styles.css';

export const Loader = () => {
  return (
    <>
    <div className='Loader-container'>
      <img className='Loader-img' src={IMAGES.loaderImage} alt="loader" />
    </div>
    </>
  )
}

