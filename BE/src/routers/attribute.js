import express from "express";
import { get_attribute_catalog } from "../controllers/Attribute/get_attribute_catalog";
import { create_attribute } from "../controllers/Attribute/create_attribute";
import { remove_attribute_catalog } from "../controllers/Attribute/REMOVE_attribute";
import { update_attribute_catalog } from "../controllers/Attribute/UPDATE_attribute";

const Routes_Attribute = express.Router();

Routes_Attribute.get('/products/attribute_catalog/seller/:id_account', get_attribute_catalog);
Routes_Attribute.post('/products/attribute_catalog/create', create_attribute);
Routes_Attribute.delete('/products/remove-attribute/:id_account', remove_attribute_catalog);
Routes_Attribute.patch('/products/attribute_catalog/update/:_id_attribute', update_attribute_catalog);


export default Routes_Attribute;
