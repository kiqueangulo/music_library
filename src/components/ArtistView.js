import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';

function ArtistView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ artistData, setArtistData ] = useState([]);

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4000/album/${id}`);
            const resData = await response.json();

            setArtistData(resData.results);
        }

        fetchData();
    }, [id]);

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album');

    const renderAlbums = justAlbums.map((album, index) => {
        return (
            <div key={index}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        );
    });

    return (
        <div>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderAlbums}
        </div>
    );
}

export default ArtistView;