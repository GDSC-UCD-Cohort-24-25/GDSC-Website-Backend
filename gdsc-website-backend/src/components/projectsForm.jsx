import { useState } from "react";
import { addOne }from "../firebase/projects";

const ProjectsForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const submit = () => {
        addOne({ name, description })

        setName('')
        setDescription('')
    }

    return (
        <div style={{ margin: "3rem" }}>
            <h2>add project</h2>
            <form onSubmit={submit}>
                <div>
                    project name
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    project description
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}  />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    );
};

export default ProjectsForm;