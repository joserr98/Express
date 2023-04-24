import jwt from "jsonwebtoken";
import config from "../conf.js";

const NOT_TOKEN_PROVIDED = "There's no token provided";

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
      return res.status(404).json('NOT_TOKEN_PROVIDED')
    }
    const bearer = token.split(' ');
    const bearerToken = bearer[1];
    try {
      req.token = jwt.verify(bearerToken, config.SECRET)
      next()
    } catch {
      return res.status(404).json('INVALID_TOKEN')
    }
}

export default auth;