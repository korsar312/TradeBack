import ErrorImp from "./Error/Error.imp.ts";
import { Errors } from "./../Logic/Config/List/Errors.ts";

export const Utils = {
	error: new ErrorImp(Errors),
};
