'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Clock, Video, FileText, CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const mockSchedule = [
  {
    id: '1',
    course: 'Advanced React Development',
    title: 'React Hooks Deep Dive',
    type: 'live',
    date: '2025-11-13',
    time: '10:00 AM - 11:30 AM',
    instructor: 'Sarah Johnson',
    status: 'upcoming',
  },
  {
    id: '2',
    course: 'Python for Data Science',
    title: 'Pandas Assignment Due',
    type: 'assignment',
    date: '2025-11-14',
    time: '11:59 PM',
    instructor: 'Michael Chen',
    status: 'upcoming',
  },
  {
    id: '3',
    course: 'UI/UX Design Fundamentals',
    title: 'User Testing Workshop',
    type: 'live',
    date: '2025-11-15',
    time: '2:00 PM - 3:30 PM',
    instructor: 'Emma Wilson',
    status: 'upcoming',
  },
  {
    id: '4',
    course: 'Advanced React Development',
    title: 'Final Project Presentation',
    type: 'exam',
    date: '2025-11-18',
    time: '9:00 AM - 12:00 PM',
    instructor: 'Sarah Johnson',
    status: 'upcoming',
  },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live':
        return <Video className="h-5 w-5" />;
      case 'assignment':
        return <FileText className="h-5 w-5" />;
      case 'exam':
        return <CheckSquare className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'live':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'assignment':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'exam':
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
          <p className="text-gray-600">Manage your learning schedule and upcoming events</p>
        </div>

        {/* Calendar Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Month
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Today
              </button>
            </div>
          </div>

          {/* Mini Calendar */}
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, index) => {
              const day = index - 2; // Start from Monday
              const isToday = day === 13;
              const hasEvent = [13, 14, 15, 18].includes(day);
              
              return (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors ${
                    isToday
                      ? 'bg-blue-600 text-white font-bold'
                      : hasEvent
                      ? 'bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {day > 0 && day <= 30 ? day : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Types</option>
              <option>Live Sessions</option>
              <option>Assignments</option>
              <option>Exams</option>
            </select>
          </div>

          <div className="space-y-4">
            {mockSchedule.map((event) => (
              <div
                key={event.id}
                className={`p-5 rounded-xl border-2 ${getTypeColor(event.type)} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(event.type)}`}>
                        {getTypeIcon(event.type)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-600 mb-1">
                          {event.course}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="ml-14 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="text-sm text-gray-600">
                        Instructor: {event.instructor}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      event.type === 'live' ? 'bg-blue-100 text-blue-600' :
                      event.type === 'assignment' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                    {event.type === 'live' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Join Session
                      </button>
                    )}
                    {event.type === 'assignment' && (
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                        Submit Work
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
