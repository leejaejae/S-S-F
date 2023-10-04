import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../style/modal.css'
import '../../../style/Edit_membership.css'
import { useAuth } from '../../../components/AuthContext';
import ViewProfile from './ViewProfile'; 
import EditForm from './EditForm';

const Edit_membership = (props) => {
  const navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const username = sessionStorage.getItem('nickname'); 
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userData2,setUserData2]=useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startEditing = () => {
    setIsEditing(!isEditing);
  };

  
  const myprofile = async () => {
    try {
      setError(null);
      setUserData(null);
      setLoading(true);
      const response = await axios.get("/members/my-profile", {
        headers: {
          'Authorization': `Bearer ${actoken}`,
          'Auth': retoken
        }
      })
      console.log(response);
      setUserData(response.data.result.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }
  const myprofile2= async() =>{
    try{
      setError(null);
      setUserData2(null);
      setLoading(true);
      const response = await axios.get(`/members/${username}`, {
        headers: {
          'Authorization': `Bearer ${actoken}`,
          'Auth': retoken
        }
      })
      console.log(response.data.result.data);
      setUserData2(response.data.result.data);
    }catch(error){
      console.log(error);
      setError(error);
    }
  }

  
  useEffect(() => {
    myprofile();
    //introduce, image 불러오기 위한.
    myprofile2();
    return () => {
      if (!isAuthenticated) {
        navigate('/loginpage');
        return;
      }
    }
  }, []);


  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러</div>;
  if (!userData||!userData2) return null;

  return (
    <div>
      <div className='editmy-top'>
        <p>기본 회원정보</p>
      </div>
      <button onClick={()=>{ startEditing();}}>확인</button>
      {isEditing? <EditForm userData={userData} userData2={userData2}/> : 
      <ViewProfile userData={userData} userData2={userData2} startEditing={startEditing} />}
  </div>
  );
}

export default Edit_membership;