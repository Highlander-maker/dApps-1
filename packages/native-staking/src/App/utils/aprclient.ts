import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  BankExtension,
  StakingExtension,
  QueryClient,
  setupBankExtension,
  setupStakingExtension,
  Coin,
} from "@cosmjs/stargate";
import { QueryPoolResponse } from "@cosmjs/stargate/build/codec/cosmos/staking/v1beta1/query";

export class AprClient {
  private queryClient: QueryClient & BankExtension & StakingExtension;

  constructor(private tmClient: Tendermint34Client) {
    if (tmClient) {
        this.tmClient = tmClient;
        this.queryClient = QueryClient.withExtensions(tmClient, setupBankExtension, setupStakingExtension);
    }
  }

  static async connect(endpoint: string) {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new AprClient(tmClient);
  }

  getSupply(denom: string): Promise<Coin> {
    return this.queryClient.bank.supplyOf(denom);
  }

  getStakingPool(): Promise<QueryPoolResponse> {
    return this.queryClient.staking.pool();
  }
}
