const router = require("express").Router(); 
const sney3iController = require("../controllers/sney3iController");
const verifyToken = require("../middlewares/tokenValidation")

router.post('/register', sney3iController.registerSney3i) ;
router.post('/login', sney3iController.loginSney3i); 
router.get('/getAllByServiceAndCity', sney3iController.getSney3iaByServiceAndCity);
router.put('/update/:id', sney3iController.updateSney3i);
router.get('/getSney3iById/:id', sney3iController.getSney3iById )
router.get('/getAll',sney3iController.getAllSney3ia );
router.get('/getAllByService/like', sney3iController.getSney3iaByServiceAndLike);
router.get('/getAllByCity/like', sney3iController.getSney3iaByCityLike);
router.get('/getSney3iByName', sney3iController.getSney3iByName) ;
//
router.get('/getByServiceCityLike', sney3iController.getSneyiByServiceCityLike); 

//
router.post('/postImage', sney3iController.postImage);
router.get('/getImage',sney3iController.getSney3iImage); 




module.exports = router ; 