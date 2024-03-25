import { AggregateOptions, FilterQuery, ProjectionFields, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class IGenericRepository<T> {
    abstract getAll(): Promise<T[]>;
    abstract getAllByQuery(query?: FilterQuery<T>, selected?: ProjectionFields<T>, populated?: any, limit?: Number, offset?: Number, order?: number): Promise<T[]>;
    abstract get(id: string): Promise<T>;
    abstract getByQuery(query: FilterQuery<T>, selected?: ProjectionFields<T>, populated?: any, options?: QueryOptions): Promise<T>;
    abstract create(item: T): Promise<T>;
    abstract update(id: string, item: UpdateQuery<T>): Promise<T>;
    abstract updateByQuery(
        query: FilterQuery<T>,
        data: UpdateQuery<T>,
        options?: QueryOptions,
        selected?: ProjectionFields<T>,
        populated?: any
    ): Promise<T>;
    abstract isExist(query: FilterQuery<T>): Promise<boolean>;
    abstract aggregate(pipeline: any, options?: AggregateOptions): Promise<T>;
}