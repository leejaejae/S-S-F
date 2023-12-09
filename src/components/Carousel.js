import { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRef } from 'react';
import arrowright from '../assets/img/arrow-right.png';
import arrowleft from '../assets/img/arrpw-left.png'
import { Link } from 'react-router-dom';


export default function Carousel() {
    const slideRef = useRef(null);
    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    let IMG_WIDTH = 800;
    const slideRange = currentImgIdx * IMG_WIDTH;

    useEffect(() => {
        slideRef.current.style.transition = "all 1.7s ease-in-out";
        slideRef.current.style.transform = `translateX(-${slideRange}px)`;
    }, [currentImgIdx]);

    useEffect(() => {
        let time = setTimeout(() => {
            if (currentImgIdx == 1) setCurrentImgIdx(currentImgIdx - 1);
            else if (currentImgIdx == 0) setCurrentImgIdx(currentImgIdx + 1);
        }, 5000)
        return () => {
            clearInterval(time);
        }
    }, [currentImgIdx])

    const moveToNextSlide = () => {
        if (currentImgIdx == 1) {
            return;
        }
        else setCurrentImgIdx(currentImgIdx + 1);

    }
    const moveToPrevSlide = () => {
        if (currentImgIdx == 0) return;
        setCurrentImgIdx(currentImgIdx - 1);
    };


    return (
        <Container>
            <LeftBtn onClick={moveToPrevSlide}></LeftBtn>
            <Wrapper>
                <SlideWrapper ref={slideRef}>
                    <Dash >
                        < >
                            <div>
                                <H1>Billim</H1>
                            </div>

                            <DashBody>
                                <FirstP>언제어디서든지 상품을 쉽게</FirstP> <p><DashSpan>대여</DashSpan> 해주고
                                    <DashSpan> 대여</DashSpan> 받을 수 있는 서비스를 제공합니다.<br />
                                </p>
                            </DashBody>

                        </>
                    </Dash>
                    <Dash>
                        <>
                            <div>
                                <H1>Billim</H1>
                            </div>
                            <div style={{ marginTop: "20px" }} className='dashboard-decoration'>
                                <div style={{ marginBottom: "50px", fontSize: "30px" }}><p>Billim이 처음이시라면?</p><br /><Link to="/howtouse">서비스 이용방법 보러가기</Link></div>
                            </div>
                        </>
                    </Dash>
                </SlideWrapper>
            </Wrapper>
            <RightBtn onClick={moveToNextSlide}></RightBtn>
        </Container>
    )
}
const H1 = styled.h1`
font-weight:bold;
font-size:50px;
color:blue;
@media all and (max-width:500px)
{
    font-size:25px;
}
`
const DashBody = styled.div`
margin-bottom:50px;
font-size:30px;
@media all and (max-width:500px)
{
    font-size:15px;
}
`
const DashSpan = styled.span`
color:blue;
font-size:35px;
font-weight:bold;
@media all and (max-width:500px)
{
    font-size:17px;
}
`
const Container = styled.div`
display:flex;
flex-direction:row;
margin-left:15vw;
@media all and (max-width:500px)
{
    margin-left:0px;
}
`
const FirstP = styled.p`
margin-top:20px;
margin-bottom:50px;
@media all and (max-width:500px)
{
    margin-bottom:20px;
}
`

const Wrapper = styled.div`
width:800px;
height:200px;
overflow:hidden;
margin:20px 80px;
@media all and (max-width:500px)
{
    margin:0px;
}

`;
const SlideWrapper = styled.div`
display:flex;
width:700px;
height:150px;

`;
const Dash = styled.div`
width:800px;
height:200px;
flex: none;	  				  // 이 속성을 넣어야 화면에 1개씩 보여진다.
@media all and (max-width:500px)
{
    width:400px;
    height:20px;
}

`;

let LeftBtn = styled.button`
margin-top:70px;
background-image:url(${arrowleft});
background-size: 100%;  
width:40px;
height:40px;
display:inline-block;
border:none;
opacity:.2;
@media all and (max-width:500px)
{
    display:none;
}

`
let RightBtn = styled.button`
margin-top:70px;
background-image:url(${arrowright});
background-size: 100%;  
width:65px;
height:65px;
display:inline-block;
border:none;
opacity:.2;
@media all and (max-width:500px)
{
    display:none;
}
`