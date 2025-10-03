import { useEffect, useState } from 'react'
import Card from './Card.jsx'

const CardContainer = ({ mangaList }) => {
    return (
        <ul>
            {mangaList.map((manga) => (
                <Card key={manga.id} name={manga.attributes.title.en}/>
            ))}
        </ul>
    )
}


export default CardContainer