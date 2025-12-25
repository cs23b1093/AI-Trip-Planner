import { ChangeEvent, useState } from "react";
import axiosInstance from "../config/axios";

const Login = () => {
    interface formData {
        username: string,
        password: string
    }

    interface formError {
        usernameError: string,
        passwordError: string
    }

    const [formData, setFormData] = useState<formData>({
        username: "",
        password: ""
    })
    const [formError, setFormError] = useState<formError>({
        usernameError: "",
        passwordError: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        try {
            if (formData) {
                setLoading(true);
            }
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};

export default Login;