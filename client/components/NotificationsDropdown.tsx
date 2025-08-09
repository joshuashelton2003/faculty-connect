import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Briefcase,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  UserCheck,
  Calendar,
  Award,
  Building,
} from "lucide-react";

interface Notification {
  id: string;
  type: "application" | "interview" | "job-match" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

const NotificationsDropdown: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "application",
      title: "Application Update",
      message:
        "Your application for Computer Science Professor at Anna University has been shortlisted",
      timestamp: "2 hours ago",
      isRead: false,
      actionUrl: "/applications/1",
    },
    {
      id: "2",
      type: "job-match",
      title: "New Job Match",
      message:
        "Mathematics Professor position at PSG College matches your profile (92%)",
      timestamp: "4 hours ago",
      isRead: false,
      actionUrl: "/jobs/2",
    },
    {
      id: "3",
      type: "interview",
      title: "Interview Scheduled",
      message:
        "Interview scheduled for tomorrow at 2:00 PM for Physics Lecturer position",
      timestamp: "1 day ago",
      isRead: true,
      actionUrl: "/applications/3",
    },
    {
      id: "4",
      type: "message",
      title: "New Message",
      message:
        "HR from NIT Trichy sent you a message regarding your application",
      timestamp: "2 days ago",
      isRead: true,
      actionUrl: "/messages/4",
    },
    {
      id: "5",
      type: "system",
      title: "Profile Completion",
      message: "Complete your profile to get 5x more job opportunities",
      timestamp: "3 days ago",
      isRead: false,
      actionUrl: "/profile",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case "interview":
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case "job-match":
        return <Award className="w-4 h-4 text-green-600" />;
      case "message":
        return <MessageCircle className="w-4 h-4 text-orange-600" />;
      case "system":
        return <Bell className="w-4 h-4 text-gray-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="p-0 cursor-pointer"
                onClick={() => handleNotificationClick(notification)}
              >
                <div
                  className={`w-full p-4 border-b last:border-b-0 ${!notification.isRead ? "bg-blue-50" : ""}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={`text-sm font-medium ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}
                        >
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No notifications yet</p>
              <p className="text-xs text-gray-400 mt-1">
                We'll notify you when something important happens
              </p>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-center text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => navigate("/faculty/notifications")}
          >
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
