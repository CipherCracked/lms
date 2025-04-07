import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = "http://localhost:8080/api/v1/media";
const LectureTab = () => {
    const [lectureTitle, setLectureTitle] = useState("");
    const [videoInfo, setVideoInfo] = useState(null);
    const [isPreviewFree, setIsPreviewFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);
    const [editLecture, { data, isSuccess, isLoading, error }] = useEditLectureMutation();
    const [removeLecture, {isLoading:removeLoading, isSuccess:removeSuccess}] = useRemoveLectureMutation();
    const params = useParams();
    const { courseId, lectureId } = params;
    const {data: lectureData, refetch} = useGetLectureByIdQuery(lectureId);
    const lecture = lectureData?.lecture; 
    const navigate=useNavigate();
    useEffect(()=>{
        if (lecture){
            setLectureTitle(lecture.lectureTitle);
            setIsPreviewFree(lecture.isPreviewFree);
            setVideoInfo(lecture.videoInfo);
        }
    }, [lecture])
    useEffect(()=>{
        refetch();
    }, [])
    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    }
                });
                if (res.data.data.success) {
                    setVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id });
                    setBtnDisable(false);
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error("video upload failed");
            } finally {
                setMediaProgress(false);
            }
        }
    }
    const editLectureHandler = async () => {
        await editLecture({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId });
    }
    const removeLectureHandler = async()=>{
        await removeLecture({courseId, lectureId});
    }
    useEffect(()=>{
        if (removeSuccess){
            toast.success("Lecture Removed Successfully");
            navigate(`../course/${courseId}/lecture`);
        }
    }, [removeSuccess])
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Edited Lecture Successfully");
        }
        if (error) {
            toast.error(error.data.message || "Failed to Edit Lecture");
        }
    }, [isSuccess, error])
    return (
        <Card>
            <CardHeader className='flex justify-between'>
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click save when done</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant="destructive" disabled={removeLoading} onClick={removeLectureHandler}>
                        {
                            removeLoading ? 
                            <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                            Please Wait
                            </>:
                            "Remove Lecture"
                        }
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        placeholder="Ex. Introduction to MongoD"
                        value={lectureTitle}
                        onChange={(e) => { setLectureTitle(e.target.value) }}
                    />
                </div>
                <div className='my-5'>
                    <Label>Video <span className='font-bold text-red-500'>*</span></Label>
                    <Input
                        type="file"
                        accept='video/*'
                        onChange={fileChangeHandler}
                        placeholder="Ex. Introduction to MongoD"
                        className='w-fit'
                    />
                </div>
                <div className='flex items-center space-x-2 my-5'>
                    <Switch checked={isPreviewFree} onCheckedChange={setIsPreviewFree} id="isPreviewFree" />
                    <Label htmlFor="isPreviewFree">Is Video Free</Label>
                </div>
                {
                    mediaProgress && (
                        <div className='my-4'>
                            <Progress value={uploadProgress} />
                            <p>{uploadProgress}% uploaded</p>
                        </div>
                    )
                }
                <div className='mt-4'>
                    <Button disabled={isLoading} onClick={editLectureHandler}>
                        {
                            isLoading ?
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                                Please Wait
                            </>
                            : "Update Lecture"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab