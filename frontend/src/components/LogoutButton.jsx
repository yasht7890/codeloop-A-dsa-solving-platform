import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LogoutButton = ({ children, className = "", onLogoutComplete }) => {
    const { logout } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const onLogout = async () => {
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            await logout();
            if (onLogoutComplete) onLogoutComplete();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button 
            className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300`}
            onClick={onLogout}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">Logging out...</span>
                </>
            ) : (
                children
            )}
        </button>
    )
}

export default LogoutButton