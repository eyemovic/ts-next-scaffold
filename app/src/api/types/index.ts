import { TypedResponse } from "hono";

/**
 * コントローラーのレスポンス型
 */
export type R<T> = Promise<Response & TypedResponse<T>>;
