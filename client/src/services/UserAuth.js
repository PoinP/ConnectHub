import { fetchData } from "./FetchData";

export function clientLogin(username, password, onSuccess, onError) {
    fetchData("login", "POST", { username, password })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(({ _, token }) => {
        const twoWeeks = 14 * 24 * 60 * 60;
        // Should be replaced with httpOnly cookie
        document.cookie = `token=${JSON.stringify(token)}; true; max-age=${twoWeeks};`;
        onSuccess(true);
      })
      .catch((err) => onError(err.message));
}

export function clientRegister(username, email, password, onSuccess, onError) {
    fetchData("register", "POST", { email, username, password })
        .then(async (res) => {
          if (!res.ok) throw new Error(await res.text());
          return res;
        })
        .then(() => {
          clientLogin(username, password, onSuccess, onError);
        })
        .catch((err) => onError(err.message));
}