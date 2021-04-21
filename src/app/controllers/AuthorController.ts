import { Request, Response } from 'express';
import Author from '../models/Author';

export class AuthorController {
  async store(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { name, picture } = req.body;
      if (name != null && picture != null) {
        const author = await Author.query().insert({
          name: name,
          picture: picture,
        });
        if (author != null) {
          return res.status(200).json({
            author: author,
          });
        } else {
          return res.status(500).json({
            error: 'Application Error',
          });
        }
      } else {
        return res.status(400).json({
          error: 'Missing params',
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  }
  async show(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    try {
      const author = await Author.query().findById(id);
      if (author != null) {
        return res.status(200).json({
          author: author,
        });
      } else {
        return res.status(404).json({
          error: "Author doesn't exist!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
  async index(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const authors = await Author.query();
      if (authors.length > 0) {
        return res.status(200).json({
          authors: authors,
        });
      } else {
        return res.status(404).json({
          error: "Authors don't exist!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
  async update(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const { name, picture } = req.body;
    try {
      const author = await Author.query().findById(id).patch({
        name: name,
        picture: picture,
      });
      if (author == 1) {
        return res.status(204).send();
      } else {
        return res.status(400).json({
          error: 'Missing params!',
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
  async delete(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    try {
      const author = await Author.query().deleteById(id);
      console.log(author);
      if (author == 1) {
        return res.status(204).send();
      } else {
        return res.status(400).json({
          error: 'Missing params!',
        });
      }
    } catch (err) {
      return res.status(200).json({
        error: 'Server Error',
      });
    }
  }
}
