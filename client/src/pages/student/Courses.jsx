import { Skeleton } from '@/components/ui/skeleton';
import React, { useState, useMemo } from 'react'
import Course from './Course';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';
import { toast } from 'sonner';
import HeroSection from './HeroSection';
import { Button } from '@/components/ui/button';

// const courses = [1,2,3,4,5,6];

const Courses = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {data, isSuccess, isLoading, isError} = useGetPublishedCourseQuery();
    
    // Filter courses based on search query
    const filteredCourses = useMemo(() => {
        if (!data?.courses || !searchQuery.trim()) {
            return data?.courses || [];
        }
        
        const query = searchQuery.toLowerCase().trim();
        return data.courses.filter(course => 
            course.courseTitle?.toLowerCase().includes(query) ||
            course.description?.toLowerCase().includes(query) ||
            course.category?.toLowerCase().includes(query) ||
            course.subTitle?.toLowerCase().includes(query)
        );
    }, [data?.courses, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    if (isError) {
        return (
            <div className='bg-gray-50 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-red-600 mb-2'>Error in fetching courses</h1>
                    <p className='text-gray-600'>Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gray-50'>
            <HeroSection onSearch={handleSearch} />
            <div className='max-w-7xl mx-auto p-6'>
                <div className='mb-8'>
                    {searchQuery ? (
                        <div className='text-center'>
                            <h2 className='font-bold text-3xl mb-2'>Search Results</h2>
                            <p className='text-gray-600 mb-4'>
                                Searching for "{searchQuery}"
                            </p>
                            <p className='text-sm text-gray-500 mb-4'>
                                Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                            </p>
                            <Button 
                                onClick={clearSearch}
                                variant="outline"
                                className="bg-white hover:bg-gray-50"
                            >
                                Show All Courses
                            </Button>
                        </div>
                    ) : (
                        <h2 className='font-bold text-3xl text-center mb-10'>Our Courses</h2>
                    )}
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        isLoading ? (
                            Array.from({length: 8}).map((_, index) => (
                                <CourseSkeleton key={index}/>
                            ))
                        ) : filteredCourses.length === 0 ? (
                            <div className='col-span-full text-center py-12'>
                                {searchQuery ? (
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                                            No courses found for "{searchQuery}"
                                        </h3>
                                        <p className='text-gray-500 mb-4'>
                                            Try searching with different keywords or browse all courses
                                        </p>
                                        <Button 
                                            onClick={clearSearch}
                                            variant="outline"
                                            className="bg-white hover:bg-gray-50"
                                        >
                                            Show All Courses
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                                            No courses available
                                        </h3>
                                        <p className='text-gray-500'>
                                            Check back later for new courses
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            filteredCourses.map((course, index) => (
                                <Course key={course._id || index} course={course}/>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Courses

const CourseSkeleton = () => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
};