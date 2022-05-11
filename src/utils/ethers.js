class EthLibrary {
  constructor(base) {
    this.base = base;
  }

  setBase(base) {
    this.base = base;
  }

  async balance() {
    return await this.base.getBalance();
  }

  async accounts() {
    return await this.base.listAccounts();
  }

  async network() {
    return await this.base.getNetwork();
  }

  async networkId() {
    const network = await this.network();
    return network.chainId;
  }


  async contract(abi, address, provider) { // provider or library
    return await this.base.eth.Contract(address, abi, provider);
  }
}

export default EthLibrary;
