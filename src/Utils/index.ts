import ErrorImp from "./Error/Error.imp";
import { Errors } from "../Logic/Config/List/Errors";

export const Utils = {
	error: new ErrorImp(Errors),
};
