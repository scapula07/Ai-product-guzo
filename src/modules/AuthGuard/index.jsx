import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
export default function AuthGuard(props) {


    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const user = localStorage.getItem("user");
    
    const checkUser = () => {
        const user = localStorage.getItem("user");
        console.log(user,"user")
       
         console.log(user?.token,"uuui")
        if (!user || user === 'undefined' || JSON.parse(user) === null ) {
            setIsLoggedIn(false);
            return navigate('/create-account');
        }
         setIsLoggedIn(true);
    
       }
    useEffect(() => {
        checkUser();
    }, [isLoggedIn]);
 
        return (
            <React.Fragment>
                {
                    isLoggedIn ? props.children : null
                }
            </React.Fragment>
        );
}
