import { useState, useEffect } from "react"
import { getAllProjects } from "../firebase/projects"

import ProjectsDisplay from "./ProjectsDisplay"
import ProjectsForm from "./projectsForm"

const ProjectsPage = () => {
    const [projects, setProjects] = useState([])
    const [notify, setNotify] = useState(null)
    
    // get projects from database
    useEffect(() => {
        const fun = async () => {
            const result = await getAllProjects()
            setProjects(result)
            console.log(result)
        }
        fun()
    },[])

    const tempMessage = (msg) => {
        setNotify(msg)
        setTimeout(() => {
            setNotify(null)
        }, 5000)
    }
    
    return (
        <div>
            <ProjectsForm projects={projects} setProjects={setProjects} tempMessage={tempMessage}/>
            {notify && <p className="bg-green-200 rounded text-black text-xl p-2 mx-3 text-left">{notify}</p>}
            <button onClick={() => tempMessage('Successfully saved to the database')}>temp message test</button>
            <p className="text-4xl my-4">All Projects</p>
            <ProjectsDisplay projects={projects}/>
        </div>
    )
}

export default ProjectsPage