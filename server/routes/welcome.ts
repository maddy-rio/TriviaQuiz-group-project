import express from 'express'
import Home from '../../client/components/Home.tsx'

const router = express.Router()

// GET /api/v1/welcome/
router.get('/home', (req, res) => {})

export default router
