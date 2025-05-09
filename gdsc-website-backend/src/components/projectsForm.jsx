import { useState } from "react";
import { addOneProject }from "../firebase/projects";

const ProjectsForm = ({ projects, setProjects, tempMessage }) => {
    const [title, setTitle] = useState('')
    const [by, setBy] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])

    const [error, setError] = useState(null)


    const submit = async (e) => {
        e.preventDefault()
        if (title === '' || by === '' || description === '' ) {
            setError('Please fill in all the fields.')
            return 
        }

        console.log('Add project', { title, description, by, tags })
        const project = await addOneProject({ title, description, by, tags })
        console.log(project)
        setProjects(projects.concat(project))

        tempMessage('Successfully saved ' + project.title + ' to the database.')
        setError(null)
        setTitle('')
        setBy('')
        setDescription('')
        setTags([])
    }

    const addTag = () => {
        const newTag = tag
        setTags(tags.concat(newTag))
        setTag('')
    }

    const clearTags = () => {
        setTags([])
    }

    return (
        <div class="max-w-md mx-auto bg-white border border-gray-300 shadow-sm rounded-xl p-6 space-y-4">
            <form onSubmit={submit}>
                <h2 class="text-xl font-semibold text-gray-800">New Project</h2>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="title">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>

                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="by">By</label>
                    <input 
                        type="text" 
                        id="by" 
                        name="by" 
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value={by}
                        onChange={(e) => setBy(e.target.value)}/>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="description">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows="4" 
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="tags">Tags <span class="text-gray-400">(comma-separated)</span></label>
                    <div className="flex flex-row">
                        <input 
                            type="text" 
                            id="tags" 
                            name="tags" 
                            placeholder="e.g. AI, Web Dev, ML" 
                            class="w-full border border-gray-300 rounded-lg mb-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}/>
                            <button 
                                className="h-full bg-blue-600 px-2 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                type="button"
                                onClick={addTag}
                            >
                                Add
                            </button>
                            <button 
                                className="h-full bg-blue-600 px-2 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                type="button"
                                onClick={clearTags}
                            >
                                Clear
                            </button>
                    </div>
                </div>

                {/* tags display */}
                <div className="flex flex-row flex-wrap gap-x-2 w-full mb-2">
                Tags:
                {   
                    tags.map(t => <div>{t}</div>)
                }
                </div>

                {/* submit button */}
                <button type="submit" class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
                    Submit
                </button>
                {error && <div className="text-red-500">{error}</div>}
            </form>
        </div>
    );
};

export default ProjectsForm;
