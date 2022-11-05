import { getUser } from "./services/authorize";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute =() => {
    //ทำการตรวจสอบว่า ถ้าไม่มีการ login จะไม่สามารถ เข้า /create ได้
    return getUser() ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute;