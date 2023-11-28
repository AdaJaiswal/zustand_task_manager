import React, { useState } from 'react'
import useCourseStore from '../app/courseStore'

const CourseForm = () => {
    const addCourse = useCourseStore((state) => state.addCourse)
    const [courseTitle, setCourseTitle] = useState("")
    const handleCourseSubmit = () => {
        console.log(courseTitle)
        if (!courseTitle) return
        addCourse({
            id: Math.ceil(Math.random() * 1000000),
            title: courseTitle,
            completed: false
        })
        setCourseTitle("")
    }
    return (
        <div className="form-container">
            <input
                value={courseTitle}
                onChange={(e) => { setCourseTitle(e.target.value) }}
                type="text" className="form-input" />
            <button onClick={() => {
                handleCourseSubmit()
            }} className="form-submit-btn">
                Add Course
            </button>
        </div>
    )
}

export default CourseForm