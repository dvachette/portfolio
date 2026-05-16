import { Router } from "express";
import { readJSON } from "../data/readers";

export const toolsRouter = Router()

toolsRouter.get('/', async (req, res) => {
    try {
        const toolsData = await readJSON('tools.json')
        res.json(toolsData)
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Erreur lors du chargement des outils' })
    }
})