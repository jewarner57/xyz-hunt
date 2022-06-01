import './List.css';
import { useState } from 'react'

function List(props) {
    const { placeList, loading } = props

    return (
        <div>
            {!loading ?
                <div className="List">
                    {placeList.length > 0 ? placeList.map((item) => {
                        return (
                            <div className="" key={item.letter + item.name}>
                                <h1>{item.letter.toUpperCase()}:</h1>
                                <p>{item.name || "-"}</p>
                            </div>
                        )
                    })
                        :
                        null
                    }
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    );
}

export default List;
