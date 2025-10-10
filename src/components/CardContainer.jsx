import { useEffect, useState } from 'react'
import Card from './Card.jsx'
import './CardContainer.css'

const CardContainer = ({ mangaList, preferedLanguage, _ref }) => {
    return (
        <div ref={_ref} className='cardContainer'>
            {mangaList.map((m) => (
                <Card key={m.id} manga={m} preferedLanguage={preferedLanguage}/>
            ))}
        </div>
    )
}


export default CardContainer