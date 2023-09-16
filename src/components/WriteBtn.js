import { useNavigate } from "react-router-dom"
import styled from 'styled-components'

let Button = styled.button`
  border-Radius:30px;
  font-Size:20px;
  width:100px;
  height:50px;
  border:none;
  font-Weight:bold;
  &:hover{
    transform: translateY(-2px);
    transition: 1s;
    color:blue;
}
`;

export default function WriteBtn()
{
    const navigate = useNavigate();
    return(
        <div className='upload_item' style={{ position: "fixed", right: '45px', bottom: '30px' }}>
            <Button onClick={() => navigate('/itemmain/upload-item')}>글쓰기 </Button>
          </div>
      )
}