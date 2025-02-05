import multer from "multer";
import {v4 as uuidv4} from "uuid"
const storage = multer.diskStorage(
    {
        destination:function (req,file,cb)
        {
            cb(null,"backend/upload")
        },
        filename:function(req,file,cb)
        {
            const randomPrefix=uuidv4()
            cb(null,randomPrefix+file.originalname)
        }
    });

const uploadFile = multer({ storage }).single("file");

export default uploadFile;
