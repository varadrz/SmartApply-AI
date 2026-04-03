"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

export default function NavigationGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, fetchUser, userLoading } = useAppStore();

  useEffect(() => {
    const checkUser = async () => {
      const userData = await fetchUser();
      
      // If onboarding is NOT complete and we aren't already on the onboarding page, redirect
      if (userData && !userData.onboarding_complete && pathname !== '/onboarding') {
        router.push('/onboarding');
      }
      
      // If onboarding IS complete and we are on the onboarding page, redirect to dashboard
      if (userData && userData.onboarding_complete && pathname === '/onboarding') {
        router.push('/');
      }
    };

    checkUser();
  }, [fetchUser, pathname, router]);

  if (userLoading && !user) {
    return (
      <div className="fixed inset-0 bg-surface z-[100] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-tertiary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-outline">SmartApply AI Core Booting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
