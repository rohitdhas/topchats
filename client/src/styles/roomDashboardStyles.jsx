import styled from "styled-components";

export const Dashboard = styled.div`
  margin: 10px 0 10px 330px;
  background-color: #cee1fff8;
  width: 70%;
  height: 97vh;
  border-radius: 5px;
  padding: 20px;

  .dashboard_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #5280c9f8;
    padding: 10px 0;

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      .title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-left: 10px;
      }

      .back_btn {
        svg {
          font-size: 2rem;

          &:hover {
            color: #3264b6f8;
            cursor: pointer;
          }
        }
      }
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      color: white;
      background-color: tomato;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: #e04327;
      }
    }
  }

  .users_list {
    list-style: none;

    span {
      display: inline-block;
      margin: 10px 0;
      font-weight: bold;
      font-size: 1.2rem;
    }

    li {
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #769ad4f8;

      button {
        padding: 10px;
        border-radius: 5px;
        border: none;
        font-weight: bold;
        color: white;
        background-color: tomato;

        &:hover {
          background-color: #be3d26;
        }
      }

      svg {
        margin-right: 10px;
      }
    }
  }

  @media (max-width: 1000px) {
    margin: 10px auto;
    width: 95%;
    height: 100vh;

    .dashboard_nav {
      div > .title,
      button {
        font-size: 0.8rem;
      }

      div {
        width: 50%;
        justify-content: space-between;
      }

      button {
        padding: 8px;
      }
    }
  }
`;
