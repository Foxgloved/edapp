'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { FileText, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';

const mockAssignments = [
  {
    id: '1',
    course: 'Advanced React Development',
    title: 'Build a Custom Hook for Data Fetching',
    dueDate: '2025-11-16',
    status: 'pending',
    points: 100,
    description: 'Create a reusable custom hook that handles API data fetching with loading and error states.',
  },
  {
    id: '2',
    course: 'Python for Data Science',
    title: 'Pandas Data Analysis Project',
    dueDate: '2025-11-14',
    status: 'pending',
    points: 150,
    description: 'Analyze the provided dataset using Pandas and create visualizations.',
  },
  {
    id: '3',
    course: 'UI/UX Design Fundamentals',
    title: 'Wireframe Design for Mobile App',
    dueDate: '2025-11-20',
    status: 'submitted',
    points: 100,
    submittedDate: '2025-11-12',
  },
  {
    id: '4',
    course: 'Advanced React Development',
    title: 'Performance Optimization Case Study',
    dueDate: '2025-11-10',
    status: 'graded',
    points: 100,
    grade: 95,
    feedback: 'Excellent work! Your optimization techniques were well-applied.',
  },
];

export default function HomeworkPage() {
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: string, daysUntilDue?: number) => {
    switch (status) {
      case 'pending':
        if (daysUntilDue !== undefined && daysUntilDue < 2) {
          return (
            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Due Soon
            </span>
          );
        }
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-xs font-semibold rounded-full">
            Pending
          </span>
        );
      case 'submitted':
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Graded
          </span>
        );
      default:
        return null;
    }
  };

  const pendingCount = mockAssignments.filter(a => a.status === 'pending').length;
  const submittedCount = mockAssignments.filter(a => a.status === 'submitted').length;
  const gradedCount = mockAssignments.filter(a => a.status === 'graded').length;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Homework & Assignments</h1>
          <p className="text-gray-600">Track and submit your course assignments</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-3xl font-bold text-yellow-600">{pendingCount}</span>
            </div>
            <div className="text-sm font-medium text-yellow-900">Pending Submissions</div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-blue-600">{submittedCount}</span>
            </div>
            <div className="text-sm font-medium text-blue-900">Awaiting Grading</div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-green-600">{gradedCount}</span>
            </div>
            <div className="text-sm font-medium text-green-900">Graded Assignments</div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {mockAssignments.map((assignment) => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            
            return (
              <div
                key={assignment.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{assignment.course}</div>
                        <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                      </div>
                    </div>
                    {assignment.description && (
                      <p className="text-sm text-gray-600 ml-14 mb-3">{assignment.description}</p>
                    )}
                  </div>
                  {getStatusBadge(assignment.status, daysUntilDue)}
                </div>

                <div className="ml-14 flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                        month: 'short',
                        day: 'numeric'
                      })}
                      {assignment.status === 'pending' && (
                        <span className={`ml-2 font-medium ${
                          daysUntilDue < 2 ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          ({daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'} left)
                        </span>
                      )}
                    </div>
                    <div className="font-medium">
                      Points: {assignment.points}
                    </div>
                    {assignment.status === 'graded' && (
                      <div className="font-semibold text-green-600">
                        Grade: {assignment.grade}/{assignment.points}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {assignment.status === 'pending' && (
                      <>
                        <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          Submit
                        </button>
                      </>
                    )}
                    {assignment.status === 'submitted' && (
                      <div className="text-sm text-gray-600">
                        Submitted on {new Date(assignment.submittedDate!).toLocaleDateString()}
                      </div>
                    )}
                    {assignment.status === 'graded' && (
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        View Feedback
                      </button>
                    )}
                  </div>
                </div>

                {assignment.status === 'graded' && assignment.feedback && (
                  <div className="ml-14 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-semibold text-green-900 mb-1">Instructor Feedback</div>
                    <div className="text-sm text-green-800">{assignment.feedback}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
