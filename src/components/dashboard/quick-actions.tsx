import {
  CalendarDays,
  Building,
  ClipboardList,
  CircleDollarSign,
  User,
  Handshake,
} from 'lucide-react';

const actions = [
  {
    label: 'Add Booking',
    icon: CalendarDays,
    color: 'blue',
    action: () => alert('Add Booking'),
  },
  {
    label: 'Add Unit',
    icon: Building,
    color: 'green',
    action: () => alert('Add Unit'),
  },
  {
    label: 'Add Reminder',
    icon: ClipboardList,
    color: 'yellow',
    action: () => alert('Add Reminder'),
  },
  {
    label: 'Add Expense',
    icon: CircleDollarSign,
    color: 'red',
    action: () => alert('Add Expense'),
  },
  {
    label: 'Add Investor',
    icon: User,
    color: 'purple',
    action: () => alert('Add Investor'),
  },
  {
    label: 'Add Agent',
    icon: Handshake,
    color: 'indigo',
    action: () => alert('Add Agent'),
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((item) => (
        <button
          key={item.label}
          onClick={item.action}
          className={`flex flex-col items-center p-4 bg-${item.color}-50 rounded-lg hover:bg-${item.color}-100 transition-colors`}
        >
          <item.icon className={`text-3xl mb-2 text-${item.color}-800`} />
          <span className={`font-semibold text-${item.color}-800`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
