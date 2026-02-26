// const API =process.env.VUE_APP_API;
// export const loginRequest = (user) => {
//     return new Promise((resolve, reject) => {
//         fetch(`${API}/login`,{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//             },
//             body: JSON.stringify(user),
//         })
//             .then((response) => response.json())
//             .then((result) => resolve(result.data.user_token))
//             .catch((error) => {
//
//             });
//     });
// };
const API = process.env.VUE_APP_API;

export const loginRequest = (credentials) => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(credentials), // теперь credentials = { email, password }
    })
        .then(async response => {
            if (!response.ok) {
                // Пытаемся получить тело ошибки
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        })
        .then(result => {
            // Успешный ответ: { data: { user_token: "..." } }
            const token = result.data.user_token;
            return { token, user: { email: credentials.email } }; // можно сохранить email
        });
};
export const signupRequest = (userData) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(userData),
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        })
        .then(result => {
            // При успешной регистрации возвращается токен
            const token = result.data.user_token;
            return { token, user: { email: userData.email, fio: userData.fio } };
        });
};