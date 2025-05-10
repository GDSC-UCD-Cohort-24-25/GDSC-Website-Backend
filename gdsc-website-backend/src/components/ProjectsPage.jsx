import { useState, useEffect } from "react"
import { getAllProjects } from "../firebase/projects"

import ProjectsDisplay from "./ProjectsDisplay"
import ProjectsForm from "./projectsForm"
import { Field, Label, Select } from "@headlessui/react"

const ProjectsPage = () => {
    const [projects, setProjects] = useState([])
    const [notify, setNotify] = useState(null)
    const [showForm, setShowForm] = useState(false)
    
    // get projects from database
    useEffect(() => {
        const fun = async () => {
            const result = await getAllProjects()
            setProjects([...result].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })))
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

    const sortBy = (sort) => {
        switch (sort) {
            case "A-Z":
                setProjects([...projects].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })))
                return 
            case "Z-A":
                setProjects([...projects].sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: 'base' })))
                return
        }
    }
    
    return (
        <div className="mx-2">
            <p className="text-4xl my-4">All Projects</p>
            <Field>
                <Label>Sort: </Label>
                <Select name="sort" className="bg-blue-200 rounded" aria-label="Project status" onChange={(e) => sortBy(e.target.value)}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </Select>
            </Field>

            <div className="flex w-screen">
                {
                    showForm
                    ? <ProjectsForm projects={projects} setProjects={setProjects} tempMessage={tempMessage} toggleForm={toggleForm}/>
                    : <button className="block bg-blue-600 text-white font-medium py-2 px-3 my-2 rounded-lg hover:bg-blue-700 transition" onClick={() => toggleForm()}>Add New Project</button>
                }

                {notify && <p className="block bg-green-200 rounded text-black text-xl p-2 mx-3 text-left">{notify}</p>}
                {/* <button onClick={() => tempMessage('Successfully saved to the database')}>temp message test</button> */}
                <ProjectsDisplay projects={projects}/>
            </div>
        </div>
    )
}

export default ProjectsPage