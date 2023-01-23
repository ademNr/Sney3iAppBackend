const router = require("express").Router(); 
const sney3iController = require("../controllers/sney3iController");
const verifyToken = require("../middlewares/tokenValidation")

router.post('/register', sney3iController.registerSney3i) ;
router.post('/login', sney3iController.loginSney3i); 
router.get('/getAll', sney3iController.getSney3ia);
router.put('/update/:id',verifyToken.verifyTokenAndAuth, sney3iController.updateSney3i);


module.exports = router ; 