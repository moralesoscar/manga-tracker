import { useEffect, useState } from 'react'
import heart_green from '../assets/heart_green.svg'
import heart_red from '../assets/heart_red.svg'
import './Card.css'

const Card = ({ name }) => {
  
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    console.log(`${name} has been loaded!`)
  }, []);

  return (
    <div className='card'>
      <h3>{name}</h3>

      <button className={liked ? 'heart-button liked' : 'heart-button'} onClick={() => setLiked((prevState) => !prevState)}>
        <img src={liked ? heart_red : heart_green}/>
      </button>
    </div>
  )
}


export default Card