import React, { useContext} from 'react'
import { Store } from '../../store/index'
import SideListItem from '../SideListItem/SideListItem'
import Style from './SideList.module.scss'

function SideList() {
    const { globalState } = useContext(Store)
    return (
        <div className={Style.sidenav}>
            {
                globalState.related ? globalState.related.map((video) => {
                    return (
                        <SideListItem
                            id={video.id.videoId}
                            key={video.id.videoId}
                            // サムネイルが５種全て無い動画があるので注意 default/medium/standard/high/maxres
                            src={video.snippet.thumbnails.medium.url}
                            title={video.snippet.title}
                        />
                    )
                }) : <span>no data</span>
            }
        </div>
    )
}

export default SideList
