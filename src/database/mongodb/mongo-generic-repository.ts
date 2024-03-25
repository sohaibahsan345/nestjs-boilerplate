import { AggregateOptions, FilterQuery, Model, ProjectionFields, QueryOptions, UpdateQuery } from 'mongoose';
import { IGenericRepository } from 'src/core/abstracts';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
    private _repository: Model<T>;

    constructor(repository: Model<T>) {
        this._repository = repository;
    }

    getAll(): Promise<T[]> {
        return this._repository.find().select({ __v: 0 }).exec();
    }

    getAllByQuery(
        query: FilterQuery<T> = {},
        selected: ProjectionFields<T> = { __v: 0 },
        populated: any = [],
        limit = 100,
        offset = 0,
        order: number = -1
    ): Promise<T[]> {
        // @ts-ignore
        return this._repository.find(query).select(selected).limit(limit).skip(offset).populate(populated).sort({ created_at: order }).exec();
    }

    get(id: string): Promise<T> {
        // @ts-ignore
        return this._repository.findById(id).select({ __v: 0 }).exec();
    }

    getByQuery(
        query: FilterQuery<T>,
        selected: ProjectionFields<T> = { __v: 0 },
        populated: any = [],
        options: QueryOptions
    ): Promise<T> {
        // @ts-ignore
        return this._repository.findOne(query, selected, options).populate(populated).exec();
    }

    create(item: T): Promise<T> {
        return this._repository.create(item);
    }

    update(id: string, item: UpdateQuery<T>): Promise<T> {
        return this._repository.findByIdAndUpdate(id, item, { new: true });
    }

    updateByQuery(
        query: FilterQuery<T>,
        data: UpdateQuery<T>,
        options: QueryOptions = { new: true },
        selected: ProjectionFields<T> = { __v: 0 },
        populated: any = null
    ): Promise<T> {
        // @ts-ignore
        return this._repository.findOneAndUpdate(query, data, options).select(selected).populate(populated);
    }

    isExist(query: FilterQuery<T>): Promise<boolean> {
        // @ts-ignore
        return this._repository.exists(query);
    }

    aggregate(pipeline: any, options: AggregateOptions = {}): Promise<T> {
        // @ts-ignore
        return this._repository.aggregate(pipeline, options);
    }
}