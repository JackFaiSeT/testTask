import constants from "@/config/constants";

const eth = constants.eth;

class Eth {
  private async ethRequest(data: any) {
    try {
      return await (window as any).ethereum.request(data);
    } catch (error) {
      console.log(error);
    }
  }

  async connectWallet() {
    return await this.ethRequest({ method: eth.methods.requestAccounts });
  }

  getAddress(): string {
    return (window as any).ethereum.selectedAddress
      ? (window as any).ethereum.selectedAddress
      : "";
  }

  isExist(): boolean {
    return typeof (window as any).ethereum !== "undefined";
  }
}

export default new Eth();
