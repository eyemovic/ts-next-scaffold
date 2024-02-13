import { Handler, MiddlewareHandler } from "hono/types";

/**
 * Controllerのテンプレート
 */
export type BaseController = {
	readonly getById: Handler;
	readonly getAll: Handler;
	readonly post: MiddlewareHandler;
	readonly postMulti: MiddlewareHandler;
};

export type BaseService<T> = {
	readonly getById: (id: number) => Promise<T | undefined>;
	readonly getAll: () => Promise<Array<T>>;
	readonly create: (data: T) => void;
	readonly createAll: (data: Array<T>) => void;
};

export type BaseRepository<T, R> = {
	readonly findById: (id: number) => Promise<R | undefined>;
	readonly findAll: () => Promise<Array<R>>;
	readonly add: (data: T) => void;
	readonly addAll: (data: Array<T>) => void;
};
