import express from 'express'
import { 
    createBanner,
    getBannerByPlacement,
    getBannerByStatus,
    duplicateBanner,
    deactivateBanner,
    deleteBanner,
    getBanner,
    getBannerById,
    editBanner
} from '../controllers/banner.controller.js'

const router = express.Router();

router.get('/', getBanner)
router.post('/', createBanner)
router.patch('/:id', editBanner)
router.get('/:id', getBannerById)
router.delete('/:id', deleteBanner)
router.post('/duplicate/:id', duplicateBanner)
router.get('/status/:status', getBannerByStatus)
router.patch('/deactivate/:id', deactivateBanner)
router.get('/placement/:placement', getBannerByPlacement)

export default router