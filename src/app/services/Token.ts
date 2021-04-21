import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export class Token {
  public async generateToken(params: number): Promise<string> {
    const token = jwt.sign({ id: params }, String(process.env.KEYCHALLENGE), {
      expiresIn: 86400,
    });
    return token;
  }
  public async verifyToken(params: string): Promise<string | object> {
    const token = jwt.verify(params, String(process.env.KEYCHALLENGE));
    return token;
  }
  public async verifyLoggedUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const authHeader = req.headers.authorization;
    const partsofToken = authHeader != null ? authHeader.split(' ') : [];
    const [token] = partsofToken;
    if (token) {
      const logged = jwt.verify(token, String(process.env.KEYCHALLENGE));
      req.body.authentication = {
        user_id: logged,
        logged: !!logged,
      };
      next();
    } else {
      req.body.authentication = {
        user_id: '',
        logged: false,
      };
      next();
    }
  }
}
