'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Trophy, TrendingUp, Award, Medal } from 'lucide-react';

const mockLeaderboard = [
  {
    id: '1',
    rank: 1,
    name: 'Sarah Johnson',
    avatar: '👩‍💼',
    points: 2850,
    coursesCompleted: 12,
    streak: 45,
    badges: 8,
  },
  {
    id: '2',
    rank: 2,
    name: 'Michael Chen',
    avatar: '👨‍💻',
    points: 2720,
    coursesCompleted: 11,
    streak: 38,
    badges: 7,
  },
  {
    id: '3',
    rank: 3,
    name: 'Emma Wilson',
    avatar: '👩‍🎨',
    points: 2650,
    coursesCompleted: 10,
    streak: 42,
    badges: 6,
  },
  {
    id: '4',
    rank: 4,
    name: 'John Doe',
    avatar: '👨‍🚀',
    points: 2480,
    coursesCompleted: 9,
    streak: 30,
    badges: 5,
    isCurrentUser: true,
  },
  {
    id: '5',
    rank: 5,
    name: 'Lisa Anderson',
    avatar: '👩‍🔬',
    points: 2350,
    coursesCompleted: 8,
    streak: 25,
    badges: 5,
  },
];

const achievements = [
  {
    id: '1',
    name: 'Course Marathon',
    description: 'Complete 10 courses',
    icon: '🏃',
    unlocked: true,
  },
  {
    id: '2',
    name: 'Perfect Score',
    description: 'Get 100% on 5 assignments',
    icon: '💯',
    unlocked: true,
  },
  {
    id: '3',
    name: 'Consistent Learner',
    description: '30-day streak',
    icon: '🔥',
    unlocked: true,
  },
  {
    id: '4',
    name: 'Knowledge Master',
    description: 'Complete 20 courses',
    icon: '🎓',
    unlocked: false,
  },
];

export default function LeaderboardPage() {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-white font-bold">
            <Trophy className="h-6 w-6" />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full text-white font-bold">
            <Medal className="h-6 w-6" />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full text-white font-bold">
            <Award className="h-6 w-6" />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 font-bold">
            #{rank}
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">See how you rank among your peers</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Top Learners</h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>This Month</option>
                    <option>This Quarter</option>
                    <option>All Time</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {mockLeaderboard.map((user) => (
                  <div
                    key={user.id}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      user.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {getRankBadge(user.rank)}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="text-3xl">{user.avatar}</div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {user.name}
                              {user.isCurrentUser && (
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                                  You
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                                {user.points} pts
                              </span>
                              <span>🔥 {user.streak} days</span>
                              <span>🎓 {user.coursesCompleted} courses</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {user.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Stats */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl text-white">
              <h3 className="text-lg font-bold mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Current Rank</span>
                  <span className="text-2xl font-bold">#4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Total Points</span>
                  <span className="text-2xl font-bold">2,480</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">To Next Rank</span>
                  <span className="text-xl font-semibold">170 pts</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-400">
                <div className="flex items-center justify-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>Up 2 ranks this month!</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {achievement.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earn More Points */}
            <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Earn More Points</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">✅</span>
                  <span>Complete a lesson: <strong>+10 pts</strong></span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📝</span>
                  <span>Submit assignment: <strong>+50 pts</strong></span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎓</span>
                  <span>Finish a course: <strong>+200 pts</strong></span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔥</span>
                  <span>Daily streak: <strong>+5 pts/day</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
