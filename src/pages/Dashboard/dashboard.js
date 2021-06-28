import React, { useEffect } from 'react'
import Header from '../../components/Header/header.component'
import Sidebar from '../../components/Sidebar/sidebar.component'
import Timeline from '../../components/Timeline/timeline.component'

const Dashboard = () => {

    useEffect(() => {
        document.title = "Connect"
    }, [])

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <div></div>
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard
