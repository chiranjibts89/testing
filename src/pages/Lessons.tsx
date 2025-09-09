import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, CheckCircle, Award } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

const Lessons: React.FC = () => {
  const { allLessons, currentStudent } = useStudent();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isCompleted = (lessonId: string) => currentStudent.completedLessons.includes(lessonId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Environmental Education</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the fascinating world of environmental science through interactive lessons designed specifically for Indian students.
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Learning Progress</h2>
          <div className="flex items-center space-x-2 text-green-600">
            <Award className="h-5 w-5" />
            <span className="font-semibold">
              {currentStudent.completedLessons.length} / {allLessons.length} Completed
            </span>
          </div>
        </div>
        <div className="bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-3"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStudent.completedLessons.length / allLessons.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-gray-600 text-sm mt-2">
          Complete all lessons to become an Environmental Expert!
        </p>
      </motion.div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allLessons.map((lesson, index) => {
          const completed = isCompleted(lesson.id);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={lesson.imageUrl}
                  alt={lesson.title}
                  className="w-full h-48 object-cover"
                />
                {completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lesson.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{lesson.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <Award className="h-4 w-4" />
                    <span className="text-sm font-semibold">{lesson.points} points</span>
                  </div>
                </div>
                
                <Link
                  to={`/lessons/${lesson.id}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    completed
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {completed ? 'Review Lesson' : 'Start Lesson'}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Climate Change', 'Waste Management', 'Water Conservation', 'Biodiversity'].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">
                {category === 'Climate Change' && '🌍'}
                {category === 'Waste Management' && '♻️'}
                {category === 'Water Conservation' && '💧'}
                {category === 'Biodiversity' && '🦋'}
              </div>
              <h3 className="font-semibold text-gray-800">{category}</h3>
              <p className="text-sm text-gray-600">
                {allLessons.filter(lesson => lesson.category.includes(category.split(' ')[0])).length} lessons
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Lessons;