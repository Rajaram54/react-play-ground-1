import React, {useState} from 'react';

const Accordion = ({items}) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClicked = (index)=> {
        setActiveIndex(index);
    }

    const list = items.map((val, index)=>{
        let activeClass = index == activeIndex ? 'active' : '';
        return <React.Fragment key={index}>
            <div className={`title ${activeClass}`} onClick={() => onTitleClicked(index)}>
                <i className="dropdown icon"/>
                {val.title}
            </div>
            <div className={`content ${activeClass}`}>
                {val.content}
            </div>
        </React.Fragment>
    })
    return (
        <div className="ui styled accordion">
            {list}
       <h1>Active Index: {activeIndex}</h1>
        </div>
    )
}

export default Accordion;