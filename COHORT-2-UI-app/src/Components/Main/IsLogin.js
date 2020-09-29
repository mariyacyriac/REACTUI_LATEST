import React  from 'react'


const IsLogin =() => {
    var isLogin =false;
   // console.log("isLogin");
    if(localStorage.getItem("auth") != null)
    {
         isLogin =true;
        // console.log("inside if isLogin -> "+isLogin);
    }
    return isLogin;
};

export default IsLogin