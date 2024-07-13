import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function OpenRoute ({ children}) {
    const {token} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
  if(token === null){
    return children;
  }else{
    return navigate("/dashboard/my-profile");
  }
}

export default OpenRoute