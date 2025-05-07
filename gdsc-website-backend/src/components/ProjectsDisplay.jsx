import { useEffect, useState } from 'react'
import { getAllProjects } from '../firebase/projects'

const ProjectsDisplay = () => {
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
        <div className="grid grid-cols-4 gap-4">
            {
            projects.map(p => 
                <div 
                    className="border border-black rounded p-4"
                    key={p.id}>
                    <p>Title: {p.title}</p>
                    <p>By: {p.by}</p>
                    <p>Description: {p.description}</p>
                    <p>Tags: {p.tags}</p>
                </div>)
            }
        </div>
    )
}

export default ProjectsDisplay