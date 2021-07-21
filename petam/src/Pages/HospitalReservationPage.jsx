import React,{useEffect,useState} from 'react'
import Content from '../Components/Content'
import '../Components/Content.css'
import ReserveContent from '../Components/hsppage/ReserveContent'
import axios from 'axios'
import Pagination from '../Components/pagination/Pagination'

function HospitalReservationPage(){

    const [hspId,setHspId]=useState()   //병원 Id
    const [info,setInfo]=useState([])   //병원 정보
    const [currentPage,setCurrentPage]=useState(1)  //현재 페이지
    const [postsPerPage]=useState(10)                //한 페이지에서 보여줄 info 수

    const indexOfLastPost=currentPage*postsPerPage  //해당 페이지에서 마지막 info의 index
    const indexOfFirstPost=indexOfLastPost-postsPerPage //  ...      첫번째 ...
    const currentPosts=info.slice(indexOfFirstPost, indexOfLastPost)    //각 페이지에서 보여질 info 배열
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchPosts=async()=>{
            axios.get('/api/hospitals/read/name/'+'더조은 동물의료센터')
            .then(res=>setHspId(res.data._id))
            axios.get('/api/reservations/hspfilter/'+'더조은 동물의료센터')
            .then(
                res=>setInfo(res.data)
            )
            .catch(err=>console.log(err))
        }
        fetchPosts()
    }, [info])
    
    const totalCount={
        textAlign:'right'
    }
    return(
        <Content>
            <h2 className='name'>예약된 내역</h2>
            <div className='bodyContainer'>
                <div style={totalCount}>총 {info.length}건</div>
                <hr/>
                <div >
                    <ReserveContent hspId={hspId} info={currentPosts}/>
                    <Pagination postsPerPage={postsPerPage} totalPosts={info.length} paginate={paginate}/>
                </div>
                <hr/>
            </div>
        </Content>
    )
}

export default HospitalReservationPage