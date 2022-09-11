export const validateFile = (req, res, next) => {
   const { files } = req;
   if(!files || Object.keys(files).length === 0 || !files.file){
       return res.status(400).json(['You have not sent a file']);
   }
   next();
}