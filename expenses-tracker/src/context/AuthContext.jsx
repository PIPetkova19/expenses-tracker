import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    //дава достъп на децата само след като проверката е приключила
    return (
        <AuthContext.Provider value={{ user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
