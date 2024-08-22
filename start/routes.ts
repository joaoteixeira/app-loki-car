/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const VeiculosController = () => import('#controllers/veiculos_controller')
const ClientesController = () => import('#controllers/clientes_controller')
const LocacoesController = () => import('#controllers/locacoes_controller')

router.on('/').render('pages/home')
// router.on('/autor').render('pages/autor')

router.resource('veiculos', VeiculosController)
router.resource('clientes', ClientesController)
router.resource('locacoes', LocacoesController)
router.get('locacoes/:id/step2', [LocacoesController, 'createStep2']).as('locacoes.step2')
router.post('locacoes/:id/step2', [LocacoesController, 'storeStep2']).as('locacoes.step2-add')
