import React from 'react'
import ImgVacio from "../../img/reading-sitting.svg";
import InfiniteScroll from 'react-infinite-scroll-component'
import './tabs.css'

const Tabs = ({ tabs, requestList, requestMoreData, hasMore, loader, activeIndex, select, initialLoading, loadingMore, children }) => {

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

                initialLoading
                    ?
                    loader
                    :
                    requestList && requestList.length > 0
                        ?
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
                        :
                        <div>
                            <img src={ImgVacio} className="img-vacio" alt="img-vacio" />
                            <h2 className="text-align-center m-0 text-empty">Oops! aún nada por aquí</h2>
                        </div>
            }
        </div >
    )
}

export default Tabs;
