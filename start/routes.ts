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

router.get("/",[ShortUrlsController, 'index'])
router.post("/result",[ShortUrlsController, 'create'])
router.get("/:code",[ShortUrlsController, 'redirect'])

