import React, { useEffect, useContext } from 'react'
import Layout from '../comoponents/Layout/Layout'
import { useLocation } from 'react-router-dom'
import { Store } from '../store/index'
import { fetchSearchData } from '../apis'
import VideoGrid from '../comoponents/VideoGrid/VideoGrid'
import VideoGridItem from '../comoponents/VideoGridItem/VideoGridItem'

const Search = () => {
    const { globalState, setGlobalState } = useContext(Store)
    const location = useLocation()
    const setSearchResult = async () => {
        const searchParams = new URLSearchParams(location.search)
        const query = searchParams.get('query')
        console.log('query', query);
        if( query ) {
            await fetchSearchData(query).then((res) => {
                setGlobalState({type: 'SET_SEARCHED', payload: {searched: res.data.items}})
            })
        }
    }
    useEffect(() => {
        setSearchResult()
    // eslint-disable-next-line
    }, [location.search])
    return (
        <Layout>
            <VideoGrid>
                {
                    globalState.searched ? globalState.searched.map((search) => {
                        return (
                            <VideoGridItem
                                id={search.id.videoId}
                                key={search.id.videoId}
                                src={search.snippet.thumbnails.medium.url}
                                title={search.snippet.title} />
                        )
                    }) : <span>no data</span>
                }
            </VideoGrid>
        </Layout>
    )
}

export default Search
