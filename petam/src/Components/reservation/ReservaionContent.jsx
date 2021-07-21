import axios from 'axios'
import React, { useState,useEffect } from 'react'
import './reservation.css'

function ReservationContent({time,getReserve}){
    //const [selectTime,setSeleteTime]=useState()
    const email='1410ahs@naver.com'
    const [pets,setPets]=useState([])
    const [reserve,setReserve]=useState({
        pet:'x',
        option:'x',
        text:'없음'
    })
    const {pet,option,text}=reserve
    useEffect(() => {
        axios.get('/api/auth/email/'+email)
        .then(ctx=>{
            setPets(ctx.data.pet)
            console.log(ctx.data.pet)
        }
        )
    }, [])
    const handleChange=(e)=>{
        const {name,value}=e.target
        setReserve({
            ...reserve,
            [name]: value
        })
        getReserve(name,value)
    }
    const selectBox={
        width:'40%',
        marginLeft:'5px'
    }
    const textBox={
        padding:'5px',
        height:'20vh',
        width:'80%'
    }
    const warningText={
        fontSize:'11px',
        margin:'10px 0'
    }
    return(
        <div className='contentBox'>
            <div>
            예약 동물 :
                <select name='pet' value={pet} onChange={handleChange} style={selectBox}>
                <option value="x" hidden>=== 선택 ===</option>
                {
                    pets.map(item=>{
                        return(
                            <option value={item}>{item}</option>
                        )
                    })
                }
                </select>
                <br/>
                예약 일정 : {time.year}년 {time.month}월 {time.dates}일 {time.hour}시 {time.minute}분<br/>
                예약 목적 : 
                <select name='option' value={option} onChange={handleChange} style={selectBox}>      
                    <option value="정기검진">정기검진</option>
                    <option value="예방접종">예방접종</option>
                    <option value="기타">기타</option>
                    <option value="x" hidden>=== 선택 ===</option>
                </select>
                <br/><br/>
                <textarea name='text' onChange={handleChange} style={textBox} placeholder="병원에 보낼 메시지를 적어주세요."/>
                <div style={warningText}>
                    ※주의사항※<br/>
                    예약 1일 전까지 무료 취소 가능합니다.<br/>
                    무분별한 예약, 취소 시 차후 불이익이 발생할 수 있습니다.
                </div>
                <check></check>
            </div>
        </div>
    )
}
export default ReservationContent