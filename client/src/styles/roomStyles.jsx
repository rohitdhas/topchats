import styled from "styled-components";

export const MsgBox = styled.div`
  margin: 10px 0 5px 330px;
  padding: 20px;
  height: 88vh;
  overflow-y: auto;
  width: 70%;
  border-radius: 5px;
  background-color: #cee1fff8;

  #messages {
    margin-bottom: 70px;
    .msg_card {
      margin: 10px 0;
      width: fit-content;

      .time {
        margin: 8px 0;
        color: black;
        text-align: end;
        font-size: 0.5rem;
      }

      &.me {
        .msg_text {
          font-size: 0.8rem;
          background-color: #3a86ff;
          border-radius: 5px;
          padding: 10px;
        }
        margin-left: auto;
        margin-right: 0;
        color: white;
      }

      &.sender {
        .msg_text {
          font-size: 0.8rem;
          background-color: white;
          border-radius: 5px;
          padding: 10px;

          .sent_by {
            font-weight: bold;
          }
        }

        .time {
          text-align: start;
        }
      }
    }
  }

  form {
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    bottom: 25px;
    width: 66%;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    svg.fa-laugh-beam {
      font-size: 2rem;
      color: #a1a100;
      font-weight: bold;
      cursor: pointer;
      transition: 0.2s transform;

      &:hover {
        color: #caca03;
        transform: scale(1.1);
      }
    }

    input {
      width: 80%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid lightgray;
      outline: none;

      &:focus {
        border: 2px solid #67a1ff;
      }
    }

    button {
      padding: 8px 10px;
      font-weight: bold;
      cursor: pointer;
      background-color: #3a86ff;
      border: none;
      color: white;
      border-radius: 5px;

      &:hover {
        background-color: #3073df;
      }

      svg {
        margin-left: 5px;
        font-size: 1.2rem;
      }
    }
  }
`;

export const RoomNav = styled.div`
  background-color: #cee1fff8;
  margin: 10px 0 0 330px;
  padding: 7px 20px;
  width: 70%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .room_title {
    font-weight: bold;
  }

  button {
    padding: 5px 10px;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: tomato;
    font-weight: bold;

    svg {
      margin: 0 5px;
    }

    &:hover {
      background-color: #a53521;
    }
  }
`;
