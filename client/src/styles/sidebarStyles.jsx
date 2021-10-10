import styled from "styled-components";

export const Bar = styled.div`
  width: 250px;
  position: fixed;
  left: 30px;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: white;

  &::-webkit-scrollbar {
    width: 5px;
    margin-left: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .site_logo {
    a {
      text-decoration: none;
      color: #3a86ff;
    }
    margin-top: 20px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;

    svg {
      margin-right: 10px;
    }

    &:hover {
      a {
        color: #266ee2;
      }
    }
  }

  .sidebar_user_section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;
    padding: 20px 10px;
    font-size: 1.4rem;
    font-weight: bold;
    border-radius: 5px;
    border: 1px solid #dce1eb;
    background-color: #cee1fff8;

    button {
      border-radius: 5px;
      border: none;
      width: 100%;
      padding: 7px;
      font-weight: bold;
      margin-top: 10px;
      cursor: pointer;
      background-color: #3a86ff;
      color: white;

      &:hover {
        background-color: #266ee2;
      }
    }
  }

  a {
    text-decoration: none;
    color: #22324b;
  }

  .room_list {
    margin: 30px 0 0;
    color: #22324b;
    padding: 10px 0;

    h4 {
      border-top: 2px solid #dce1eb;
      padding-top: 15px;
    }

    .room_card {
      padding: 10px;
      margin: 10px 0;
      font-weight: bold;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      cursor: pointer;

      .icon {
        background-color: #699ff7;
        padding: 5px;
        border-radius: 50%;
        font-size: 1.5rem;
        color: white;

        &.plus {
          padding: 5px 9px;
        }
      }

      .room_title {
        flex-grow: 1;
        margin-left: 15px;
        display: flex;
        font-size: 0.8rem;
        justify-content: flex-start;
      }

      .unseen_message_count {
        font-weight: bold;
        border-radius: 50%;
        padding: 3px;
        background-color: tomato;
        color: white;
        font-size: 0.5rem;
        text-align: center;
      }

      &.active {
        background-color: #bdd6fff8;
      }

      &:hover {
        background-color: #bdd6fff8;
      }
    }
  }

  @media (max-width: 1000px) {
    width: 100%;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    transform: translateX(-1000px);
    transition: all 0.4s;
  }

  &.active {
    transform: translateX(0px);
  }
`;

export const SliderBox = styled.div`
  display: flex;
  align-items: center;

  .label_text {
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0 5px;
    color: #253558;
  }

  /* The switch - the box around the slider */
  .switch {
    margin: 10px 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 4px;
    bottom: 3.5px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
