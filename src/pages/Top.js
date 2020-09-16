import React, { useEffect, useContext } from 'react'
import Layout from '../comoponents/Layout/Layout'
import { fetchPopularData}  from '../apis/index'
import { Store } from '../store/index'
import VideoGrid from '../comoponents/VideoGrid/VideoGrid'
import VideoGridItem from '../comoponents/VideoGridItem/VideoGridItem'

const Top = () => {
    const { globalState, setGlobalState } = useContext(Store)
    
    useEffect(() => {
        fetchPopularData().then((res) => {
            console.log('data', res)
            setGlobalState({type: 'SET_POPULAR', payload: {popular: res.data.items}})
        })
    // eslint-disable-next-line
    }, [])
    return (
        <Layout>
            <VideoGrid>
                {
                    globalState.popular && globalState.popular.map((popular) => {
                        return (
                            <VideoGridItem
                                id={popular.id}
                                key={popular.id}
                                // サムネイルが５種全て無い動画があるので注意 default/medium/standard/high/maxres
                                src={popular.snippet.thumbnails.medium.url}
                                title={popular.snippet.title} />
                             )
                    })
                }
            </VideoGrid>
        </Layout>
    )
}

export default Top
