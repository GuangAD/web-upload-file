const path = require("path");
const Koa = require("koa");
const cors = require("@koa/cors");
const static = require("koa-static");
const multer = require("@koa/multer"); // 处理 multipart/form-data 的中间件
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();
const PORT = 3000;
const RESOURCE_URL = `http://localhost:${PORT}`;
const UPLOAD_DIR = path.join(__dirname, "/public/upload");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 设置文件的存储目录
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // 设置文件名
    cb(null, `${file.originalname}`);
  },
});

const multerUpload = multer({ storage });

router.get("/", async (ctx) => {
  ctx.body = "文件上传服务";
});

router.post(
  "/upload/single",
  async (ctx, next) => {
    try {
      console.log('single');
      await next();
      ctx.body = {
        code: 1,
        msg: "文件上传成功",
        url: `${RESOURCE_URL}/${ctx.file.originalname}`,
      };
    } catch (error) {
      console.dir(error);
      ctx.body = {
        code: 0,
        msg: "文件上传失败",
      };
    }
  },
  multerUpload.single("file")
);


router.post(
  "/upload/multiple",
  async (ctx, next) => {
    try {
      console.log('multiple');
      await next();
      urls = ctx.files.file.map(file => `${RESOURCE_URL}/${file.originalname}`);
      ctx.body = {
        code: 1,
        msg: "文件上传成功",
        urls
      };
    } catch (error) {
      ctx.body = {
        code: 0,
        msg: "文件上传失败",
      };
    }
  },
  multerUpload.fields([
    {
      name: "file", // 与FormData表单项的fieldName想对应
    },
  ])
);

// 注册中间件
app.use(cors());
app.use(static(UPLOAD_DIR));
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`应用已经启动：http://localhost:${PORT}/`);
});