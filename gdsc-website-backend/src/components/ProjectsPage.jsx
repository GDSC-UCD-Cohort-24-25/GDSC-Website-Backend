import { useState, useEffect } from "react"
import { getAllProjects } from "../firebase/projects"

import ProjectsDisplay from "./ProjectsDisplay"
import ProjectsForm from "./projectsForm"

const ProjectsPage = () => {
    const [projects, setProjects] = useState([])
    const [notify, setNotify] = useState(null)
    const [showForm, setShowForm] = useState(false)
    
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

    const toggleForm = () => {
        setShowForm(!showForm)
    }
    
    return (
        <div>
            <p className="text-4xl my-4">All Projects</p>
            {
                showForm
                ? <ProjectsForm projects={projects} setProjects={setProjects} tempMessage={tempMessage} toggleForm={toggleForm}/>
                : <button className="block bg-blue-600 text-white font-medium py-2 px-3 m-2 rounded-lg hover:bg-blue-700 transition" onClick={() => toggleForm()}>Add New Project</button>
            }

            {notify && <p className="block bg-green-200 rounded text-black text-xl p-2 mx-3 text-left">{notify}</p>}
            {/* <button onClick={() => tempMessage('Successfully saved to the database')}>temp message test</button> */}
            <ProjectsDisplay projects={projects}/>
        </div>
    )
}

export default ProjectsPage