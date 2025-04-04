import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreateLecture = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const params=useParams();
    const courseId=params.courseId;
    const isLoading = false;
    const navigate = useNavigate();
    const createLectureHandler = async()=>{
        
    }
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
            </div>
        </div>
    )
}

export default CreateLecture