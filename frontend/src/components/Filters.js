import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Filters({keyword}) {

    const navigate = useNavigate();

    const selectContentType =(event)=>{
        if(keyword && event?.target?.value){
            navigate("/search?q="+keyword+"&type="+event?.target?.value);
        }
        //console.log("event", event.target.value)
    }

  return (
    <>
    <div className='selectFilter'>
        <div>Type</div>
        <select onChange={selectContentType}>
            <option value="image">Image</option>
            <option value="pdf">Pdf</option>
            <option value="all">All</option>
        </select>
    </div>

    <div className='selectFilter'>
        <div>Ratio</div>
        <select>
            <option value="16x9">16:9</option>
            <option value="9x16">9:16</option>
            <option value="3x4">3:4</option>
            <option value="1x1">1:1</option>
        </select>
    </div>

    <div className='selectFilter'>
        <div>Size</div>
        <select>
            <option value="anysize">Any Size</option>
            <option value="large">Large</option>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
        </select>
    </div>

    <div className='selectFilter'>
        <div>Time</div>
        <select>
            <option value="anytime">Any time</option>
            <option value="past_24_hour">Past 24 hours</option>
            <option value="past_week">Past week</option>
            <option value="past_month">Past month</option>
            <option value="past_year">Past year</option>
        </select>
    </div>

    <div className='selectFilter'>
        <div>Source</div>
        <select>
            <option value="psi">PSI</option>
            <option value="gitty">Gitty</option>
            <option value="festival">Festival</option>
        </select>
    </div>
    </>
  )
}
