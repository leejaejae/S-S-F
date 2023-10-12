import React from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const navigate = useNavigate();

  const [category, setCategory] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const FetchCategory = async () => {
    try {
      setCategory(null);
      setError(null);

      setLoading(true);
      const response = await axios.get('/api/category')
      setCategory(response.data[1].children);
      console.log(response.data[1].children);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    FetchCategory();
  }, [])

  if (loading) return <div>로딩중..</div>
  if (error) return <div>에러발생..</div>
  if (!category) return null;

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownButton onClick={myPageHandler} ref={myPageRef}>
          카테고리
        </DropdownButton>
        <Menu $isDropped={myPageIsOpen}>
          <Ul >
            {category.map(data => (
              <Li key={data.id}>
                <LinkWrapper key={"w" + data.id}>
                  <LinkWrapper1 onClick={() => { navigate("category/" + data.id, { state: data.name }) }}>
                    {data.name}
                  </LinkWrapper1>
                  {data.children.map(item => (
                    <LinkWrapper2 onClick={() => { navigate("category/" + item.id, { state: item.name })}}>
                      {item.name}
                    </LinkWrapper2>
                  ))}
                </LinkWrapper>
              </Li>
            ))}
          </Ul>
        </Menu>
      </DropdownContainer>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 14px;
  background: black;
  width: 120px;
  height: 40px;
  border-radius:7px;
  margin:20px 0px;
  transition: all 0.5s;
  &:hover{
    background-color: rgb(66, 66, 253);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  
`;

const DropdownButton = styled.div`
  cursor: pointer;
  font-size:20px;
`;

const Menu = styled.div`
  background: white;
  position: absolute;
  top: 52px;
  left: 50%;
  margin-left:340px;
  width: 800px;
  //text-align: left;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  background-color:rgb(253, 253, 253);
  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 8%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
    
  }

  ${({ $isDropped }) =>
    $isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 5px;
  }

  & > li:first-of-type {
    margin-top: 5px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  //border:1px solid green;
  
`;

const Li = styled.li`
  //width:200px;
  margin-top:10px;
  //border:1px solid blue; 
  //border-bottom:1px solid gray;
  
`;

const LinkWrapper = styled.a`
  display:flex;
  font-size: 18px;
  text-decoration: none;
  color:gray;
  flex-direction:row;
  justify-content : left;
`;

const LinkWrapper1 = styled.a`
width:130px;
font-size: 18px;
//border:1px solid blue;
text-decoration: none;
margin-right:0px;
&:hover{
  color:blue;
  cursor:pointer;
}
`

const LinkWrapper2 = styled.a`
font-size: 18px;
text-decoration: none;
padding-left:50px;
//border:1px solid red;
&:hover{
  color:blue;
  cursor:pointer;
  font-weight:bold;
}
`



