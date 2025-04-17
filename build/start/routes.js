import router from '@adonisjs/core/services/router';
const ShortUrlsController = () => import("#controllers/short_urls_controller");
router.get("/", [ShortUrlsController, 'index']);
router.get("/home", [ShortUrlsController, 'home']);
router.get("/:code", [ShortUrlsController, 'redirect']);
router.post("/create", [ShortUrlsController, 'create']);
router.delete("/delete/:id", [ShortUrlsController, 'delete']);
router.get("/edits/:code", [ShortUrlsController, 'edit']);
router.post("/edit/:code", [ShortUrlsController, 'editEnregistrement']);
router.get('/detail/:id', [ShortUrlsController, 'detail']);
//# sourceMappingURL=routes.js.map