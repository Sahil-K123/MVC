// on every restarting on the server the new empty map was created so thats why the login has to do again again.

// const sessionIdtoUserMap = new Map(); now no need for state.

const jwt = require('jsonwebtoken')
const secret = "Sahil#12#"

function setUser(user){
    // sessionIdtoUserMap.set(id, user)
    // const payload = {
    //     ...user,
    // };
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
}

function getUser(token){
    // return sessionIdtoUserMap.get(id)
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}