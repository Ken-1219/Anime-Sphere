import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import '../css/animeCard.css';

function AnimeCard(anime) {
    return (
        <div className="animeCard">
            <Link to={`/anime/${anime.mal_id}`} state={{ id: anime.mal_id }}>
                <img src={anime.image} className='animeCover' alt="anime-cover" />
            </Link>
            <div className="anime-body">
                <Link to={`/anime/${anime.mal_id}`} state={{ id: anime.mal_id }}>
                    <h4 className="anime-title" >{anime.title}</h4>
                </Link>
                {anime.score !== null ? (
                    <div classNames="react-stars">
                        <ReactStars
                            count={5}
                            value={anime.score / 2}
                            edit={false}
                            isHalf={true}
                        />
                    </div>
                ) : (
                    <p>N/A</p>
                )}
            </div>
        </div>
    )
}

export default AnimeCard;