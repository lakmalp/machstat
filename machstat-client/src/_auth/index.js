const auth = {
    createUserWithUsernameAndPassword: async (email, password) => {
        return ({data: {username: 'lakmal', email: 'lakmalp@gmail.com'}});
    },
    loginUserWithUsernameAndPassword: async (email, password) => {},
    onAuthStateChanged: (user) => {}
}

export default auth;