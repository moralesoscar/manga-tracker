import './TrendContainer.css'

const img_url = import.meta.env.VITE_BACKEND_URL;

const TrendContainer = ({ trendList }) => {
    return (
        <div className='trendContainer'>
            {trendList.map(({ cover_url, manga_id }, index) => (
                <div className='trend' key={manga_id} >
                    <div className='rank'>{index + 1 }</div>
                    <img src={`${img_url}/Cover/${manga_id}/${cover_url}`} />
                </div>
            ))}
        </div>
    )
}


export default TrendContainer