import { useState } from "react";

export const createRoom = (e, roomName, userId, errorBox) => {
    e.preventDefault();
    if (!roomName) return
    else {
        fetch('http://localhost:4000/room', {
            credentials: 'include',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: roomName,
                admin: userId
            })
        }).then(res => res.json())
            .then(({ success, data, message }) => {
                if (success) {
                    window.location = `/room/${data.id}`
                } else {
                    errorBox.current.innerText = message;
                    errorBox.current.classList.add('active');
                }
            }).catch(err => console.log(err))
    }
}

export function useRoomData() {
    const [roomData, setRoomData] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    function fetchData(roomId) {
        setIsLoading(true)

        fetch(`http://localhost:4000/room?id=${roomId}`, {
            credentials: 'include'
        }).then(res => res.json())
            .then(({ data, message }) => {
                if (data) {
                    setRoomData(data)
                    setIsLoading(false)
                } else {
                    console.log(message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return { fetchData, roomData, isLoading }
}

export function deleteRoom(roomId) {
    fetch(`http://localhost:4000/room?id=${roomId}`, {
        credentials: 'include',
        method: "DELETE"
    }).then(res => res.json())
        .then(({ success, message }) => {
            if (success) {
                window.location = '/'
            } else {
                console.log(message)
            }
        })
}

export function addToRoom(roomName, adminId) {
    fetch(`http://localhost:4000/room?roomName=${roomName}&admin=${adminId}`, {
        credentials: 'include',
        method: 'PATCH'
    }).catch(err => console.log(err))
}

export async function blockUser(roomId, userId, fetchData) {
    await fetch(`http://localhost:4000/room/block?userId=${userId}&roomId=${roomId}`, {
        credentials: 'include',
        method: 'PATCH'
    }).catch(err => console.log(err))
    fetchData(roomId)
}

export async function unblockUser(roomId, userId, fetchData) {
    await fetch(`http://localhost:4000/room/unblock?userId=${userId}&roomId=${roomId}`, {
        credentials: 'include',
        method: 'PATCH'
    }).catch(err => console.log(err))
    fetchData(roomId)
}