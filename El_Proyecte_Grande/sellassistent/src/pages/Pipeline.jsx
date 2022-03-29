import React from 'react'
import Board from '../components/inpipelineLayout/Board'



const titles = ['To Contact', 'Contact Made', 'Meeting Arranged','Needs Defined', 'Proposal Made', 'Negotiations Started', 'Sealed','Failed']


const Pipeline = () => {
    return (
        <div className='row col-12'>
            <Board headData={titles}></Board>
        </div>

    )
}

export default Pipeline
