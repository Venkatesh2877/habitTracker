const express=require('express');

const router=express.Router();
const homeController= require('../controllers/controller');


router.get('/', homeController.home);
router.post('/new-habit', homeController.newHabit)
router.get('/delete', homeController.delete)
router.get('/complete-status-update',homeController.completeStatusUpdate)

router.get('/weekly', homeController.weekly)



module.exports=router;