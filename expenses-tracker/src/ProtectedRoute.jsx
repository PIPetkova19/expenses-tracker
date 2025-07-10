import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

/*
 Този файл осигурява, че само автентикирани потребители 
 имат достъп до защитени части на приложението.
*/
export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);//инфо за user или null

    if (!user) {
        return <Navigate to="/sign-in" />;
    }

    return children;
}
