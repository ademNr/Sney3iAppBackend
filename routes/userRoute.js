const router = require("express").Router(); 
const userController = require("../controllers/userController"); 



router.post('/login', userController.userLogin); 
router.post('/register', userController.userRegister); 

module.exports = router ;