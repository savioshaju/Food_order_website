import { Navigate } from 'react-router-dom'


const isLoggedIn = () => {
    return localStorage.getItem("status")
}
function ProtectedRoute({ children }) {


    if (!isLoggedIn()) {
        return <Navigate replace to='/login' />
    }

    return <>{children}</>
}

export default ProtectedRoute