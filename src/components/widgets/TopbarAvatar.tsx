import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LogOut, UserIcon } from 'lucide-react';

export interface TopbarAvatarProps {
  name: string;
  email?: string;
  src?: string;
  onLogout?: () => void;
  className?: string;
}

export const TopbarAvatar: React.FC<TopbarAvatarProps> = ({
  name,
  email,
  src,
  onLogout,
  className,
}) => {
  const navigate = useNavigate();

  const handleProfile = () => navigate('/profile');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Account menu"
          className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm ${
            className ?? ''
          }`}
        >
          <Avatar className="h-8 w-8">
            {src ? (
              <AvatarImage src={src} alt={name} />
            ) : (
              <AvatarFallback>{name[0]}</AvatarFallback>
            )}
          </Avatar>
          <span className="hidden sm:inline-block font-medium truncate">
            {name}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        {email && (
          <div className="px-3 text-xs text-muted-foreground truncate">
            {email}
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => {
            onLogout?.();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopbarAvatar;
