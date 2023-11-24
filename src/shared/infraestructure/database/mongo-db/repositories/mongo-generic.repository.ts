import { Model } from 'mongoose';
import { GenericRepository } from 'src/shared/domain/abstract/generic-repository';
import { QueryOptionsDto } from '../../../../domain/dto/get-all-options.dto';

export class MongoGenericRepository<T> implements GenericRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(options?: QueryOptionsDto): Promise<T[]> {
    return this._repository.find().select(' -__v').populate(this._populateOnFind).exec();
  }

  getById(id: any): Promise<T> {
    return this._repository.findById(id).select(' -__v').populate(this._populateOnFind).exec() as Promise<T>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T) {
    return this._repository.findByIdAndUpdate(id, item, { new: true }).select(' -__v');
  }
  delete(id: string) {
    return this._repository.findByIdAndDelete(id).select(' -__v');
  }
}
