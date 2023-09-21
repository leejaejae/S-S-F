import '../../style/MyPage.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from "../SideNav/Index";
import MyPageTop from '../../components/MyPageTop';
import WriteBtn from '../../components/WriteBtn';

export default function MyPage() {
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  console.log(actoken);
  console.log(retoken);


  const [mypost, setMyPost] = useState();
  const [myrent, setMyRent] = useState();
  const [myborrow, setMyBorrow] = useState();

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState();

  const fetchMyPosts = async () => {
    
    try {
      setLoading(true);
      const response = await axios.get('/posts/my', {
        headers: { Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken }
      })
      
      setMyPost(response.data.result.data);
    }
    catch (e) {
      console.log(e.response.data.result);
    }
  }
  const fetchMyRend = async () => {
    try {
      const response = await axios.get('/trades/rend-item?true,', {
        headers: { Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken }
      })
      console.log("대여해주는 Rend 상품 api 성공");
      // console.log(response.data.result.data);
      setMyRent(response.data.result.data);
    }
    catch (e) {
      console.log(e.response.data.result);
    }
  }
  const fetchMYBorrow = async () => {
    try {
      const response = await axios.get('/trades/borrow-item?true', {
        headers: { Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken }
      })
      console.log("대여하는 Borrow 상품 api 성공");
      // console.log(response.data.result.data);
      setMyBorrow(response.data.result.data);
    }
    catch (e) {
      console.log(e.response.data.result);
    }
    setLoading(false);
  }

  useEffect(() => {
    //본인작성게시글
    fetchMyPosts();
    //본인이 대여해주는 상품
    fetchMyRend();
    //본인이 대여받는(빌리는 상품)
    fetchMYBorrow();
  }, [])

  if (loading) return <div>로딩중..</div>
  if(!mypost || !myrent || !myborrow) return null 

  return (
    <div>
      {/* 마이페이지 상단 */}
       <MyPageTop mypost={mypost.totalElements}
        myrent={myrent.totalElements} myborrow={myborrow.totalElements} />
      
      <div className="mypagebottom">
        {/* 마이페이지 왼쪽 nav */}
        <div className="bottom-leftnav"><Sidebar /></div>
        {/* https://leejams.github.io/useOutletContext/ , sidebar클릭했을때 보이는 컴포넌트들(mypost,mylike...*/}
        <div className='bottom-right'><Outlet context={{ mypost, setMyPost, myrent, setMyRent }} /></div>
      </div>
      <WriteBtn />
    </div>
  )
}


// sidebar 참고 :  https://www.daleseo.com/react-side-navigation/
function isActive(path) {
  return window.location.pathname.startsWith(path);
}

function Sidebar() {
  return (
    <Nav>
      <Nav.List>
        <Nav.Item>
          <Nav.Link to="/my-page/post" active={isActive("/my-page/post")}>
            내 게시물 조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/my-page/like" active={isActive("/my-page/like")}>
            좋아요
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/rent" active={isActive("/my-page/rent")}>
           대여해주는 상품
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/borrow" active={isActive("/my-page/borrow")}>
          대여받는 상품
          </Nav.Link>
        </Nav.Item>
      </Nav.List>
    </Nav>
  );
}
