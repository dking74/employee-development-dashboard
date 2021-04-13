import { QueryParameters } from "@types";

declare global {
  namespace Express {
    interface Request {
      queryParameters: QueryParameters;
    }
  }
}