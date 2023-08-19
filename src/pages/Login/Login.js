import React, { useState, useEffect } from 'react';
import '../../style/modal.css';
import '../../App.css';
import { Label, Input, Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import KaKaoLogin from '../../socialLogin/KakaoLogin';
import NaverLogin from '../../socialLogin/NaverLogin';
import GoogleLogin from '../../socialLogin/GoogleLLogIn';
import { loginUser } from '../about_membership/user_action';
import HorizonLine from '../../components/HorizonLine';


const Login = (props) => {

  let navigate = useNavigate();  // hook: page 이동을 도와줌
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(''); 

  const onUsernameHandler = (event) => {
    setUsername(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password
    };

    axios.post('http://13.125.98.26:8080/auth/login', userData)
      .then(response => {
        setMessage('로그인 성공');
        console.log('로그인 성공:', response.data);
        if ((response.status = 200)) {
          return navigate("/itemmain");
        }

        const { accessToken, refreshToken } = response.data;

        localStorage.getItem('accessToken', accessToken);
        localStorage.getItem('refreshToken', refreshToken);

      })
      .catch(error => {
        console.error('로그인 실패:', error);
        setMessage('로그인에 실패하였습니다.');
      });
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'Login'}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}> X </button>
          </header>

          <main>
            <Form onSubmit={onSubmitHandler}>
              <FormGroup>
                <h4>뭐든빌리개</h4>
                <p style={{ fontSize: "13px", color: "#4A4F5A" }}>서비스 이용을 위해 로그인 해주세요.</p>
                <br />
                <input type='Id' class="inputField" placeholder="  아이디" value={username}
                  onChange={onUsernameHandler} style={{ marginBottom: "20px" }} />
                <input type='password' class="inputField" placeholder="  비밀번호" value={password}
                  onChange={onPasswordHandler} />

                <div className='loginbtn'>
                  <Button color="dark" type="submit">Login</Button>
                </div>

                <div className="small">
                  <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/find-id">아이디 찾기</NavLink>{' | '}
                  <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/find-pw">비밀번호 찾기</NavLink>{' | '}
                  <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/signup">회원 가입</NavLink>
                </div>
                <HorizonLine />
                <div className='social_login' style={{ flexDirection: 'column' }}>
                  <NaverLogin />
                  <KaKaoLogin />
                  <GoogleLogin />
                </div>
              </FormGroup>
            </Form>
          </main>

          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>

  );
};

export default Login;