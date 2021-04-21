import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export class AuthToken {
  constructor() {}

  async AuthUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const authHeader = req.headers.authorization;
    if (authHeader != null) {
      const partsofToken = authHeader.split(' ');
      if (partsofToken.length > 1) {
        const [bearer, token] = partsofToken;
        if (bearer == 'Bearer') {
          const tokenResponse = jwt.verify(
            String(token),
            String(process.env.KEYCHALLENGE),
          );
          if (tokenResponse != null) {
            req.body.authentication = {
              user_id: tokenResponse,
              allowed: true,
            };
            next();
          }
        } else {
          return res
            .status(401)
            .send({ error: '  Token invalido na requisição', status: false });
        }
      } else {
        return res
          .status(401)
          .send({ error: '  Token invalido sem partes', status: false });
      }
    } else {
      return res
        .status(401)
        .send({ error: 'Nenhum token na requisição', status: false });
    }
  }
}
