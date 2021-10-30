import { useState } from 'react';

export const createRoom = (e, roomName, userId, errorBox) => {
    e.preventDefault();
    if (!roomName) return
    else {
        fetch('/api/room', {
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

        fetch(`api/room?id=${roomId}`, {
            credentials: 'include'
        }).then(res => res.json())
            .then(({ data }) => {
                if (data) {
                    setRoomData(data)
                    setIsLoading(false)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return { fetchData, roomData, isLoading }
}

export function deleteRoom(roomId) {
    fetch(`/api/room?id=${roomId}`, {
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
    fetch(`/api/room?roomName=${roomName}&admin=${adminId}`, {
        credentials: 'include',
        method: 'PATCH'
    }).catch(err => console.log(err))
}

export async function blockUser(roomId, userId, fetchData) {
    await fetch(`api/room/block?userId=${userId}&roomId=${roomId}`, {
        credentials: 'include',
        method: 'PATCH'
    }).catch(err => console.log(err))
    fetchData(roomId)
}

export async function unblockUser(roomId, userId, fetchData) {
    await fetch(`api/room/unblock?userId=${userId}&roomId=${roomId}`, {
        credentials: 'include',
        method: 'PATCH'
    }).catch(err => console.log(err))
    fetchData(roomId)
}