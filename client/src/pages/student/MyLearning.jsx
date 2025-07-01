import React from 'react'
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi'
import { useGetCourseByIdQuery } from '@/features/api/courseApi'

const MyLearning = () => {
    const { data: userData, isLoading: userLoading } = useLoadUserQuery();
    const user = userData?.user;
    const enrolledCourses = user?.enrolledCourses || [];
    
    return (
        <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
            <h1 className='font-bold text-2xl'>MY LEARNING</h1>
            <div className='my-5'>
                {
                    userLoading ? (
                        <MyLearningSkeleton/>
                    ) : enrolledCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                                No courses enrolled yet
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Start your learning journey by enrolling in courses!
                            </p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {enrolledCourses.map((courseId, index) => (
                                <EnrolledCourseCard key={courseId} courseId={courseId} />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

// Component to fetch and display individual enrolled course
const EnrolledCourseCard = ({ courseId }) => {
    const { data, isLoading, error } = useGetCourseByIdQuery(courseId);
    
    if (isLoading) {
        return (
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 animate-pulse"></div>
        );
    }
    
    if (error || !data?.course) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400 text-sm">Course not found</p>
            </div>
        );
    }
    
    return <Course course={data.course} />;
};

export default MyLearning

const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );