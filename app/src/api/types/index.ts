import { TypedResponse } from "hono";

/**
 * コントローラーのレスポンス型
 */
export type JsonResponse<T> = Promise<Response & TypedResponse<T>>;
