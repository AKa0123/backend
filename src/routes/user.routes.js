import { Router } from "express";
import { resisterUser } from "../controller/user.controller.js";
import {upload} from "../middleware/multer.middleware.js"
const router= Router()

router.route("/resister").post(
    upload.fields(
        [
            {
                name:"avatar",
                maxCount:1
            },{
                name:"coverImage",
                maxCount:1
            }
        ]
    )
)

export default router