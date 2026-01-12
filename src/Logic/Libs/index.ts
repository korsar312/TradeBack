import { GetArray } from "./GetArray/GetArray";
import { ToArray } from "./ToArray/ToArray";
import { ToMoney } from "./ToMoney/ToMoney";

class Index {
	/** Возвращает массив */
	public getArray = GetArray.execute();

	/** Преобразует в массив */
	public toArray = ToArray.execute();

	/** Преобразует в денежный формат */
	public toMoney = ToMoney.execute();
}

export default new Index();
