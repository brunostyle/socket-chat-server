export const validateExtension = async (files, res, extensions = []) => {    
   const { name } = files.file;
   const nameCurt = name.split('.');
   const extension = nameCurt.at(-1);
   if(!extensions.includes(extension)) {
       return res.json([`The extension ${extension} is not allowed, only files are allowed ${extensions}`]);
   }
}

export const nameDestroy = (url) => {
   const nameCurt = url.split('/');
   const nameExt = nameCurt[nameCurt.length -1];
   const [name] = nameExt.split('.');
   return name;
}
