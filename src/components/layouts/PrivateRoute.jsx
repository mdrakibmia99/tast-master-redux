import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../utils/firebase.config';
import { setUser, toggleLoading } from '../../redux/features/users/usersSlice';

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
 const dispatch=useDispatch()
  // const isLoading = false;
  // const email = 'test@gmail.com';
   const {email,isLoading}=useSelector((state)=>state.userSlice);
   useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
    if(user){
      // // console.log(user,"user");
      dispatch(setUser({
        name:user.displayName,
        email:user.email,
      }))
      dispatch(toggleLoading(false))
    }else{
      dispatch(toggleLoading(false))

    }
    
    })
   },[])
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && !email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
