import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Users, Calendar } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { Student } from '../types';

const Leaderboards: React.FC = () => {
  const { currentStudent } = useStudent();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'all-time'>('all-time');
  const [selectedScope, setSelectedScope] = useState<'school' | 'state' | 'national'>('school');

  // Generate mock leaderboard data
  const generateLeaderboardData = (): Student[] => {
    const mockStudents: Student[] = [
      {
        ...currentStudent,
        ecoPoints: selectedPeriod === 'weekly' ? 180 : selectedPeriod === 'monthly' ? 720 : currentStudent.ecoPoints
      },
      {
        id: 'student-2',
        name: 'Priya Patel',
        grade: '10th',
        school: 'Green Valley School',
        state: 'Gujarat',
        ecoPoints: selectedPeriod === 'weekly' ? 220 : selectedPeriod === 'monthly' ? 850 : 1380,
        level: 8,
        streak: 15,
        completedLessons: ['lesson-1', 'lesson-2'],
        completedChallenges: ['challenge-1', 'challenge-2', 'challenge-3', 'challenge-4'],
        earnedBadges: [],
        totalImpactScore: 138,
        weeklyGoal: 200,
        monthlyGoal: 800,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        joinDate: '2023-12-15T00:00:00Z'
      },
      {
        id: 'student-3',
        name: 'Rahul Kumar',
        grade: '9th',
        school: 'Green Valley School',
        state: 'Bihar',
        ecoPoints: selectedPeriod === 'weekly' ? 165 : selectedPeriod === 'monthly' ? 650 : 1180,
        level: 6,
        streak: 8,
        completedLessons: ['lesson-1'],
        completedChallenges: ['challenge-1', 'challenge-5'],
        earnedBadges: [],
        totalImpactScore: 118,
        weeklyGoal: 200,
        monthlyGoal: 800,
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        joinDate: '2024-01-10T00:00:00Z'
      },
      {
        id: 'student-4',
        name: 'Sneha Reddy',
        grade: '10th',
        school: 'Eco Warriors High',
        state: 'Telangana',
        ecoPoints: selectedPeriod === 'weekly' ? 195 : selectedPeriod === 'monthly' ? 780 : 1320,
        level: 7,
        streak: 11,
        completedLessons: ['lesson-1', 'lesson-2'],
        completedChallenges: ['challenge-1', 'challenge-2', 'challenge-3'],
        earnedBadges: [],
        totalImpactScore: 132,
        weeklyGoal: 200,
        monthlyGoal: 800,
        avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        joinDate: '2023-11-20T00:00:00Z'
      },
      {
        id: 'student-5',
        name: 'Aarav Singh',
        grade: '8th',
        school: 'Nature Lovers Academy',
        state: 'Rajasthan',
        ecoPoints: selectedPeriod === 'weekly' ? 155 : selectedPeriod === 'monthly' ? 620 : 980,
        level: 5,
        streak: 6,
        completedLessons: ['lesson-1'],
        completedChallenges: ['challenge-1', 'challenge-4'],
        earnedBadges: [],
        totalImpactScore: 98,
        weeklyGoal: 200,
        monthlyGoal: 800,
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        joinDate: '2024-02-01T00:00:00Z'
      }
    ];

    return mockStudents.sort((a, b) => b.ecoPoints - a.ecoPoints);
  };

  const leaderboardData = generateLeaderboardData();
  const currentStudentRank = leaderboardData.findIndex(student => student.id === currentStudent.id) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200';
      case 2: return 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-200';
      case 3: return 'bg-gradient-to-r from-amber-100 to-amber-50 border-amber-200';
      default: return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">🏆 Leaderboards</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          See how you stack up against other eco-warriors across India! Compete, learn, and make a difference together.
        </p>
      </motion.div>

      {/* Current Student Rank */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-[#F8D991] to-[#F6B080] text-[#091D23] rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-[#091D23]/20 rounded-full p-3">
              {getRankIcon(currentStudentRank)}
            </div>
            <div>
              <h3 className="text-2xl font-bold">Your Current Rank: #{currentStudentRank}</h3>
              <p className="text-[#091D23]/70">
                {currentStudentRank === 1 ? 'You\'re in the lead! 🌟' : 
                 `${leaderboardData[0].ecoPoints - currentStudent.ecoPoints} points behind the leader`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentStudent.ecoPoints}</div>
            <div className="text-[#091D23]/70">Eco Points</div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Time Period</label>
            <div className="flex space-x-2">
              {(['weekly', 'monthly', 'all-time'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-[#E1664C] text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {period.charAt(0).toUpperCase() + period.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Scope</label>
            <div className="flex space-x-2">
              {(['school', 'state', 'national'] as const).map((scope) => (
                <button
                  key={scope}
                  onClick={() => setSelectedScope(scope)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedScope === scope
                      ? 'bg-[#F8D991] text-[#091D23]'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-1" />
                  {scope.charAt(0).toUpperCase() + scope.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-8 text-center">🏆 Top Performers</h2>
        <div className="flex justify-center items-end space-x-8">
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-white/10 rounded-lg p-6 mb-4 h-32 flex flex-col justify-end">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-gray-400"
                />
                <div className="text-4xl mb-2">🥈</div>
              </div>
              <h3 className="font-bold text-white">{leaderboardData[1].name}</h3>
              <p className="text-white/70 text-sm">{leaderboardData[1].school}</p>
              <p className="text-xl font-bold text-[#F6B080]">{leaderboardData[1].ecoPoints} pts</p>
            </motion.div>
          )}

          {/* 1st Place */}
          {leaderboardData[0] && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="bg-[#F8D991]/20 rounded-lg p-6 mb-4 h-40 flex flex-col justify-end border border-[#F8D991]/30">
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].name}
                  className="w-20 h-20 rounded-full mx-auto mb-2 border-4 border-[#F8D991]"
                />
                <div className="text-5xl mb-2">🏆</div>
              </div>
              <h3 className="font-bold text-white text-lg">{leaderboardData[0].name}</h3>
              <p className="text-white/70">{leaderboardData[0].school}</p>
              <p className="text-2xl font-bold text-[#F8D991]">{leaderboardData[0].ecoPoints} pts</p>
            </motion.div>
          )}

          {/* 3rd Place */}
          {leaderboardData[2] && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-[#F58B60]/20 rounded-lg p-6 mb-4 h-28 flex flex-col justify-end border border-[#F58B60]/30">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].name}
                  className="w-14 h-14 rounded-full mx-auto mb-2 border-4 border-[#F58B60]"
                />
                <div className="text-3xl mb-2">🥉</div>
              </div>
              <h3 className="font-bold text-white">{leaderboardData[2].name}</h3>
              <p className="text-white/70 text-sm">{leaderboardData[2].school}</p>
              <p className="text-xl font-bold text-[#F58B60]">{leaderboardData[2].ecoPoints} pts</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white">Full Rankings</h2>
        </div>
        <div className="divide-y divide-white/10">
          {leaderboardData.map((student, index) => {
            const rank = index + 1;
            const isCurrentStudent = student.id === currentStudent.id;
            return (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className={`p-6 hover:bg-white/5 transition-colors ${
                  isCurrentStudent ? 'bg-[#E1664C]/20 border-l-4 border-[#E1664C]' : ''
                } ${getRankBg(rank)} border`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {getRankIcon(rank)}
                    </div>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                    <div>
                      <h3 className={`font-bold ${isCurrentStudent ? 'text-white' : 'text-white'}`}>
                        {student.name}
                        {isCurrentStudent && <span className="ml-2 text-[#E1664C]">(You)</span>}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {student.school} • Grade {student.grade}
                      </p>
                      <p className="text-white/60 text-xs">{student.state}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center space-x-1 text-[#E1664C]">
                        <span className="text-lg">🔥</span>
                        <span className="font-bold">{student.streak}</span>
                      </div>
                      <div className="text-xs text-white/60">day streak</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-[#F6B080] font-bold">Level {student.level}</div>
                      <div className="text-xs text-white/60">experience</div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-[#F8D991]" />
                        <span className="text-2xl font-bold text-white">
                          {student.ecoPoints.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-white/70">eco points</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-r from-[#F58B60] to-[#E1664C] text-white rounded-xl p-6 text-center"
      >
        <h3 className="text-xl font-bold mb-2">🌟 Keep Going!</h3>
        <p className="text-white/80">
          Every challenge you complete and lesson you learn makes a real difference for our planet. 
          {currentStudentRank > 1 && ` You're only ${leaderboardData[0].ecoPoints - currentStudent.ecoPoints} points away from the top!`}
        </p>
      </motion.div>
    </div>
  );
};

export default Leaderboards;