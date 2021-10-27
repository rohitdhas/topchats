import { useState, useEffect } from 'react';

export function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}


export const GetUserRooms = () => {
    const [userRooms, setUserRooms] = useState([]);

    useEffect(() => {
        fetch('/api/room/user-data', {
            credentials: 'include'
        }).then((res) => res.json())
            .then(({ data, message }) => {
                if (data !== null) {
                    setUserRooms(data)
                } else {
                    console.log(message)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return { userRooms }
}