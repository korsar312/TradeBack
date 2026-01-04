import ErrorImp from "./Error/Error.imp.ts";
import { Errors } from "../../Config/List/Errors.ts";

export const Utils = {
	error: new ErrorImp(Errors),
};
