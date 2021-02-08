import React, { useRef, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import './tabs.css'

const Tabs = ({ tabs, requestList, requestMoreData, hasMore, loader, activeIndex, select, loading, children }) => {

    const porcAnchoPestana = 100 / tabs.length;

    const childrenArray = React.Children.toArray(children);

    const switchTab = (e, index) => {
        e.preventDefault();
        select(index);
    }

    return (
        <div>
            <div className="material-tabs">
                {
                    tabs.map((pestana, index) => (
                        <a key={index} onClick={(e) => switchTab(e, index)} className="active">{pestana}</a>
                    ))
                }
                <span className="tab-bar" style={{ width: `${porcAnchoPestana}%`, left: `${porcAnchoPestana * activeIndex}%` }}></span>
            </div>
            {
                loading
                    ?
                    'Cargando...'
                    :
                    <InfiniteScroll
                        className="tab-content"
                        dataLength={requestList.length}
                        next={requestMoreData}
                        hasMore={hasMore}
                        loader={loader}>
                        {
                            childrenArray
                        }
                    </InfiniteScroll>

            }
        </div>
    )
}

export default Tabs;
