//เก็บ Token / username => sesion storage
export const authenticate = (res,next) =>{
    if(window !== 'undifined'){
        //สร้างกล่องเก็บข้อมมูลลง sesion storage
        sessionStorage.setItem('token', JSON.stringify(res.data.token))
        sessionStorage.setItem('user', JSON.stringify(res.data.username))
    }
    next()
}

//ดึงข้อมูล Token
export const getToken = () =>{
    if(window !== 'undifined'){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false;
        }
    }
}

//ดึงข้อมูล user
export const getUser = () =>{
    if(window !== 'undifined'){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false;
        }
    }
}

// Loguot
export const logout = (next) => {
    if(window !== 'undifined') {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}