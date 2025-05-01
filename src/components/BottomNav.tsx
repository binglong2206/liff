import { Link, useLocation } from '@tanstack/react-router'
import { Database, Home, Star, User } from 'lucide-react'

export function BottomNav() {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path) && 
           (path === '/demo/tanstack-query' ? 
             location.pathname === '/demo/tanstack-query' : 
             location.pathname === path)
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/demo', icon: Database, label: 'Basic' },
    { path: '/account', icon: User, label: 'Account' },
    { path: '/demo/tanstack-query', icon: Star, label: 'Tanstack' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
                active ? 'text-black' : 'text-gray-500'
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  active
                    ? 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  active ? 'text-black' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 