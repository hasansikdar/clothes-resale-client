import { useEffect, useState } from "react"

const IsAdmin = email => {
    const [role, setRole] = useState('');
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        fetch(`https://resale-clothes.vercel.app/users/admin/${email}`)
        .then(res => res.json())
        .then(data => {
            setRole(data);
            setIsAdminLoading(false);
        })

    },[email]) 
    return [role, isAdminLoading];
}

export default IsAdmin;