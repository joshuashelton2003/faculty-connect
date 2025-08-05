import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobsStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { employerAnalyticsData } from '@/data/sampleApplications';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Briefcase, 
  Eye,
  UserCheck,
  Calendar,
  MapPin,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const { jobs } = useJobsStore();
  const [dateRange, setDateRange] = useState('30d');
  const [metricType, setMetricType] = useState('applications');

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Calculate trend percentages (mock data for demo)
  const getTrendPercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Mock previous period data for trend calculation
  const previousPeriodData = {
    activeJobsCount: 142,
    totalApplicationsCount: 587,
    jobViewsCount: 5234,
    shortlistedCandidatesCount: 76
  };

  const trends = {
    activeJobs: getTrendPercentage(employerAnalyticsData.activeJobsCount, previousPeriodData.activeJobsCount),
    applications: getTrendPercentage(employerAnalyticsData.totalApplicationsCount, previousPeriodData.totalApplicationsCount),
    views: getTrendPercentage(employerAnalyticsData.jobViewsCount, previousPeriodData.jobViewsCount),
    shortlisted: getTrendPercentage(employerAnalyticsData.shortlistedCandidatesCount, previousPeriodData.shortlistedCandidatesCount)
  };

  // Application status distribution data
  const applicationStatusData = [
    { name: 'Submitted', value: 234, color: '#3B82F6' },
    { name: 'Under Review', value: 189, color: '#F59E0B' },
    { name: 'Shortlisted', value: 89, color: '#8B5CF6' },
    { name: 'Interviewed', value: 67, color: '#06B6D4' },
    { name: 'Selected', value: 23, color: '#10B981' },
    { name: 'Rejected', value: 48, color: '#EF4444' }
  ];

  // Monthly application trends
  const monthlyTrends = [
    { month: 'Aug', applications: 45, views: 890 },
    { month: 'Sep', applications: 67, views: 1234 },
    { month: 'Oct', applications: 89, views: 1567 },
    { month: 'Nov', applications: 134, views: 2123 },
    { month: 'Dec', applications: 156, views: 2456 },
    { month: 'Jan', applications: 159, views: 2234 }
  ];

  // Department wise applications
  const departmentData = [
    { department: 'Computer Science', applications: 145, jobs: 12 },
    { department: 'Mechanical Engineering', applications: 98, jobs: 8 },
    { department: 'Electronics & Communication', applications: 87, jobs: 7 },
    { department: 'Civil Engineering', applications: 76, jobs: 6 },
    { department: 'Electrical Engineering', applications: 65, jobs: 5 },
    { department: 'Mathematics', applications: 54, jobs: 4 },
    { department: 'Physics', applications: 43, jobs: 3 },
    { department: 'Chemistry', applications: 38, jobs: 3 },
    { department: 'English Literature', applications: 32, jobs: 2 },
    { department: 'Others', applications: 62, jobs: 5 }
  ];

  // Location wise applications (Tamil Nadu focus)
  const locationData = employerAnalyticsData.applicationsByLocation;

  // Performance metrics by job type
  const jobTypePerformance = [
    { type: 'Assistant Professor', posted: 45, applications: 234, avgApplications: 5.2 },
    { type: 'Associate Professor', posted: 28, applications: 189, avgApplications: 6.8 },
    { type: 'Professor', posted: 12, applications: 87, avgApplications: 7.3 },
    { type: 'Lecturer', posted: 35, applications: 98, avgApplications: 2.8 },
    { type: 'Principal', posted: 8, applications: 42, avgApplications: 5.3 }
  ];

  const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center mt-2">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(trend)}% vs last period
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TrendAnalysis = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Application Trends (Last 6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="applications" 
              stackId="1"
              stroke="#3B82F6" 
              fill="#3B82F6" 
              fillOpacity={0.6}
              name="Applications"
            />
            <Area 
              type="monotone" 
              dataKey="views" 
              stackId="2"
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.3}
              name="Job Views"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const ApplicationStatusChart = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChartIcon className="w-5 h-5 mr-2" />
          Application Status Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-6">
            <div className="space-y-3">
              {applicationStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{item.value}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({Math.round((item.value / applicationStatusData.reduce((sum, item) => sum + item.value, 0)) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DepartmentPerformance = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Department-wise Applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={departmentData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="department" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const LocationAnalytics = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Applications by Location (Tamil Nadu)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locationData.map((location, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-32">
                  <span className="text-sm font-medium text-gray-900">{location.location}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-900">{location.count}</span>
                <span className="text-xs text-gray-500 ml-1">({location.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const TopPerformingJobs = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle>Top Performing Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employerAnalyticsData.topPerformingJobs.map((job, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{job.title}</h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applications} applications
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {job.views} views
                  </span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">#{index + 1}</Badge>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((job.applications / job.views) * 100)}% conversion
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const JobTypeAnalytics = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle>Job Type Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={jobTypePerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgApplications" fill="#10B981" name="Avg Applications per Job" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/employer/dashboard')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">
                Comprehensive insights into your recruitment performance and trends
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Jobs"
            value={employerAnalyticsData.activeJobsCount}
            trend={trends.activeJobs}
            icon={Briefcase}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Applications"
            value={employerAnalyticsData.totalApplicationsCount}
            trend={trends.applications}
            icon={Users}
            color="bg-green-500"
          />
          <StatCard
            title="Job Views"
            value={employerAnalyticsData.jobViewsCount.toLocaleString()}
            trend={trends.views}
            icon={Eye}
            color="bg-yellow-500"
          />
          <StatCard
            title="Shortlisted"
            value={employerAnalyticsData.shortlistedCandidatesCount}
            trend={trends.shortlisted}
            icon={UserCheck}
            color="bg-purple-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TrendAnalysis />
          <ApplicationStatusChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DepartmentPerformance />
          <LocationAnalytics />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TopPerformingJobs />
          <JobTypeAnalytics />
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Time to Hire</span>
                  <span className="font-semibold">18 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Application Rate</span>
                  <span className="font-semibold">12.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interview Rate</span>
                  <span className="font-semibold">15.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selection Rate</span>
                  <span className="font-semibold">3.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">New application received</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">Job posted successfully</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">Candidate shortlisted</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">Interview scheduled</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Boost Visibility</p>
                  <p className="text-xs text-blue-700">Consider promoting your Computer Science jobs to increase applications.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Optimal Timing</p>
                  <p className="text-xs text-green-700">Post new jobs on Monday-Wednesday for better response rates.</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-900">Quick Response</p>
                  <p className="text-xs text-yellow-700">Respond to applications within 3 days to maintain candidate interest.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
