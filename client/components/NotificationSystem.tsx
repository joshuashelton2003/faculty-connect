import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/store/authStore';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Briefcase,
  MessageSquare,
  AlertCircle,
  Calendar,
  Users,
  Star,
  TrendingUp,
  Mail,
  FileText,
  Building,
  GraduationCap,
  X
} from 'lucide-react';

export interface Notification {
  id: string;
  type: 'job_match' | 'application_update' | 'interview_scheduled' | 'message' | 'system' | 'achievement' | 'deadline' | 'job_alert';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: {
    jobTitle?: string;
    instituteName?: string;
    senderName?: string;
    status?: string;
    deadline?: string;
    priority?: 'low' | 'medium' | 'high';
  };
}

// Sample notification data
const generateNotifications = (userRole: string): Notification[] => {
  const baseNotifications: Notification[] = [
    {
      id: 'notif-001',
      type: 'job_match',
      title: 'New Job Match Found',
      message: 'Assistant Professor - Computer Science at Anna University matches your profile (95% match)',
      isRead: false,
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      actionUrl: '/jobs/job-001',
      metadata: {
        jobTitle: 'Assistant Professor - Computer Science',
        instituteName: 'Anna University',
        priority: 'high'
      }
    },
    {
      id: 'notif-002',
      type: 'application_update',
      title: 'Application Status Updated',
      message: 'Your application for Associate Professor at VIT University has been shortlisted',
      isRead: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      actionUrl: '/dashboard?tab=applications',
      metadata: {
        jobTitle: 'Associate Professor - Data Science',
        instituteName: 'VIT University',
        status: 'Shortlisted',
        priority: 'high'
      }
    },
    {
      id: 'notif-003',
      type: 'interview_scheduled',
      title: 'Interview Scheduled',
      message: 'Interview scheduled for Professor position at IIT Madras on January 25, 2025 at 10:00 AM',
      isRead: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      actionUrl: '/dashboard?tab=interviews',
      metadata: {
        jobTitle: 'Professor - Machine Learning',
        instituteName: 'IIT Madras',
        deadline: '2025-01-25T10:00:00Z',
        priority: 'high'
      }
    },
    {
      id: 'notif-004',
      type: 'message',
      title: 'New Message from HR',
      message: 'HR Manager from PSG College of Technology sent you a message regarding your application',
      isRead: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      actionUrl: '/messages',
      metadata: {
        senderName: 'Dr. Rajesh Kumar',
        instituteName: 'PSG College of Technology',
        priority: 'medium'
      }
    },
    {
      id: 'notif-005',
      type: 'job_alert',
      title: 'New Jobs in Your Area',
      message: '5 new faculty positions posted in Chennai that match your preferences',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      actionUrl: '/jobs?location=Chennai',
      metadata: {
        priority: 'medium'
      }
    },
    {
      id: 'notif-006',
      type: 'system',
      title: 'Profile Completion Reminder',
      message: 'Complete your profile to get better job matches. You\'re 75% complete.',
      isRead: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      actionUrl: '/profile',
      metadata: {
        priority: 'low'
      }
    },
    {
      id: 'notif-007',
      type: 'achievement',
      title: 'Profile Views Milestone',
      message: 'Congratulations! Your profile has been viewed 100+ times this month',
      isRead: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      metadata: {
        priority: 'low'
      }
    },
    {
      id: 'notif-008',
      type: 'deadline',
      title: 'Application Deadline Reminder',
      message: 'Application deadline for Lecturer position at Loyola College is in 2 days',
      isRead: false,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
      actionUrl: '/jobs/job-008',
      metadata: {
        jobTitle: 'Lecturer - Physics',
        instituteName: 'Loyola College',
        deadline: '2025-01-20T23:59:59Z',
        priority: 'medium'
      }
    }
  ];

  // Add role-specific notifications
  if (userRole === 'employer') {
    return [
      {
        id: 'emp-notif-001',
        type: 'application_update',
        title: 'New Application Received',
        message: 'Dr. Priya Sharma applied for Assistant Professor - Computer Science position',
        isRead: false,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        actionUrl: '/employer/applications',
        metadata: {
          jobTitle: 'Assistant Professor - Computer Science',
          senderName: 'Dr. Priya Sharma',
          priority: 'high'
        }
      },
      {
        id: 'emp-notif-002',
        type: 'job_alert',
        title: 'Job Posting Approved',
        message: 'Your job posting for Associate Professor - Mathematics has been approved and is now live',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        actionUrl: '/employer/my-jobs',
        metadata: {
          jobTitle: 'Associate Professor - Mathematics',
          priority: 'medium'
        }
      },
      {
        id: 'emp-notif-003',
        type: 'system',
        title: 'Monthly Analytics Ready',
        message: 'Your recruitment analytics for December 2024 are now available',
        isRead: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        actionUrl: '/employer/analytics',
        metadata: {
          priority: 'low'
        }
      },
      ...baseNotifications.slice(3) // Add some general notifications
    ];
  }

  return baseNotifications;
};

