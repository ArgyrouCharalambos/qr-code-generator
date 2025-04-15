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
router.get("/create",[ShortUrlsController, 'index2'])

router.get("/:code",[ShortUrlsController, 'redirect'])

router.post("/result",[ShortUrlsController, 'create'])

router.delete("/result/:id",[ShortUrlsController, 'delete'])

router.get("/edits/:code", [ShortUrlsController,'edit'])
router.post("/edit/:code", [ShortUrlsController,'editEnregistrement'])



