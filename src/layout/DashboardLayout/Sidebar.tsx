import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  LayoutDashboard, // Added
  PieChart, // Added
  Users, // Added
  Package, // Added
  ShoppingCart, // Added
  FileText, // Added
  CreditCard, // Added
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronsUpDown, LogOut } from 'lucide-react';

// Menu Configuration
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Platform',
      url: '#',
      icon: SquareTerminal,
      items: [
        { title: 'Overview', url: '/', icon: LayoutDashboard }, // Added Icon
        { title: 'Analytics', url: 'analytics', icon: PieChart }, // Added Icon
      ],
    },
    {
      title: 'Management',
      url: '#',
      icon: Bot,
      items: [
        { title: 'Customers', url: 'customers', icon: Users }, // Added Icon
        { title: 'Products', url: 'products', icon: Package }, // Added Icon
        { title: 'Orders', url: 'orders', icon: ShoppingCart }, // Added Icon
      ],
    },
    {
      title: 'Finance',
      url: '#',
      icon: BookOpen,
      items: [{ title: 'Invoices', url: 'invoices', icon: FileText }], // Added Icon
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        { title: 'General', url: 'settings', icon: Settings2 }, // Added Icon
        { title: 'Billing', url: '#', icon: CreditCard }, // Added Icon
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const activeTeam = data.teams[0];
  const TeamLogo = activeTeam.logo;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TeamLogo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const basePath =
                  item.url === '/'
                    ? '/'
                    : item.url && item.url !== '#'
                    ? `/${item.url}`
                    : '';
                const isActive = Boolean(
                  basePath &&
                    (location.pathname === basePath ||
                      location.pathname.startsWith(`${basePath}/`))
                );
                // Use the specific item icon if available, otherwise fallback to group icon
                const ItemIcon = item.icon || group.icon;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      {item.url && item.url !== '#' ? (
                        <NavLink to={basePath}>
                          {ItemIcon && <ItemIcon className="size-4" />}
                          <span>{item.title}</span>
                        </NavLink>
                      ) : (
                        <button
                          type="button"
                          className="flex items-center gap-2 text-muted-foreground cursor-default"
                          aria-disabled
                        >
                          {ItemIcon && <ItemIcon className="size-4" />}
                          <span>{item.title}</span>
                        </button>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    {/* Fixed: Ensure fallback is visible with bg-muted/50 */}
                    <AvatarFallback className="rounded-lg bg-muted/50 text-foreground">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