const NotificationSystem: React.FC = () => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load notifications based on user role
    if (user?.role) {
      const userNotifications = generateNotifications(user.role);
      setNotifications(userNotifications);
    }
  }, [user?.role]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      job_match: Briefcase,
      application_update: FileText,
      interview_scheduled: Calendar,
      message: MessageSquare,
      system: Settings,
      achievement: Star,
      deadline: AlertCircle,
      job_alert: TrendingUp
    };
    
    const IconComponent = iconMap[type as keyof typeof iconMap] || Bell;
    return <IconComponent className="w-4 h-4" />;
  };

  const getNotificationColor = (type: string, priority?: string) => {
    if (priority === 'high') return 'text-red-600 bg-red-50';
    if (priority === 'medium') return 'text-orange-600 bg-orange-50';
    
    const colorMap = {
      job_match: 'text-blue-600 bg-blue-50',
      application_update: 'text-green-600 bg-green-50',
      interview_scheduled: 'text-purple-600 bg-purple-50',
      message: 'text-indigo-600 bg-indigo-50',
      system: 'text-gray-600 bg-gray-50',
      achievement: 'text-yellow-600 bg-yellow-50',
      deadline: 'text-red-600 bg-red-50',
      job_alert: 'text-blue-600 bg-blue-50'
    };
    
    return colorMap[type as keyof typeof colorMap] || 'text-gray-600 bg-gray-50';
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const groupedNotifications = notifications.reduce((groups, notification) => {
    const today = new Date();
    const notifDate = new Date(notification.createdAt);
    const isToday = notifDate.toDateString() === today.toDateString();
    const isYesterday = notifDate.toDateString() === new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString();
    
    let group = 'Older';
    if (isToday) group = 'Today';
    else if (isYesterday) group = 'Yesterday';
    
    if (!groups[group]) groups[group] = [];
    groups[group].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-96 p-0" sideOffset={10}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  <CheckCheck className="w-3 h-3 mr-1" />
                  Mark all read
                </Button>
              )}
              <Badge variant="secondary" className="text-xs">
                {notifications.length} total
              </Badge>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-96">
          {notifications.length > 0 ? (
            <div className="p-2">
              {Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
                <div key={group} className="mb-4">
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded">
                    {group}
                  </div>
                  {groupNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 m-1 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (notification.actionUrl) {
                          // Navigate to action URL
                          window.location.href = notification.actionUrl;
                        }
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${getNotificationColor(notification.type, notification.metadata?.priority)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={`text-sm font-medium text-gray-900 line-clamp-1 ${!notification.isRead ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 hover:bg-red-100 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {notification.message}
                          </p>
                          
                          {notification.metadata && (
                            <div className="mt-2 flex items-center space-x-2">
                              {notification.metadata.instituteName && (
                                <Badge variant="outline" className="text-xs">
                                  <Building className="w-3 h-3 mr-1" />
                                  {notification.metadata.instituteName}
                                </Badge>
                              )}
                              {notification.metadata.status && (
                                <Badge 
                                  className={`text-xs ${
                                    notification.metadata.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                                    notification.metadata.status === 'Interviewed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {notification.metadata.status}
                                </Badge>
                              )}
                              {notification.metadata.priority === 'high' && (
                                <Badge className="bg-red-100 text-red-800 text-xs">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Urgent
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full absolute top-3 right-3"></div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-xs text-gray-500">You're all caught up!</p>
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-center text-blue-600 hover:text-blue-700"
            >
              View All Notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationSystem;
