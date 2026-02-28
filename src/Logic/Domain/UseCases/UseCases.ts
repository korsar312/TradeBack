import { UseCasesInterface as Interface } from "./UseCases.interface";
import { ProjectInterface } from "../../Core/DI/Project.interface";
import GetItem from "./Scenario/GetItem";
import GetItemList from "./Scenario/GetItemList";
import CreateListing from "./Scenario/CreateListing";
import Register from "./Scenario/Register";
import Login from "./Scenario/Login";
import CreateDeposit from "./Scenario/Balance/CreateDeposit";
import CheckExistDeposit from "./Scenario/Balance/CheckExistDeposit";
import AwaitPayDeposit from "./Scenario/Balance/AwaitPayDeposit";
import RemoveDeposit from "./Scenario/Balance/RemoveDeposit";
import GetBalance from "./Scenario/Balance/GetBalance";
import WithdrawBalance from "./Scenario/Balance/WithdrawBalance";
import StartBuyItem from "./Scenario/StartBuyItem";

class UseCases implements Interface.IAdapter {
	public scenarioList: Interface.TScenarioList;

	constructor(service: ProjectInterface.TServices) {
		this.scenarioList = {
			login: new Login({ service }),
			register: new Register({ service }),
			createListing: new CreateListing({ service }),
			getItemList: new GetItemList({ service }),
			getItem: new GetItem({ service }),
			checkExistDeposit: new CheckExistDeposit({ service }),
			createDeposit: new CreateDeposit({ service }),
			awaitPayDeposit: new AwaitPayDeposit({ service }),
			removeDeposit: new RemoveDeposit({ service }),
			getBalance: new GetBalance({ service }),
			withdrawBalance: new WithdrawBalance({ service }),
			startBuyItem: new StartBuyItem({ service }),
		};
	}
}

export default UseCases;
