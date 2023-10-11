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
  


  const [mypost, setMyPost] = useState();
  const [myrent, setMyRent] = useState();
  const [myborrow, setMyBorrow] = useState();
  const [myreview,setMyReview]=useState();

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState();

  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/posts/my', {
        headers: { 'Authorization' : `Bearer ${actoken}`,
                   'Auth' : retoken }
      })
      //console.log(response);
      setMyPost(response.data.postList);
    }
    catch (e) {
      console.log(e);
    }
  }
  const fetchMyRend = async () => {
    try {
      const response = await axios.get('/api/trades/rend-item?true,', {
        headers: { 'Authorization' : `Bearer ${actoken}`,
        'Auth' : retoken }
      })
      //console.log(response);
      setMyRent(response.data.tradeList);
    }
    catch (e) {
      console.log(e);
    }
  }
  const fetchMYBorrow = async () => {
    try {
      const response = await axios.get('/api/trades/borrow-item?true', {
        headers: { 'Authorization' : `Bearer ${actoken}`,
        'Auth' : retoken }
      })
      //console.log(response);
      
      setMyBorrow(response.data.tradeList);
    }
    catch (e) {
      console.log(e);
    }
    setLoading(false);
  }
  const fetchMyReview = async() =>{
    try{
      const response = await axios.get('/api/reviews/my', {
        headers: { 'Authorization' : `Bearer ${actoken}`,
        'Auth' : retoken }
      })
      setMyReview(response.data.reviewList);
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    //본인작성게시글
    fetchMyPosts();
    //본인이 대여해주는 상품
    fetchMyRend();
    //본인이 대여받는(빌리는 상품)
    fetchMYBorrow();
    //내가받은리뷰조회
    fetchMyReview();
    
  }, [])

  if (loading) return <div>로딩중..</div>
  if(!mypost || !myrent || !myborrow || !myreview) return null 

  return (
    <div>
      {/* 마이페이지 상단 */}
       <MyPageTop mypost={mypost.length}
        myrent={myrent.length} myborrow={myborrow.length} myreview={myreview.length} />
      
      <div className="mypagebottom">
        {/* 마이페이지 왼쪽 nav */}
        <div className="bottom-leftnav"><Sidebar /></div>
        {/* https://leejams.github.io/useOutletContext/ , sidebar클릭했을때 보이는 컴포넌트들(mypost,mylike...*/}
        <div className='bottom-right'><Outlet context={{ mypost, setMyPost, myrent, setMyRent, myborrow, setMyBorrow,myreview }} /></div>
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
          <Nav.Link to="/my-page/post" $active={isActive("/my-page/post")}>
            내 게시물 조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/my-page/like" $active={isActive("/my-page/like")}>
            좋아요
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/rent" $active={isActive("/my-page/rent")}>
           대여해주는 상품
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/borrow" $active={isActive("/my-page/borrow")}>
          대여받는 상품
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link to="/my-page/my-review" $active={isActive("/my-page/my-review")}>
          리뷰
          </Nav.Link>
        </Nav.Item>

      </Nav.List>
    </Nav>
  );
}
