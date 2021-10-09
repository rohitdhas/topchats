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