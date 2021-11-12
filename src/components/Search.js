import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchWidget = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [list, setList] = useState([])

    useEffect(() => {

        const search = async () => {

            const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: searchTerm
                }
            })
            setList(data.query.search);
        }

        if (searchTerm && !list.length) {
            search();
        } else {
            const timeoutId = setTimeout(() => {
                if (searchTerm) {
                    search();
                }
            }, 500);

            return () => {
                clearTimeout(timeoutId);
            }
        }

    }, [searchTerm])

    const rendedList = list.map((result, i) => {
        return (
            <div className="item" key={i}>
                <div className="right floated content">
                    <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        )
    })
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter the search</label>
                    <input type="text" className="input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>
            <div className="ui list">
                {rendedList}

            </div>
        </div>
    )
}

export default SearchWidget