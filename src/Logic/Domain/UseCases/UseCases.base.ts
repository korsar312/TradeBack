import { UseCasesInterface as Interface } from "./UseCases.interface";
import { ProjectInterface } from "../../Core/DI/Project.interface";
import { ItemInterface } from "../Services/ServiceItem/Item.interface";

export interface IUseCasesProps {
	service: ProjectInterface.TServices;
}

abstract class UseCasesBase<T, R> implements Interface.TScenarioBase<T, R> {
	constructor(private readonly params: IUseCasesProps) {
		this.invoke = this.invoke.bind(this);
	}

	abstract invoke(params: T, userId: string): R;

	protected toItemRes(item: ItemInterface.TItemAll, isPublicData: true): ItemInterface.TItemResPub;
	protected toItemRes(item: ItemInterface.TItemAll, isPublicData: boolean): ItemInterface.TItemResPub | ItemInterface.TItemRes {
		switch (item.type) {
			case "CARD": {
				const { id, listingId, name, ...rest } = item.info;
				const info = isPublicData ? rest : { name, ...rest };

				return { type: "CARD", info };
			}

			case "FREE": {
				const { id, listingId, desc, ...rest } = item.info;
				const info = isPublicData ? { desc, ...rest } : rest;

				return { type: "FREE", info };
			}
		}
	}

	public service = new Proxy({} as ProjectInterface.ActType<ProjectInterface.TModuleService>, {
		get: (_, prop: keyof ProjectInterface.TModuleService) => {
			return this.params.service(prop).invoke;
		},
	});
}

export default UseCasesBase;
