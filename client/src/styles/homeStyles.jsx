import styled from "styled-components";

export const Page = styled.div`
  margin: 30px 0 30px 300px;
  height: 90vh;
  width: 70%;
  border-radius: 5px;
  background-color: #cee1fff8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 2px solid #859bbef8;

    svg {
      font-size: 10rem;
      padding: 30px;
      border-radius: 50%;
      color: #3a86ff;
      background-color: #bed7fff8;
    }

    p {
      font-size: 1.3rem;
      font-weight: bold;
      margin: 20px 0;
    }
  }

  .cards {
    p {
      font-size: 1;
      font-weight: bold;
      margin: 20px 0;
    }
  }

  .room_card {
    padding: 10px;
    margin: 10px 0;
    font-weight: bold;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #bed7fff8;
    cursor: pointer;

    svg {
      font-size: 2rem;
      color: #5691f0;
    }

    .room_title {
      flex-grow: 1;
      margin-left: 15px;
      display: flex;
      font-size: 0.8rem;
      justify-content: flex-start;
    }

    &:hover {
      background-color: #9ac1fff8;
    }
  }
`;
