import { useEffect, useState } from 'react'
import heart_green from '../assets/heart_green.svg'
import heart_red from '../assets/heart_red.svg'
import article_green from '../assets/article_green.svg'
import pen_green from '../assets/pen_green.svg'
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
  
  return (
    <div className='card'>
      <h3 className='manga-title' title={title[preferedLanguage]}>{title[preferedLanguage]}</h3>
      <div className='manga-cover'>
        <img alt={title[preferedLanguage]}
          src={`${img_url}/Cover/${id}/${relationships.find(rel => rel.type === "cover_art").attributes.fileName}`} />
      </div>
      <p>{year}</p>
      <div style={{display: 'flex',  flexDirection: 'row', alignItems: 'center'}}>
        {
          relationships.find(rel => rel.type === "author").attributes.name === 
          relationships.find(rel => rel.type === "artist").attributes.name ? 
          <div style={{display: 'flex',  flexDirection: 'row'}}>
            <img src={article_green}/>
            <img src={pen_green}/>
            <p>{relationships.find(rel => rel.type === "author").attributes.name}</p> 
          </div> :
          <div>
            <div style={{display: 'flex',  flexDirection: 'row'}}>
              <img src={article_green}/><p>{relationships.find(rel => rel.type === "author").attributes.name}</p>
            </div>
            <div style={{display: 'flex',  flexDirection: 'row'}}>
              <img src={pen_green}/><p>{relationships.find(rel => rel.type === "artist").attributes.name}</p>
            </div>
          </div>
        }
      </div>
      <button className={liked ? 'heart-button liked' : 'heart-button'} onClick={() => setLiked((prevState) => !prevState)}>
        <img src={liked ? heart_red : heart_green}/>
      </button>
    </div>
  )
}


export default Card