import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../config/axios'

const Signup = () => {
    interface Formdata {
        fullName: string,
        email: string,
        password: string,
        confirmPassword: string,
    }

    interface FormError {
        fullNameError: string,
        emailError: string,
        password: string,
        confirmPassword: string
    }

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<Formdata>({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState<FormError>({
        fullNameError: "",
        emailError: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            if (formData) {
                if (formData.password !== formData.confirmPassword) throw new Error("Please write same password in password and confirmpassword");
                setLoading(true);
                const reponse = await axiosInstance.post('/user/register', {
                    ...formData
                });
            } else throw new Error("Please provide credentials");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div>
            <h1>Signup</h1>
        </div>
    );
};

export default Signup;