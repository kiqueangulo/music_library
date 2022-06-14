import React, { useState } from "react";

function GalleryItem(props) {
    let [view, setView] = useState(false);

    const styling = {
        simple: {
            'width': '25vw',
            'height': '20vh',
            'border': '1px solid black',
            'margin': '2px'
        },
        detail: {
            'width': '80vw',
            'height': '20vh',
            'border': '1px solid black',
            'margin': '2px',
            'backgroundImage': `url(${props.item.artworkUrl100})`,
            'backgroundRepeat': 'no-repeat',
            'backgroundSize': 'cover',
            'color': 'yellow'
        }
    };  

    const simpleView = () => {
        return(
            <div style={styling.simple}>
                <h3>{props.item.trackName}</h3>
                <h4>{props.item.collectionName}</h4>
            </div>
        )
    }
    
    const detailView = () => {
        return (
            <div style={styling.detail}>
                <h2>{props.item.trackName}</h2>
                <h4>{props.item.collectionName}</h4>
                <h3>{props.item.primaryGenreName}</h3>
                <h3>{props.item.releaseDate}</h3>
            </div>
        )
    }

    return (
        <div onClick={() => setView(!view)} style={{display: 'inline-block'}}>
            { view ? detailView() : simpleView() }        
        </div>
    )
};

export default GalleryItem;