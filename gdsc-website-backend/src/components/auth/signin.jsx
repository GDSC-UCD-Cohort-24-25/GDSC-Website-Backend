import { useState } from "react";
import styles from './styles.module.css';
import { signinUser } from "../../firebase/auth.js"

export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Form submitted');
        // Handle form submission logic here
        setError(signinUser(email, password))
    };

    return (
        <div className={styles.signinPage}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <text>Signin Page</text>
                <input 
                    placeholder="your-email@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="text"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    Signin
                </button>
                {error && <text className={styles.error}>{error}</text>}
            </form>

        </div>
    )
}