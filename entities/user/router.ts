import express from "express";
import auth from "../../js/middleware.js";
import {listUser, detailedUser, addUser, editUser, patchUser, deleteUser, login} from './controller.js'

const router = express.Router();

router.get('/', async (req, res, next)=> {
    try {
        const pokemonList = await listUser(req.query)
        if (!pokemonList) {
            return next(new Error('NOT_EXIST'));
        }
        res.json(pokemonList)
    } catch(e) {
        next(e)
    } 
});

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await detailedUser(req.params.id))
    } catch(e) {
        next(e)
    } 
});

router.post("/", auth, async(req, res, next) => {
    try {
        res.json(await addUser(req.body))
    } catch(e) {
        next(e)
    } 
});

router.put("/:id", async(req, res, next) => {
    try {
        res.json(await editUser(req))
    } catch(e) {
        next(e)
    } 
})

router.patch("/:id", async(req, res, next) => {
    try {
        res.json(await patchUser(req))
    } catch(e) {
        next(e)
    } 
});

router.delete("/:id", async(req, res, next) => {
    try {
        res.json(await deleteUser(req.params.id))
    } catch(e) {
        next(e)
    } 
});

router.post("/login", async(req, res, next) => {
    try {
        res.json(await login(req))
    } catch(e) {
        next(e)
    }
});

export default router
