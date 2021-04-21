import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/User';
import { Token } from '../services/Token';

export class UserController {
  async store(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { email, password } = req.body;
      if (email != null && password != null) {
        const userExist = await User.query().findOne({ email });
        if (userExist) {
          return res.status(400).json({
            success: true,
            error: 'User already exist!',
            user: userExist,
          });
        }
        const hash = bcrypt.hashSync(password, 10);
        const user = await User.query().insert({
          email: email,
          password: hash,
        });
        if (user != null) {
          return res.status(200).json({
            success: true,
            error: null,
            user: user,
          });
        } else {
          return res.status(500).json({
            success: false,
            error: 'Application Error',
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          error: 'Missing params',
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
  async show(req: Request, res: Response): Promise<Response | undefined> {
    const { email, password } = req.body;
    try {
      const user = await User.query().findOne({ email: email });
      if (user != null) {
        const resPassword = await bcrypt.compare(password, user.password);
        if (resPassword == true) {
          const token = await new Token().generateToken(user.id);
          return res.status(200).json({
            success: true,
            error: null,
            user: user,
            token: token,
          });
        } else {
          return res.status(200).json({
            success: false,
            error: "Passords don't macth!",
            user: null,
          });
        }
      } else {
        return res.status(404).json({
          success: true,
          error: "User doesn't exist!",
          user: null,
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
}
