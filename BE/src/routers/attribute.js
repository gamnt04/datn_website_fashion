import express from "express";
import { get_attribute } from "../controllers/attribute/get";
import { create_attribute } from "../controllers/attribute/create";
import { update_attribute } from "../controllers/attribute/update";

const Routes_Attribute = express.Router();

Routes_Attribute.get('/get-attribute/:id_account', get_attribute);
Routes_Attribute.post('/create-attribute', create_attribute);
Routes_Attribute.put('/update-attribute/:id_attribute', update_attribute);

export default Routes_Attribute;
