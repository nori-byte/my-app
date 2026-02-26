const API = process.env.VUE_APP_API;

export const loginRequest = (credentials) => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(credentials),
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        })
        .then(result => {
            const token = result.data.user_token;
            return { token, user: { email: credentials.email } };
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
            const token = result.data.user_token;
            return { token, user: { email: userData.email, fio: userData.fio } };
        });
};

// export const getOrders = () => {
//     return fetch(`${API}/order`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(async response => {
//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({}));
//                 throw { status: response.status, data: errorData };
//             }
//             return response.json();
//         })
//         .then(result => result.data);
// };

export async function getOrders(){
    const response = await fetch(`${API}/order`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if(!response.ok){
        const errorData = await response.json().catch(() => ({}));
        throw { status: response.status, data: errorData };
    }
    return response.json();

}
export const createOrder = () => {
    return fetch(`${API}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myAppToken')}`
        },
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        });
};
// Добавить товар в корзину на сервере
export const addToCartServer = (productId) => {
    return fetch(`${API}/cart/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myAppToken')}`
        }
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        });
};
export const fetchCart = () => {
    return fetch(`${API}/cart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('myAppToken')}`
        }
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        })
        .then(result => result.data);
};

export const removeFromCartServer = (cartItemId) => {
    return fetch(`${API}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('myAppToken')}`
        }
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        });
};
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw { status: response.status, data: errorData };
            }
            return response.json();
        })
        .then(result => result.data);
};
