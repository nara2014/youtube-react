import React, {useEffect, useContext} from 'react'
import Layout from '../comoponents/Layout/Layout'
import VideoDetail from '../comoponents/VideoDetail/VideoDetail'
import SideList from '../comoponents/SideList/SideList'
import { Store } from '../store/index'
import { useLocation } from 'react-router-dom'
import { fetchSelectedtData, fetchRelatedData } from '../apis'


const Watch = () => {
    const { setGlobalState } = useContext(Store)
    const location = useLocation()
    const setVideos = async () => {
        const searchParams = new URLSearchParams(location.search)
        const id = searchParams.get('v')
        if (id) {
            const [selected, related] = await Promise.all([fetchSelectedtData(id), fetchRelatedData(id)])
            setGlobalState({type: 'SET_SELECTED', payload: {selected: selected.data.items.shift()}})
            setGlobalState({type: 'SET_RELATED', payload: {related: related.data.items}})
        }
    }

    useEffect(() => {
        setVideos()
    // eslint-disable-next-line
    },[location.search])
    return (
        <Layout>
            <VideoDetail />
            <SideList />
        </Layout>
    )
}

export default Watch
