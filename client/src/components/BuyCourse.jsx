import React from 'react'
import { Button } from './ui/button'
import { useEnrollInCourseMutation } from '@/features/api/authApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const BuyCourse = () => {
  const { courseId } = useParams();
  const [enrollInCourse, { isLoading }] = useEnrollInCourseMutation();

  const handleEnrollment = async () => {
    try {
      await enrollInCourse(courseId).unwrap();
      toast.success('Successfully enrolled in course!');
      // Optionally refresh the page or update UI
      window.location.reload();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to enroll in course');
    }
  };

  return (
    <Button 
      className='w-full' 
      onClick={handleEnrollment}
      disabled={isLoading}
    >
      {isLoading ? 'Enrolling...' : 'Enroll in Course'}
    </Button>
  )
}

export default BuyCourse