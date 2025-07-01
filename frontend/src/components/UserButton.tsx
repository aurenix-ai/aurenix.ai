'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';

export function UserButton() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="relative group">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-gray-300 text-sm">{user.email}</span>
      </div>
      
      <div className="absolute right-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="p-2">
          <div className="px-3 py-2 text-sm text-gray-300 border-b border-white/10">
            {user.email}
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm text-red-400 hover:text-red-300"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
