import joi from 'joi'
import { NextFunction, HandlerLambda } from 'middy'
import { HttpError, R, HttpPathAuthNotRequire, jwtHelper, HttpPathAdminRequire } from '../utils'
import { AWSTypes, ResponsesTypes } from '../types'

export const validateJWT = <Q = {}, B = {}, P = {}> () => ({
    before: async (handler: HandlerLambda<AWSTypes.Event<Q, B, P>, ResponsesTypes.LambdaResponse>, next: NextFunction) => {
        /*
            Use below code as per require
        */
        // const { headers } = handler.event
        // if (headers.Authorization) {
        //     try {
        //         handler.event.user = await jwtHelper.verifyToken(headers.Authorization);
        //     } catch(err) {
        //         throw new HttpError().Unauthorized();               
        //     }
        // }

        // let pathObj = HttpPathAuthNotRequire[handler.event.path] || HttpPathAuthNotRequire[handler.event.resource];
        // let authRequire = !(pathObj?.method?.indexOf(handler.event.httpMethod)>-1);
        // if (authRequire) {
        //     if (!headers.Authorization) throw new HttpError().Unauthorized();
        // }
        return;
    },
    onError: (_: HandlerLambda, next: NextFunction) => {
        return next()
    }
})
