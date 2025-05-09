const ProjectsDisplay = ({ projects }) => {
    return (
        <div className="grid grid-cols-4 gap-4 m-2">
            {
            projects.map(p => 
                <div 
                    className="border border-black rounded p-4"
                    key={p.id}>
                    <p>Title: {p.title}</p>
                    <p>By: {p.by}</p>
                    <p>Description: {p.description}</p>
                    <p>Tags: {p.tags.join(', ')}</p>
                </div>)
            }
        </div>
    )
}

export default ProjectsDisplay