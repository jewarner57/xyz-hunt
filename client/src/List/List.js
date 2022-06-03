import './List.css';

function List(props) {
    const { placeList } = props

    return (
        <div>
                <div className="List">
                    {placeList.length > 0 ? placeList.map((item) => {
                        return (
                            <div className="ListItem" key={item.letter + item.name}>
                                <h1>{item.letter.toUpperCase()}:</h1>
                                <div className="ListItemDetails">
                                    <p className="itemName">{item.name || "-"}</p>
                              <a href={`https://maps.google.com/?ll=${item.lat},${item.lng}`} rel="noreferrer" target="_blank" className="itemAddress">{item.address}</a>
                                </div>
                            </div>
                        )
                    })
                        :
                        null
                    }
                </div>     
        </div>
    );
}

export default List;
