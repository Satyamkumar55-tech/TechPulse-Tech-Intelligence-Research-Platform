import React from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Sparkles, 
  Tags, 
  Bookmark, 
  Bell, 
  Settings, 
  BarChart2,
  X,
  LogOut,
  Cpu
} from 'lucide-react';

export default function Sidebar({ 
  activePage, 
  setActivePage, 
  sidebarOpen, 
  setSidebarOpen, 
  unreadNotifications, 
  savedCount,
  user,
  onLogout 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news-feed', label: 'News Feed', icon: Newspaper },
    { id: 'reports', label: 'AI Reports', icon: Sparkles },
    { id: 'categories', label: 'Categories', icon: Tags },
    { id: 'saved', label: 'Saved Articles', icon: Bookmark, badge: savedCount > 0 ? savedCount : null },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
            transition: 'opacity 0.3s ease'
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`glass-panel ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid var(--border-color)',
          transition: 'transform var(--transition-normal)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          backgroundColor: 'var(--bg-sidebar)'
        }}
      >
        {/* Brand Logo Header */}
        <div 
          style={{
            padding: '1.5rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              cursor: 'pointer' 
            }}
            onClick={() => setActivePage('dashboard')}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(139, 92, 246))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <Cpu size={20} color="#fff" />
            </div>
            <div>
              <h1 
                style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 800, 
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #fff, #9ca3af)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                className="brand-text-theme"
              >
                TechPulse AI
              </h1>
              <span 
                style={{ 
                  fontSize: '0.65rem', 
                  color: 'rgb(6, 182, 212)', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em' 
                }}
              >
                Research Agent
              </span>
            </div>
          </div>
          
          {/* Close Button for Mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="mobile-close-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'none',
              padding: '4px',
              borderRadius: '50%'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav 
          style={{ 
            flex: 1, 
            padding: '1.25rem 0.75rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.35rem',
            overflowY: 'auto' 
          }}
        >
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 0.95rem',
                  border: 'none',
                  borderRadius: '10px',
                  width: '100%',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  background: isActive 
                    ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%)' 
                    : 'transparent',
                  borderLeft: isActive ? '3px solid rgb(59, 130, 246)' : '3px solid transparent',
                  transition: 'all var(--transition-fast)'
                }}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <IconComponent 
                  size={18} 
                  color={isActive ? 'rgb(6, 182, 212)' : 'currentColor'} 
                  style={{ transition: 'color var(--transition-fast)' }}
                />
                <span style={{ flex: 1 }}>{item.label}</span>
                
                {/* Custom Item Badge */}
                {item.badge !== null && (
                  <span 
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      background: 'rgba(139, 92, 246, 0.2)',
                      color: 'rgb(216, 180, 254)',
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card & Logout Footer */}
        {user && (
          <div 
            style={{
              padding: '1.25rem',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'rgb(216, 180, 254)',
                  border: '1.5px solid rgba(139, 92, 246, 0.4)'
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h4 
                  style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {user.name || 'User'}
                </h4>
                <p 
                  style={{ 
                    fontSize: '0.72rem', 
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                transition: 'all var(--transition-fast)'
              }}
              className="logout-btn"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </aside>

      {/* Media query overrides in layout CSS */}
      <style>{`
        @media (min-width: 992px) {
          aside {
            transform: translateX(0) !important;
          }
          .mobile-close-btn {
            display: none !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-close-btn {
            display: block !important;
            background: rgba(255, 255, 255, 0.05) !important;
          }
          .light .mobile-close-btn {
            background: rgba(0, 0, 0, 0.05) !important;
          }
        }
        .sidebar-link:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.03) !important;
        }
        .light .sidebar-link:hover {
          color: var(--text-main) !important;
          background: rgba(0, 0, 0, 0.03) !important;
        }
        .light .sidebar-link.active {
          color: rgb(59, 130, 246) !important;
          background: rgba(59, 130, 246, 0.08) !important;
        }
        .light .brand-text-theme {
          background: linear-gradient(135deg, #1f2937, #4b5563) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
          color: rgb(239, 68, 68) !important;
        }
      `}</style>
    </>
  );
}
