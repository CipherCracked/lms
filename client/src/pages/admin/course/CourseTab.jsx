import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CourseTab = () => {
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
    const navigate=useNavigate();
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }
    const selectCategory=(value)=>{
        setInput({...input, category:value});
    }
    const selectLevel=(value)=>{
        setInput({...input, courseLevel:value});
    }
    const selectThumbnail=(e)=>{
        const file=e.target.files?.[0];
        if (file){
            setInput({...input, courseThumbnail:file})
            
        }
    }
    const isPublished = false;
    const isLoading=true;
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you are done.
                    </CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button variant="outline">
                        {isPublished ?
                            "Unpublish" :
                            "Publish"}
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='space-y-4 mt-5'>
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            type="text"
                            name="courseTitle"
                            placeholder="Ex. Full Stack Development Course"
                        />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            type="text"
                            name="subTitle"
                            placeholder="Ex. Become a Full-Stack developer from zero to hero in 2 months."
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor
                            input={input}
                            setInput={setInput}
                        />
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">
                                            Frontend Development
                                        </SelectItem>
                                        <SelectItem value="Fullstack Development">
                                            Fullstack Development
                                        </SelectItem>
                                        <SelectItem value="MERN Stack Development">
                                            MERN Stack Development
                                        </SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={selectLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price in (INR)</Label>
                            <Input
                            type="number"
                            name="coursePrice"
                            value={input.coursePrice}
                            onChange={changeEventHandler}
                            placeholder="199"
                            className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                        type="file"
                        accept="image/*"
                        className="w-fit"
                        />
                    </div>
                    <div>
                        <Button variant="outline" onClick={()=>navigate("../course")}>Cancel</Button>
                        <Button disabled={isLoading}>
                            {
                                isLoading?
                                <>
                                <Loader2 className='mr-2 animate-spin h-4 w-4'/>
                                Please Wait
                                </>
                                :
                                "Save"
                            }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab