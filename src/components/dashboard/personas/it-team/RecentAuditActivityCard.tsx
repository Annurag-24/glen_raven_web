import DashboardCard, {
  CardPrimaryText,
  CardSecondaryText,
} from '@/components/dashboard/DashboardCard';
import PencilIcon from '@/assets/icons/pencil.svg';
import LogoutIcon from '@/assets/icons/logout.svg';
import LoginIcon from '@/assets/icons/login.svg';

const activities = [
  {
    user: 'j.smith',
    action: 'modified Role',
    detail: '"Store Manager"',
    time: '3 minutes ago from 192.168.1.1',
    icon: PencilIcon,
  },
  {
    user: 'admin',
    action: 'logged out',
    detail: '',
    time: '1 hour ago from 208.113.83.42',
    icon: LogoutIcon,
  },
  {
    user: 's.jones',
    action: 'logged in',
    detail: '',
    time: '2 hours ago from 104.18.21.199',
    icon: LoginIcon,
  },
];

const RecentAuditActivityCard = () => {
  return (
    <>
      <DashboardCard
        title="Recent Audit Activity"
        showBottomViewAll={true}
        bottomViewAllLabel="View All Activity"
        bottomViewAllLink="#"
      >
        <div className="flex flex-col gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-4 items-start">
              {/* Icon */}
              <div className="shrink-0 relative">
                <div className="w-8 h-8 bg-gray-200 rounded-full shadow-[0px_0px_0px_4px_rgba(255,255,255,1.00)] flex items-center justify-center">
                  <img src={activity.icon} alt="" className="w-4 h-4" />
                </div>
                {/* Vertical line (hidden for last item) */}
                {index < activities.length - 1 && (
                  <div className="absolute left-1/2 top-5 -translate-x-1/2 w-0.5 h-16 bg-gray-200" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-1">
                <CardPrimaryText>
                  {activity.user} {activity.action} {activity.detail && activity.detail}
                </CardPrimaryText>
                <CardSecondaryText>{activity.time}</CardSecondaryText>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </>
  );
};

export default RecentAuditActivityCard;
