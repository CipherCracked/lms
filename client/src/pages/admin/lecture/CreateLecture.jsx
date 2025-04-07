import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetLectureQuery } from '@/features/api/courseApi.js'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;
    // const isLoading = false;
    const navigate = useNavigate();
    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();
    const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetLectureQuery(courseId);
    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    };
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data.message || "lecture created successfully");
        }
        if (error) {
            toast.error(error.data.message || "lecture not created");
        }
    }, [isSuccess, error])
    console.log(lectureData);
    useEffect(()=>{
        refetch();
    }, [])
    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>
                    Let's add lectures, add some basic details for your new lecture
                </h1>
                <p className='text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, labore!
                </p>
            </div>
            <div className='space-y-4'>
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Your Lecture Title"
                    />
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant="outline" onClick={() => navigate(`../course/${courseId}`)}>Back to Course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please Wait
                                </>
                            ) :
                                "Create Lecture"
                        }
                    </Button>
                </div>
                <div className='mt-10'>
                    {
                        lectureLoading ? (<p>Loading Lectures...</p>)
                            : lectureError ? (<p>Failed to Load Lectures</p>)
                                : lectureData.lectures.length === 0 ? (<p>No lectures created yet.</p>)
                                    : (
                                        lectureData.lectures.map((lecture, index) => (
                                            <Lecture key={lectureData._id} lecture={lecture} index={index} courseId={courseId} />
                                        ))
                                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateLecture