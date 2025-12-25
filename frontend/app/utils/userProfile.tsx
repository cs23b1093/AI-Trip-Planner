import { useState, useEffect } from "react";

interface User {
    username: string,
    email: string,
    plan: string,
    profile_pic: string,

    loading(): Promise<boolean>
};

const [user, setUser] = useState<User>({
    username: "",
    email: "",
    plan: "",
    profile_pic: ""
})
const loading
