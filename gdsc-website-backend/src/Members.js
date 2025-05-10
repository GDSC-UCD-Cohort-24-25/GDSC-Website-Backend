import React, { useState, useEffect, useRef } from "react";
import { addMember, getAllMembers } from "./firebase/members";


// Members form component
export const Members = () => {

    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [photo, setPhoto] = useState(null)
    const [refresh, setRefresh] = useState(0);
    const fileInputRef = useRef(null);

    // Add member function
    const addNewMember = (e) => {
        e.preventDefault();
        addMember(name, team, photo);
        console.log("Initial P", photo)
        setName("");
        setTeam("");
        setPhoto(null);
        setRefresh(refresh + 1)
        if (fileInputRef.current){
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            <form
                onSubmit={addNewMember}
                style={{ border: "2px solid white", padding: "8px", margin: "8px" }}
            >
                <p>Name:</p>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p>Team:</p>
                <input
                    type="text"
                    placeholder="Team"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                />
                <p>Member Photo:</p>
                <input
                    className="input-box"
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setPhoto(e.target.files[0])}
                    accept="image/*,application/pdf"
                    required
                />
                <br></br>
                <button type="submit">Add Member</button>
            </form>
            <MemberTable refresh={refresh} />
        </div>
    );
};

// const members = [
//     { name: "Alex Kim", team: "Web Development" },
//     { name: "Samantha Chen", team: "AI/ML" },
//     { name: "Jordan Lee", team: "Mobile Apps" },
//     { name: "Nina Garcia", team: "Design" },
//     { name: "David Patel", team: "Outreach" },
// ];

export const MemberTable = ({refresh}) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const fetchedMembers = await getAllMembers();
            setMembers(fetchedMembers);
        };

        fetchMembers();
    }, [refresh]);

    return (
        <table style={{ paddingTop: "100px" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid white" }}>
                        Name
                    </th>
                    <th style={{ border: "1px solid white" }}>
                        Team
                    </th>
                    <th style={{ border: "1px solid white" }}>
                        Picture
                    </th>
                </tr>
            </thead>
            <tbody>
                {members.map((member, index) => (
                    <tr key={index}>
                        <td style={{ border: "1px solid white" }}>
                            {member.name}
                        </td>
                        <td style={{ border: "1px solid white" }}>
                            {member.team}
                        </td>
                        <td style={{ border: "1px solid white" }}>
                            <img
                                src={`${member.picture}`}
                                alt={`${member.name}'s photo`}
                                style={{
                                    width: "200px",
                                    height: "150px",
                                    objectFit: "cover",
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
