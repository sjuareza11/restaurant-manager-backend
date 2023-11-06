import { Model } from 'mongoose';
import { GenericRepository } from 'src/shared/domain/abstract/generic-repository';
import { GetAllOptionsDTO } from '../../domain/dto/get-all-options.dto';

export class MongoRepository<T> implements GenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(options: GetAllOptionsDTO): Promise<T[]> {
    console.log(options);
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  get(id: any): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }
}
