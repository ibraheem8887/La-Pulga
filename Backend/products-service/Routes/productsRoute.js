const { Router } = require('express');
const router = Router(); 

const productController = require('../Controllers/productsController') 

router.get('/',productController.getProducts );
router.post('/',productController.createProducts);
router.get('/:id', productController.getProductById);
router.put('/:id',productController.updateProducts );
router.delete('/:id', productController.deleteProducts);
router.patch('/:id/sku', productController.updateSku);

module.exports = router