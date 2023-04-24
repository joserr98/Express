import express from "express";
import auth from "../../js/middleware.js";
import {listPokemon, detailedPokemon, addPokemon, editPokemon, patchPokemon, deletePokemon} from './controller.js'

const router = express.Router();

router.get('/', async (req, res, next)=> {
    try {
        res.json(await listPokemon(req.query))
    } catch(e) {
        next(e)
    } 
});

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await detailedPokemon(req.params.id))
    } catch(e) {
        next(e)
    } 
});

router.post("/", auth, async(req, res, next) => {
    try {
        res.json(await addPokemon(req))
    } catch(e) {
        next(e)
    } 
});

router.put("/:id", async(req, res, next) => {
    try {
        res.json(await editPokemon(req))
    } catch(e) {
        next(e)
    } 
})

router.patch("/:id", async(req, res, next) => {
    try {
        res.json(await patchPokemon(req))
    } catch(e) {
        next(e)
    } 
});

router.delete("/:id", async(req, res, next) => {
    try {
        res.json(await deletePokemon(req.params.id))
    } catch(e) {
        next(e)
    } 
});

export default router
