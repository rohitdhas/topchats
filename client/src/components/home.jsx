import { useEffect } from "react";
import { getAndSetUserData } from "../helpers/userAuth";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userProfile);

  useEffect(() => {
    getAndSetUserData(dispatch);
  }, []);
  return (
    <div>
      {!username ? (
        <h1>
          <a href="/login">Click here</a> to Login in!
        </h1>
      ) : (
        <h1>Hello {username}!</h1>
      )}
    </div>
  );
}
