/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ShortUrlsController = () => import("#controllers/short_urls_controller")
const UsersController = () => import("#controllers/users_controller")
const EmailsController = () => import("#controllers/emails_controller")

router.on('/login').render('security/login')
router.on('/signin').render('security/signin')
router.on('/forgotview').render('security/passwordforgot')
router.get('/passwordedit/:email',[EmailsController, 'passwordedit'])
    


router.post("/signin", [UsersController , 'create'])
router.get("/connexion", [UsersController , 'login'])
router.post("/passwordforgot",[EmailsController, 'sendPassword'])
router.post("/passwordEnregistrement/:email",[EmailsController, 'passwordEnregistrement'])

router.get('/profil' , [UsersController , 'profil']).use(middleware.auth())

router.get("/",[ShortUrlsController, 'index']).use(middleware.auth())

router.get("/home",[ShortUrlsController, 'home']).use(middleware.auth())

router.get("/:code",[ShortUrlsController, 'redirect']).use(middleware.auth())

router.post("/create",[ShortUrlsController, 'create']).use(middleware.auth())

router.delete("/delete/:id",[ShortUrlsController, 'delete']).use(middleware.auth())

router.get("/edits/:code", [ShortUrlsController,'edit']).use(middleware.auth())
router.post("/edit/:code", [ShortUrlsController,'editEnregistrement']).use(middleware.auth())

router.get('/detail/:id',[ShortUrlsController , 'detail']).use(middleware.auth())

router.post('/deconnect',[UsersController , 'deconnect']).use(middleware.auth()) 



