import { guidGenerator } from "./utilityFuncs";
import { addToRoom } from "../helpers/roomHandler";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

export function useSocket() {
    const [socket, setSocket] = useState();
    const [roomData, setRoomData] = useState({});


    useEffect(() => {
        let socketConnection = io("http://localhost:4000");
        socketConnection.on("connect", () => {
            setSocket(socketConnection);
        });

        socketConnection.on("recieve_message", (messageData) => {
            displayMessage(messageData, "recieved");
        });

        socketConnection.on("room_data", (roomData) => {
            setRoomData(roomData);
            addToRoom(roomData.name, roomData.admin);
        });

        socketConnection.on("Bot", (msgData) => {
            displayMessage(
                { message: msgData.message, sender: { username: "Bot" } },
                "bot"
            );
        });
    }, []);

    return { socket, roomData }
}

export function sendMessage(e, messageData, socket) {
    e.preventDefault();
    const { messageInput, sender, roomId } = messageData;
    const message = messageInput.current.value;
    const refID = guidGenerator();

    if (!message) return;
    else {
        // Pretty Date
        let time = new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
        displayMessage({ message, time, refID }, 'sent');
        socket.emit("message", { message, sender, time, refID, roomId });
        messageInput.current.value = "";
    }
}

export function displayMessage(messageData, senderClass) {

    const { sender, time, message, refID } = messageData;
    const msg_box = document.getElementById("messages");

    let card = document.createElement("div");
    card.classList.add(senderClass, 'msg_card');

    switch (senderClass) {
        case 'sent':
            let msg_text = document.createElement("div");
            let msg_time = document.createElement('div');
            let delete_btn = document.createElement('span');

            // Message Text
            msg_text.className = 'msg_text'
            msg_text.innerText = message;
            msg_text.onclick = () => toggleDeleteButton(refID);
            card.appendChild(msg_text);

            // Message Time
            msg_time.className = "time";
            msg_time.innerText = time;
            card.appendChild(msg_time);

            // Delete Button
            delete_btn.innerHTML = `<i class="far fa-trash-alt"></i> Delete`

            delete_btn.className = "delete_icon";
            delete_btn.onclick = () => deleteMessage(refID);
            card.appendChild(delete_btn);

            card.dataset.id = `msg_card-${refID}`;
            break;

        case 'recieved':
            card.innerHTML = `
            <div class="msg_text">
            <span class="sent_by">${sender.username}</span> 
            - ${message}
            </div>
            <div class="time">${time}</div>
            `
            break;

        default:
            card.innerHTML = `
            <div class="msg_text">
            <span class="sent_by">${sender.username}</span> - ${message}
            </div>
            `
            break;
    }

    if (msg_box) {
        msg_box.appendChild(card);
    }
    scrollToBottom();
}

export function leaveRoom(roomID, username, socket) {
    socket.emit('leave-room', roomID, username);
    window.location = '/';
}

export function scrollToBottom() {
    const msg_container = document.getElementById("msg_container");
    if (msg_container) {
        msg_container.scrollTo({ left: 0, top: msg_container.scrollHeight, behavior: "smooth" })
    }
}

export function deleteMessage(messageId) {
    let msg_box = document.getElementById("messages");
    let msg_card = document.querySelector(`[data-id="msg_card-${messageId}"]`);

    // Remove from DOM
    if (msg_card) {
        msg_box.removeChild(msg_card);
    }

    // Remove from Database

    fetch(`http://localhost:4000/message?id=${messageId}`, {
        method: "DELETE"
    }).then((res) => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err.message))

}

function toggleDeleteButton(messageId) {
    let card = document.querySelector(`[data-id="msg_card-${messageId}"] > .delete_icon`);
    if (card) {
        card.classList.toggle('active');
    }
}