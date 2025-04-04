import { Course } from "../models/courseModel.js";
import { Lecture } from "../models/lectureModel.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async(req, res)=>{
    try {
        const {courseTitle, category}=req.body;
        if (!courseTitle||!category){
            return res.status(400).json({
                message:"Course Title and Category are required."
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id,
        });
        return res.status(201).json({
            course,
            message:"Course created.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create course",
        })
    }
}

export const getCreatorCourses = async (req, res)=>{
    try {
        const userId=req.id;
        const courses=await Course.find({creator:userId});
        if (!courses) res.status(404).json({
            course:[],
            message: "Course not found",
        });
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to fetch Courses",
        })
    }
}

export const editCourse = async(req,res)=>{
    try {
        const courseId=req.params.courseId;
        const {courseTilte, subTitle, description, category, courseLevel, coursePrice} = req.body;
        const thumbnail=req.file;
        let course = await Course.findById(courseId);
        if (!course){
            return res.status(404).json({
                message: "Course not found",
            })
        }
        let courseThumbnail;
        if (thumbnail){
            if (course.courseThumbnail){
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId);
            }
            courseThumbnail=await uploadMedia(thumbnail.path);
        }

        const updateData = {courseTilte, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url};
        course = await Course.findByIdAndUpdate(courseId, updateData, {new:true});
        return res.status(200).json({
            course,
            message: "Course Updated Successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to edit course",
        })
    }
}

export const getCourseById = async(req, res)=>{
    try {
        const {courseId} = req.params;
        const course =  await Course.findById(courseId);
        if (!course){
            return res.status(404).json({
                message:"Course not found",
            })
        }
        return res.status(200).json({
            course
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to fetch course by id",
        })
    }
}

export const createLecture = async(req, res)=>{
    try {
        const {lectureTitle}=req.body;
        const {courseId}=req.params;
        if (!lectureTitle||!courseId){
            return res.status(400).json({
                message:"Lecture Title is required",
            })
        }
        const lecture = await Lecture.create({lectureTitle});
        const course = await  Course.findById(courseId);
        if (course){
            course.lectures.push(lecture._id);
            await course.save();
        }
        return res.status(201).json({
            lecture,
            message:"Lecture Created Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to create lecture",
        })
    }
}

export const getLecture = async(req, res)=>{
    try {
        const {courseId}=req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course){
            res.status(404).json({
                message:"Course not Found",
            })
        }
        return res.status(200).json({
            lectures: course.lectures,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get lectures",
        })
    }
}

export const editLecture = async(req, res)=>{
    try {
        const {Lecturetitle,videoInfo,isPreviewFree}=req.body;

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to edit lecture",
        })
    }
}