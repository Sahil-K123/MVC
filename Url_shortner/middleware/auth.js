const { getUser } = require("../service/auth");


// soft check
function checkForAuthentication(req, res, next) {
  // core logic
    const tokenCookie = req.cookies?.token
  // const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;


  if (!tokenCookie) return next();
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
    // return next();

  // const token = authorizationHeaderValue.split("Bearer ")[1];
  const token = tokenCookie
  const user = getUser(token);

  req.user = user;
  next();
}

// used for restricting
function restrictTo(roles = []) {
  return function(req,res, next) {
    if(!req.user) return res.redirect('/login')

    if(!roles.includes(req.user.role)) return res.end('UnAuthorized')

    next();
  }
}

// async function restricToLoggedinUserOnly(req, res, next) {
//     // console.log(req.cookies.uid)
//   // console.log(req.headers)
//   const userUid = req.headers["authorization"]
//   // Bearer jf
//   if (!userUid) return res.redirect("/login");

//   const token = userUid.split("Bearer ")[1];  // "Bearer [23rfdfgrg3ff]"

//   const user = getUser(token)

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//     // const userUid = req.cookies?.uid;
//     // console.log(req.headers)

//     const userUid = req.headers["authorization"]
//     const token = userUid.split("Bearer ")[1];  // "Bearer [23rfdfgrg3ff]"

//     const user = getUser(token)
//     req.user = user
//     next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo
};
