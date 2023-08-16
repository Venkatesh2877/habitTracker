const express=require('express');

const router=express.Router();
const homeController= require('../controllers/controller');

console.log('router loaded');

router.get('/', homeController.home);
router.get('/weekly', homeController.weekly)

module.exports=router;