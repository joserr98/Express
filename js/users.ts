// import express from "express";
// import jwt from "jsonwebtoken";
// const router = express.Router();

// interface User {id: number, name: string, password: string, email: string}
// const USER_NOT_FOUND = 'User not found'

// // let users:Array<User> = [
// //   { id: 1, name: "Jose", password: "1234", email: "jose@12.com" },
// //   { id: 2, name: "Jaime", password: "1234", email: "jaime@123.com" },
// //   { id: 3, name: "Andres", password: "1234", email: "andres@1234.com" },
// // ];
// const _SECRET = "gweVDFgragAFGATnvc";
// let counter = users.length + 1;

// const login = (req, res) => {
//   const { email, password } = req.body;
//   if(!email || !password) return res.status(400).json('MISSING_DATA')

//   const user = users.find((user) => {
//     return user.email === email && user.password === password;
//   });
  
//   if (!user){
//     return res.status(404).json('LOGIN_ERROR')
//   }
//   const payload = { id: user.id };
//   const token = jwt.sign(payload, _SECRET);
//   return res.json({ token });
// };

// const listUsers = (req, res) => {
//   if (req.query.name) {
//     return res.json(
//       users.filter((user) => {
//         return user.name.includes(req.query.name);
//       })
//     );
//   } else {
//     res.json(
//       users.map((user) => {
//         const { password, ...rest } = user;
//         return rest;
//       })
//     );
//   }
// };

// const detailedUser = (req, res) => {
//   const userID = Number(req.params.id);
//   res.json(users.find((user) => user.id == userID));
// };

// const createUser = (req, res) => {
//   const data = req.body;
//   let newUserID = counter++;
//   const newUser = {
//     id: newUserID,
//     name: data.name,
//     password: data.password,
//     email: data.email,
//   };
//   users.push(newUser);
//   return res.json(users);
// };

// const editUser = (req, res) => {
//   const userID = Number(req.params.id);
//   const data = req.body;
//   let editingUser = users.find((user) => user.id == userID);
//   if(!editingUser){
//     return res.status(404).res.json(USER_NOT_FOUND)
//   }
//   editingUser.name = data.name;
//   editingUser.password = data.password;
//   editingUser.email = data.email;
//   return res.json(users);
// };

// const deleteUser = (req, res) => {
//   const userID = Number(req.params.id);
//   users = users.filter((user) => user.id !== userID)
//   return res.json();
// };

// router.get("/", listUsers);
// router.get("/:id", detailedUser);
// router.post("/", createUser);
// router.post("/login", login);
// // router.post("/login", auth);
// router.put("/:id", editUser);
// router.delete("/:id", deleteUser);

// export default router;
