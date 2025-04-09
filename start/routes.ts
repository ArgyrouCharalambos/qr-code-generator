/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ShortUrlsController = () => import("#controllers/short_urls_controller")
const QrCodesController = () => import("#controllers/qr_codes_controller")

router.get("/",[ShortUrlsController, 'index'])
router.post("/result",[ShortUrlsController, 'create'])

