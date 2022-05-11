class EthLibrary {
  constructor(base) {
    this.base = base;
  }
  setBase(base) {
    this.base = base;
  }

  async balance() {
    return await this.base.eth.getBalance();
  }

  async accounts() {
    return await this.base.eth.getAccounts();
  }

  async networkId() {
    return await this.base.eth.getId();
  }

  async contract(abi, address) {
    return await this.base.eth.Contract(abi, address);
  }
}

export default EthLibrary;
