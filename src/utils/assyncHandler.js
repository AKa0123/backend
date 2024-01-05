//  ()=> ()=>{}
// using promise
const asyncHanler=(requestHandler)=>{
  (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next).catch((err)=>next(err)
        
    )

    )
  }
}









// codebase for try catch
 const assyncHanler=(fun)=> async (req,res,next)=>{
     try {
         await fun(req,res,next)
     } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
        console.log();
     }
 }