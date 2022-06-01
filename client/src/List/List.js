import './List.css';
import { useState } from 'react'
import LoadingCircle from '../LoadingCircle/LoadingCircle';

function List(props) {
    const { placeList, loading, err } = props

    return (
        <div>
            {!loading ?
                <div className="List">
                    {placeList.length > 0 ? placeList.map((item) => {
                        return (
                            <div className="ListItem" key={item.letter + item.name}>
                                <h1>{item.letter.toUpperCase()}:</h1>
                                <div className="ListItemDetails">
                                    <p className="itemName">{item.name || "-"}</p>
                                    <a href={`https://maps.google.com/?ll=${item.lat},${item.lng}`} target="_blank" className="itemAddress">{item.address}</a>
                                </div>
                            </div>
                        )
                    })
                        :
                        null
                    }
                </div>
                :
                <div>
                    <LoadingCircle />
                    <p className='loadingText'>Loading...</p>
                </div>
            }
            {err ? <p className="errorText">Error: {err}</p> : null}
        </div>
    );
}

export default List;
