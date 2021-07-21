import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Content from '../Content'
import "./mypage.css"

function AddPet(){
    //const email=useLocation().email
    const email='1410ahs@naver.com'
    const [pets,setPets]=useState([])
    const [pet,setPet]=useState({
        parent:email,   // 보호자email
        //parent:'1410ahs@naver.com',
        name:'',        // 동물 이름
        age:'',         // 동물 나이
        gender:''       // 성별
    })
    const {parent,name,age,gender}=pet

    useEffect(() => {
        axios.get('/api/pets/')
        .then(
            res=>setPets(res.data)
        )
    }, [pets])

    const handleClick=(e)=>{
        console.log(e)
    }
    const handleChange=(e)=>{
        const {name,value}=e.target
        setPet({
            ...pet,
            [name]: value
        })
        console.log(name,value)
    }
    const handleCheck=(e)=>{
        e.preventDefault();
        (name==='' || age==='' || gender==='')?    //미입력 사항 존재할 때
            swal('','모두 작성해주세요!','warning')
        :
        (
            handleSubmit(),
            swal('',`${name}을(를) 등록합니다!`, 'success')
            .then(setPet({name:'',age:'',gender:''}))
        )
    }
    const handleSubmit=()=>{
        axios.put('/api/auth/pet/'+email+'/'+name)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        axios.post('/api/pets/',pet)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    const line={
        margin:'20px 50px'
    }
    const info={
        margin:'30px 50px',
        textAlign:'center',
        borderRadius:'30px',
        boxShadow: '8px 8px 16px 3px rgba(0,0,0,0.3)'
    }
    
    return(
        <Content>
            <div className="title mt-4"><h3>등록된 반려 동물 리스트</h3></div>
            <div className="petsDiv">
            {
                pets.map(item=>{
                    return(
                        <div className="petDiv" onClick={handleClick}>
                            <h6>{item.name}</h6>
                            <h6>{item.gender}/{item.age}살</h6>
                        </div>
                    )
                })
            }
            </div>
            <hr style={line}/>
            <div style={info}>
                <div className="divstyle mt-4">새로운 반려 동물 등록</div>
                <form onSubmit={handleCheck}>
                    <div className="divstyle">
                        <input className="inputDisabled-pet mt-4" name="parent" value={parent} disabled/>
                    </div>
                    <div className="divstyle">
                        <div className="radio">
                            <input type="radio" name="gender" value="수컷" onChange={handleChange}/>&nbsp;<label>수컷 </label> &ensp;
                            <input type="radio" name="gender" value="암컷" onChange={handleChange}/>&nbsp;<label>암컷 </label>
                        </div>
                    </div>
                    <div className="divstyle">
                        <input className="input-pet mt-2" name="name" value={name} placeholder="이름" onChange={handleChange}/>
                    </div>
                    <div className="divstyle">
                        <input className="input-pet mt-2" name="age" value={age} placeholder="나이(숫자만 입력)" onChange={handleChange}/>
                    </div>
                    <div>
                        <button className="addBtn mt-4 mb-4" type="submit">등록하기</button>
                    </div>
                </form>
            </div>
        </Content>
    )
}
export default AddPet