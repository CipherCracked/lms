import BuyCourse from '@/components/BuyCourse'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseByIdQuery, useGetLectureQuery } from '@/features/api/courseApi'
import { useLoadUserQuery } from '@/features/api/authApi'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const courseDetail = () => {
    const {courseId} = useParams();
    const [selectedLecture, setSelectedLecture] = useState(0); // Track selected lecture index
    const [videoUrl, setVideoUrl] = useState(''); // Track current video URL
    const {data,isSuccess,isLoading,isError} = useGetCourseByIdQuery(courseId);
    const {data:userData, isLoading:userLoading, isError:userError} = useLoadUserQuery();
    const {data:lectureData, isLoading:lectureLoading, isError:lectureError} = useGetLectureQuery(courseId);
    
    // Update videoUrl when selectedLecture or lectures change
    useEffect(() => {
        if (lectureData?.lectures && lectureData.lectures[selectedLecture]) {
            setVideoUrl(lectureData.lectures[selectedLecture].videoUrl || '');
        }
    }, [selectedLecture, lectureData]);
    
    if(isError || userError || lectureError){
        return <h1>Error in fetching course</h1>
    }
    if(isLoading || userLoading || lectureLoading){
        return <h1>Loading...</h1>
    }
    const course = data?.course;
    const creator = data?.creator;
    const user = userData?.user;
    const purchased = user.enrolledCourses.includes(courseId);
    const lectures = lectureData?.lectures;
    console.log(course);
    console.log(lectures);
    return (
        <div className='mt-20 space-y-5'>
            <div className='bg-[#2D2F31] text-white'>
                <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl md:text-3xl'>{course?.courseTitle}</h1>
                    <p className='text-base md:text-lg'>{course?.subTitle}</p>
                    <p className='text-base md:text-lg'>Created By <span className='text-[#C0C4FC] underline italic'>{creator?.name}</span></p>
                    <div className='items-center gap-2 flex text-sm'>
                        <BadgeInfo size={16} />
                        <p>Last updated {course?.updatedAt.split("T")[0]}</p>
                    </div>
                    <p>Student enrolled: {course?.enrolledStudents.length}</p>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-4 md:px-8 my-5 flex flex-col lg:flex-row justify-between gap-10'>
                <div className='w-full lg:w-1/2 space-y-5'>
                    <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
                    <p className='text-sm'>{course?.description}</p>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>
                                {lectures.length} Lectures
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            {lectures.map((lecture, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex items-center gap-3 text-sm cursor-pointer p-2 rounded ${
                                        selectedLecture === idx ? 'bg-gray-100' : 'hover:bg-gray-50'
                                    }`}
                                    onClick={() => setSelectedLecture(idx)}
                                >
                                    <span>
                                        {
                                            purchased ? (<PlayCircle size={14} />) : (<Lock size={14} />)
                                        }
                                    </span>
                                    <p>{lecture?.lectureTitle}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className='w-full lg:w-1/3'>
                    <Card>
                        {purchased && <CardContent className='p-4 flex flex-col'>
                            <div className='w-full aspect-video mb-4'>
                                <video key={videoUrl} src={videoUrl} controls></video>
                            </div>
                            <h1 className='text-lg md:text-xl font-semibold'>{lectures[selectedLecture]?.lectureTitle}</h1>
                            <Separator className='my-2'/>
                            <h1 className='text-lg md:text-xl font-semibold'>{course?.price}</h1>
                        </CardContent>}
                        <CardFooter className='flex justify-center p-4'>
                            {
                                purchased?(<Button className='w-full'>Continue Course</Button>):(<BuyCourse/>)
                            }
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default courseDetail