import { useState, useEffect } from 'react';

export function toggleCardItem(e) {
    let cards = document.querySelectorAll('.room_card');
    cards.forEach(card => {
        card.classList.remove('active');
    })

    e.target.classList.add('active');
}


export const GetUserRooms = () => {
    const [userRooms, setUserRooms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/room/user-data', {
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