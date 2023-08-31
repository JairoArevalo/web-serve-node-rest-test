import Router from "express";
import { deleteUsuarios, getUsuarios, postUsuarios, putUsuarios } from "../controllers/user.controller.js";

const router = Router();

router.get('/', getUsuarios);

router.put('/', putUsuarios);

router.post('/', postUsuarios);

router.delete('/', deleteUsuarios);




export {router}