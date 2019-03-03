import * as HTTP_STATUS from "http-status-codes";

export function throw_400 (ctx: any, exception: any){
    ctx.throw(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
        message: "something went wrong",
        error: exception
      });
}

export function throw_BAD_REQUEST (ctx: any, exception: any){
    ctx.throw(HTTP_STATUS.BAD_REQUEST, {
        message: "Validation error",
        error: exception
      });
}

export function replaceAll(str: string,search: string, replacement: string) {
  return str.split(search).join(replacement);
}