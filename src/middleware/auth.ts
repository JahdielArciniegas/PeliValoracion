import type { NextFunction, Request, Response } from "express";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.user){
        next();
    }
    res.redirect("/");
}

export default isAuth;