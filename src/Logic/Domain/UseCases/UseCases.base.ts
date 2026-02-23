import { UseCasesInterface as Interface } from "./UseCases.interface";
import { ProjectInterface } from "../../Core/DI/Project.interface";
import { ItemInterface } from "../Services/ServiceItem/Item.interface";

export interface IUseCasesProps {
	service: ProjectInterface.TServices;
}

abstract class UseCasesBase implements Interface.TScenarioBase<unknown, unknown> {
	protected depositAwaitMap: Map<string, Array<(val: boolean) => void>> = new Map();

	constructor(private readonly params: IUseCasesProps) {
		this.invoke = this.invoke.bind(this);
	}

	abstract invoke(params: unknown, userId: string): unknown;

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
