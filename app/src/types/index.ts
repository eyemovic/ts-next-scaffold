import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { Handler } from "hono/types";

/**
 * 基底となるレスポンス
 * @description アプリケーション全体でレスポンスを統一するための型
 */
export type BaseResponse<T> = {
	readonly success: boolean;
	readonly status: number;
	readonly message: string;
	readonly data?: T;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	readonly error?: any;
};

/**
 * 基底となるルート
 */
export type BaseRoute = {
	readonly getById: RouteConfig;
	readonly getAll: RouteConfig;
	readonly post: RouteConfig;
	readonly postMulti: RouteConfig;
};

/**
 * Controllerのテンプレート
 */
export type BaseController = {
	readonly getById: Handler;
	readonly getAll: Handler;
	readonly post: Handler;
	readonly postMulti: Handler;
};

/**
 * Serviceのテンプレート
 */
export type BaseService<T> = {
	readonly getById: (id: number) => Promise<T | undefined>;
	readonly getAll: () => Promise<Array<T>>;
	readonly create: (data: T) => void;
	readonly createAll: (data: Array<T>) => void;
};

/**
 * Repositoryのテンプレート
 */
export type BaseRepository<T, R> = {
	readonly findById: (id: number) => Promise<R | undefined>;
	readonly findAll: () => Promise<Array<R>>;
	readonly add: (data: T) => void;
	readonly addAll: (data: Array<T>) => void;
};
