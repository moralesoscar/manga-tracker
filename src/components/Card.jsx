import { useEffect, useState } from 'react'
import heart_green from '../assets/heart_green.svg'
import heart_red from '../assets/heart_red.svg'
import './Card.css'

const img_url = import.meta.env.VITE_BACKEND_URL;

const Card = ({ preferedLanguage, 
                manga: { 
                  id,
                  attributes: {
                    title, 
                    description, 
                    links, 
                    status, 
                    year, 
                    tags, 
                    availableTranslatedLanguages
                  }, 
                  relationships
                }}) => {
  
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    console.log(`${name} has been loaded!`)
  }, []);



  return (
    <div className='card'>
      <h3>{title[preferedLanguage]}</h3>
      <img src={`${img_url}/Cover/${id}/${relationships.find(rel => rel.type === "cover_art").attributes.fileName}`} 
           alt={title[preferedLanguage]}/>
      <button className={liked ? 'heart-button liked' : 'heart-button'} onClick={() => setLiked((prevState) => !prevState)}>
        <img src={liked ? heart_red : heart_green}/>
      </button>
    </div>
  )
}


export default Card