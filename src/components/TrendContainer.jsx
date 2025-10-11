import './TrendContainer.css'

const img_url = import.meta.env.VITE_BACKEND_URL;

const TrendContainer = ({ trendList }) => {
    return (
        <div className='trendContainer'>
            {trendList.map(({ cover_url, manga_id, search_term }, index) => (
                <div className='trend'>
                    <div className='rank'>{index + 1 }</div>
                    <img key={manga_id} alt={search_term} src={`${img_url}/Cover/${manga_id}/${cover_url}`} />
                </div>
            ))}
        </div>
    )
}


export default TrendContainer