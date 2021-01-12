import { Controller, Post } from '@overnightjs/core';
import { Beach } from '@src/models/beach';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('beaches')
export class BeachControler {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new Beach(req.body);
      const result = await beach.save();

      res.status(201).send(result);
    } catch (error) {
      let status = 500;
      if (error instanceof mongoose.Error.ValidationError) {
        status = 422;
      }
      res.status(status).send({
        error: error.message
      })
    }
  }
}
