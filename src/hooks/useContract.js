import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useWeb3 from "./useWeb3";
import KryptoBirdz from "../contracts/abis/KryptoBirdz.json";

const useContract = () => {
  const [network, setNetwork] = useState({});
  const [abi, setAbi] = useState({});
  const [address, setAddress] = useState(0x0);
  const [contract, setContract] = useState({});
  const [contractData, setContractData] = useState({});
  const [connected, setConnected] = useState(false);

  const { provider, library, web3, chainId } = useWeb3();

  const resetState = () => {
    setNetwork({});
    setAbi({});
    setAddress(0x0);
    setContract({});
    setConnected(false);
  };

  useEffect(() => {
    if (provider && chainId) {
      const networkData = KryptoBirdz.networks[chainId];
      if (networkData) {
        const abi = KryptoBirdz.abi;
        const address = networkData.address;
        const signer = library.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        setNetwork(networkData);
        setAbi(abi);
        setAddress(address);
        setContract(contract);
        setConnected(true);
      } else {
        resetState();
      }
    }
  }, [provider, chainId]);

  const handleContact = async () => {
    const data = {
      name: await contract.name(),
      symbol: await contract.symbol(),
      totalSupply: await contract.totalSupply(),
      nft: [],
    };
    for(let i = 1; i <= data.totalSupply; i++) {
        const nft = await contract.kryptoBirdz(i - 1);
        data.nft.push(nft);
    }
    setContractData(data);
  };

  useEffect(() => {
    if (connected && contract) {
      handleContact();
    }
  }, [contract]);

  return {
    network,
    abi,
    address,
    contract,
    connected,
    contractData,
    handleContact,
  };
};

export default useContract;
