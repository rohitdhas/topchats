import { setProfileData } from '../redux/profile'

export function login(e, username, password, err) {
    e.preventDefault();
    const usernameValue = username.current.value;
    const passValue = password.current.value;

    fetch("/api/login", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernameValue,
            password: passValue
        }),
    })
        .then((res) => res.json())
        .then(({ success, message }) => {
            if (success) {
                window.location = '/';
            } else {
                err.current.classList.add('active')
                username.current.classList.add('err')
                password.current.classList.add('err')
            }
        })
        .catch((err) => console.log(err));
}

export function register(e, username, password, retypedPassword, err) {
    e.preventDefault();

    const usernameInput = username.current.value;
    const passwordInput = password.current.value;
    const retypedPassInput = retypedPassword.current.value;

    if (passwordInput !== retypedPassInput) {
        err.current.innerText = "Passwords Don't Match!";
        err.current.classList.add('active');

        password.current.classList.add('err')
        retypedPassword.current.classList.add('err')
        return;
    }

    fetch("/api/register", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput,
        }),
    })
        .then((res) => res.json())
        .then(({ success, message }) => {
            if (success) {
                window.location = '/login';
            } else {
                username.current.classList.add('err')
                err.current.innerText = message;
                err.current.classList.add('active');
            }
        })
        .catch(err => console.log(err))
}

export function isAuthenticated() {
    fetch("/api/login", {
        credentials: "include",
    })
        .then((res) => res.json())
        .then(({ success }) => {
            if (success) window.location = "/";
        });
}

export function getAndSetUserData(dispatcher) {
    fetch('/api/user', {
        credentials: 'include'
    })
        .then(res => res.json())
        .then(({ data }) => {
            if (data) {
                dispatcher(setProfileData(data))
            }
        })
}

export function logout() {
    fetch('/api/logout', {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(({ success }) => {
            if (success) {
                window.location = '/';
            }
        })
}

