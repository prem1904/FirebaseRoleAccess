import { Request, Response } from "express";

export function isAuthorized(opts: { 
    hasRole:Array<'admin' | 'manager' | 'user'>, allowSameUser?: boolean }) {
   return (req: Request, res: Response, next: Function) => {
    try {
       const { role, email, uid } = res.locals
       const { id } = req.params
       if (email === 'tprem3006@gmail.com')
           return next();

       if (opts.allowSameUser && id && uid === id)
           return next();

       if (!role)
           return res.status(403).send();

       if (opts.hasRole.includes(role))
           return next();

       return res.status(403).send();
    }catch (err) {
        handleError(res, err)
    }
   }
}
function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
 }
