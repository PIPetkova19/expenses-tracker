import { createContext, useState, useEffect } from 'react';
//обектът, който съдържа текущото състояние на Firebase Authentication.
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// React контекст, който държи информация за текущия логнат потребител.
export const AuthContext = createContext();

/*
  Това е основният файл за управление на автентикацията в приложението.
 Този файл слуша за промени в състоянието на автентикация в Firebase
  и обновява глобалното състояние на потребителя в приложението.
*/

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // отписва потребителя от Firebase
    const logout = () => {
        signOut(auth).then(() => {
            navigate("/sign-in");
        }).catch((error) => {
            alert("Error: " + error.message);
        });
    };


    //дава достъп на децата само след като проверката е приключила
    return (
        <AuthContext.Provider value={{ user, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
