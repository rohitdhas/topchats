import styled from "styled-components";

export const LoginForm = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    margin: 20px 0;
    color: #253042;
  }

  form {
    max-width: 380px;
    border-radius: 7px;
    padding: 20px 30px;
    border: 1px solid #b6ccee;

    .sidebar_bar {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 2rem;
      color: #1158ca;
      display: none;
    }

    .err_msg {
      font-weight: 600;
      display: none;
      margin: 10px 0;
      font-size: 0.9rem;
      padding: 10px;
      border-radius: 5px;
      color: white;
      background-color: #ff6347d3;
      text-align: center;

      &.active {
        display: block;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin: 15px 0;

      label {
        font-size: 0.9rem;
        font-weight: bold;
        margin: 8px 0;
        color: #1a222e;
      }

      input {
        width: 100%;
        border: 1px solid gray;
        border-radius: 5px;
        padding: 7px;
        font-size: 1.1rem;
        outline: none;
        &:focus {
          border: 2px solid #6ba2fa;
          box-shadow: 5px 10px 10px -15px black;
        }
        &.err {
          border: 3px solid #ff6161;
          box-shadow: 5px 10px 10px -15px black;
        }
      }
    }
    button {
      border-radius: 5px;
      border: none;
      width: 100%;
      padding: 10px;
      font-weight: bold;
      margin: 15px 0;
      cursor: pointer;
      background-color: #3a86ff;
      color: white;

      &:hover {
        background-color: #266ee2;
      }
    }
    p {
      font-weight: 600;
      text-align: center;
      a {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    form > .sidebar_bar {
      display: block;
    }
  }
`;
