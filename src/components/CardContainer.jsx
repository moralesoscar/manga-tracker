import { useEffect, useState } from 'react'
import Card from './Card.jsx'

const CardContainer = ({ mangaList, preferedLanguage }) => {
    return (
        <ul>
            {mangaList.map((m) => (
                <Card key={m.id} manga={m} preferedLanguage={preferedLanguage}/>
            ))}
        </ul>
    )
}


export default CardContainer