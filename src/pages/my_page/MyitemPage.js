import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';


import 'bootstrap/dist/css/bootstrap.min.css';


function MyitemPage() {

  const { isAuthenticated } = useAuth();

  let [item, setItem] = useState();
  const navigate = useNavigate();  // hook: page 이동을 도와줌

  if (!isAuthenticated) {
    navigate('/loginpage');
  }

  return (
    <div>
      {isAuthenticated ? (

        <div className='App'>
          <div className="container" style={{ marginTop: "40px" }}>
            <div className="row">
              <button onClick={() => navigate('/itemmain/myitempage/edit')}>수정버튼예시</button>
            </div>
          </div>

          <div className='upload_item' style={{ position: "fixed", right: '45px', bottom: '30px' }}>
            <button style={{ borderRadius: "30px", fontSize: '20px', width: "100px", height: "50px", border: "none" }}
              onClick={() => navigate('/itemmain/uploaditem')}> + 글쓰기 </button>
          </div>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default MyitemPage;