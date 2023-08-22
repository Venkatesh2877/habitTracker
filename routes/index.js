const express=require('express');

const router=express.Router();
const homeController= require('../controllers/controller');


router.get('/', homeController.home);
router.post('/new-habit', homeController.newHabit)
router.get('/delete', homeController.delete)
router.get('/weekly', homeController.weekly)
router.get('/complete-update',homeController.completeUpdate)

module.exports=router;