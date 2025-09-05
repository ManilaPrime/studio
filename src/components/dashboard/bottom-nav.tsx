'use client';

interface BottomNavProps {
  currentSection: string;
  showSection: (section: string) => void;
}

const BottomNav = ({ currentSection, showSection }: BottomNavProps) => {
  // In a full app, these would be Next.js <Link> components
  // and would navigate to different routes.
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home' },
    { id: 'bookings', icon: '📅', label: 'Bookings' },
    { id: 'reminders', icon: '⏰', label: 'Tasks' },
    { id: 'more', icon: '⋯', label: 'More' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2">
        {navItems.slice(0, 2).map((item) => (
          <button
            key={item.id}
            onClick={() => showSection(item.id)}
            className={`fb-nav-item ${currentSection === item.id ? 'active' : ''}`}
            id={`nav-${item.id}`}
          >
            <div className="fb-nav-icon">{item.icon}</div>
            <div className="fb-nav-text">{item.label}</div>
          </button>
        ))}
        <button className="quick-action-btn">
          <span className="text-2xl font-bold">+</span>
        </button>
        {navItems.slice(2).map((item) => (
          <button
            key={item.id}
            onClick={() => (item.id === 'more' ? {} : showSection(item.id))}
            className={`fb-nav-item ${currentSection === item.id ? 'active' : ''}`}
            id={`nav-${item.id}`}
          >
            <div className="fb-nav-icon">{item.icon}</div>
            <div className="fb-nav-text">{item.label}</div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;