import { useState } from "react";
import { addOneProject }from "../firebase/projects";

const ProjectsForm = () => {
    const [title, setTitle] = useState('')
    const [by, setBy] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')


    const submit = () => {
        addOneProject({ title, description, by, tags })

    }

    return (
        <div class="max-w-md mx-auto bg-white border border-gray-300 shadow-sm rounded-xl p-6 space-y-4">
        <h2 class="text-xl font-semibold text-gray-800">New Project</h2>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="title">Title</label>
            <input type="text" id="title" name="title" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="by">By</label>
            <input type="text" id="by" name="by" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="description">Description</label>
            <textarea id="description" name="description" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1" for="tags">Tags <span class="text-gray-400">(comma-separated)</span></label>
            <input type="text" id="tags" name="tags" placeholder="e.g. AI, robotics, ML" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
            Submit
        </button>
        </div>
    );
};

export default ProjectsForm;