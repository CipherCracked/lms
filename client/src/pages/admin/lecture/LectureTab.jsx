import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React, { useState } from 'react'

const LectureTab = () => {
    const [title, setTitle]=useState("");
    const [uploadVideoInfo, setUploadVideoInfo]=useState(null);
    const [isFree, setIsFree]=useState(false);
    const [mediaProgress, setMediaProgress]=useState(false);
    const [uploadProgress, setUploadProgress]=useState(0);
    const [btnDisable, setBtnDisable]=useState(true);

    const fileChangeHandler = async(e)=>{
        const file=e.target.files[0];
    }
  return (
    <Card>
        <CardHeader className='flex justify-between'>
            <div>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription>Make changes and click save when done</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button variant="destructive">Remove Lecture</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div>
                <Label>Title</Label>
                <Input
                type="text"
                placeholder="Ex. Introduction to MongoD"
                />
            </div>
            <div className='my-5'>
                <Label>Video <span className='font-bold text-red-500'>*</span></Label>
                <Input
                type="file"
                accept='video/*'
                placeholder="Ex. Introduction to MongoD"
                className='w-fit'
                />
            </div>
            <div className='flex items-center space-x-2 my-5'>
                <Switch id="isFree"/>
                <Label htmlFor="isFree">Is Video Free</Label>
            </div>
            <div className='mt-4'>
                <Button>Update Lecture</Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default LectureTab