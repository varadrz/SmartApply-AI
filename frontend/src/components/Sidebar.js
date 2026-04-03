"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, 
  Target, 
  Users, 
  Settings, 
  Moon, 
  Sun,
  Zap,
  Search,
  Briefcase,
  BarChart3
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const NavItem = ({ href, icon: Icon, label, active }) => (
  <Link 
    href={href}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      active 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="w-64 border-r bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
          <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="font-bold text-xl tracking-tight">Outreach Control</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem 
          href="/" 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={pathname === '/'} 
        />
        <NavItem 
          href="/opportunities" 
          icon={Target} 
          label="Opportunities" 
          active={pathname === '/opportunities'} 
        />
        <NavItem 
          href="/referrals" 
          icon={Users} 
          label="LinkedIn / Referrals" 
          active={pathname === '/referrals'} 
        />
        <NavItem 
          href="/company" 
          icon={Search} 
          label="Target Analysis" 
          active={pathname === '/company'} 
        />
        <NavItem 
          href="/interviews" 
          icon={Briefcase} 
          label="Interview Pipeline" 
          active={pathname === '/interviews'} 
        />
        <NavItem 
          href="/analytics" 
          icon={BarChart3} 
          label="Analytics" 
          active={pathname === '/analytics'} 
        />
      </nav>

      <div className="p-4 border-t space-y-2">
        <NavItem 
          href="/settings" 
          icon={Settings} 
          label="Settings" 
          active={pathname === '/settings'} 
        />
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
