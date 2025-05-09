import { useState, useEffect } from "react"
import { getAllProjects } from "../firebase/projects"

import ProjectsDisplay from "./ProjectsDisplay"
import ProjectsForm from "./projectsForm"

const ProjectsPage = () => {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        const fun = async () => {
            const result = await getAllProjects()
            setProjects(result)
            console.log(result)
        }
        fun()
    },[])

    return (
        <div>
            <ProjectsForm projects={projects} setProjects={setProjects}/>
            <p className="text-4xl my-4">All Projects</p>
            <ProjectsDisplay projects={projects}/>
        </div>
    )
}

export default ProjectsPage