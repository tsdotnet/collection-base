export interface Pipe<T>
    extends Iterable<T>
{
    pipe<TResult>(filter:Transform<T, TResult>): Pipe<TResult>;
}

export type Transform<TIn, TOut> = (source:Iterable<TIn>)=>Iterable<TOut>;
export type Filter<T> = Transform<T, T>;

export default function pipe<T, TResult>(
    source:Iterable<T>, filter:Transform<T, TResult>):Pipe<TResult>
{
    return new PipeSource(source, filter);
}

export type Selector<T, TResult> = (e:T, i:number)=>TResult;
export type Predicate<T> = (e:T, i:number)=>boolean;

export function map<T,TResult>(selector:Selector<T, TResult>):Transform<T,TResult>
{
    return function*(source:Iterable<T>):Iterable<TResult>{
        let i = 0;
        for(const e of source) {
            yield selector(e, i++);
        }
    }
}

export function filter<T>(predicate:Predicate<T>):Filter<T>
{
    return function*(source:Iterable<T>):Iterable<T>{
        let i = 0;
        for(const e of source) {
            if(predicate(e, i++)) yield e;
        }
    }
}
/*

    Array.prototype.indexOf
    Array.prototype.lastIndexOf
    Array.prototype.every
    Array.prototype.some
    Array.prototype.reduce
    Array.prototype.reduceRight

 */

class PipeSource<TIn, TOut> implements Pipe<TOut>
{
    constructor(
        private readonly _source:Iterable<TIn>,
        private readonly _transform:Transform<TIn,TOut>)
    {
    }

    [Symbol.iterator](): Iterator<TOut>
    {
        return this._transform(this._source)[Symbol.iterator]();
    }

    
    pipe<TResult>(filter:Transform<TOut, TResult>): Pipe<TResult>
    {
        return new PipeSource<TOut, TResult>(this, filter);
    }

}