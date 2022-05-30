import './List.css';
import { useState } from 'react'

function List(props) {
    const { placeList } = props
    const [loading, setLoading] = useState(false)

    return (
        <div>
            {!loading ?
                <div className="List">
                    {placeList.length > 0 ? placeList.map((item) => {
                        return <div>{item.name}</div>
                    })
                        :
                        <p>Nothing to Show</p>
                    }
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    );
}

export default List;
