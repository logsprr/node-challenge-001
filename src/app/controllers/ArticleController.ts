import { Request, Response } from 'express';
import Article from '../models/Article';
import Author from '../models/Author';

export class ArticleController {
  async store(req: Request, res: Response): Promise<Response | undefined> {
    const {
      author_id,
      body,
      category,
      firstParagraph,
      summary,
      title,
    } = req.body;
    try {
      const authorExist = await Author.query().findOne({
        id: author_id,
      });
      if (authorExist) {
        const article = await Article.query().insert({
          author_id,
          body,
          category,
          firstParagraph,
          summary,
          title,
        });
        if (article != null) {
          return res.status(200).json({
            success: true,
            error: null,
            article: article,
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
          error: "Author doesn't exist!",
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
    const { id } = req.params;
    const { authentication } = req.body;
    try {
      const article = authentication.allowed
        ? await Article.query().findById(id)
        : await Article.query()
            .select('author', 'category', 'title', 'summary', 'firstParagraph')
            .findById(id)
            .innerJoin('authors as author', 'articles.author_id', 'author.id');

      if (article != null) {
        return res.status(200).json({
          article: article,
        });
      } else {
        return res.status(404).json({
          error: "Article doesn't exist!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
  async index(req: Request, res: Response): Promise<Response | undefined> {
    const { category } = req.query;
    const filter = req.body.authentication.logged
      ? ['author', 'category', 'title', 'summary', 'firstParagraph', 'body']
      : ['author', 'category', 'title', 'summary'];
    const articleQuery = Article.query()
      .select(filter)
      .innerJoin('authors as author', 'articles.author_id', 'author.id');
    try {
      const articles = category
        ? await articleQuery.where('category', String(category))
        : await articleQuery;
      if (articles.length > 0) {
        return res.status(200).json({
          articles: articles,
        });
      } else {
        return res.status(404).json({
          error: category ? "Category don't exist!" : "Articles don't exist!",
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
    const { body, category, firstParagraph, summary, title } = req.body;
    try {
      const article = await Article.query().findById(id).patch({
        body,
        category,
        firstParagraph,
        summary,
        title,
      });
      if (article == 1) {
        return res.status(204).send();
      } else {
        return res.status(404).json({
          error: "Article doesn't exist!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
  async delete(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    try {
      const article = await Article.query().deleteById(id);
      if (article == null) {
        return res.status(200).json({
          article: article,
        });
      } else {
        return res.status(400).json({
          error: "Article doesn't exist!",
        });
      }
    } catch (err) {
      return res.status(200).json({
        error: 'Server Error',
      });
    }
  }
}
