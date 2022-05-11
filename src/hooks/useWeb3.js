import { useEffect, useState, useCallback } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { toHex, toDecimal } from "../utils/common";

const networkParams = {
  "0x63564c40": {
    chainId: "0x63564c40",
    rpcUrls: ["https://api.harmony.one"],
    chainName: "Harmony Mainnet",
    nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
    blockExplorerUrls: ["https://explorer.harmony.one"],
    iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"]
  },
  "0xa4ec": {
    chainId: "0xa4ec",
    rpcUrls: ["https://forno.celo.org"],
    chainName: "Celo Mainnet",
    nativeCurrency: { name: "CELO", decimals: 18, symbol: "CELO" },
    blockExplorerUrl: ["https://explorer.celo.org"],
    iconUrls: [
      "https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg"
    ]
  },
  "0x1691": {
    chainId: "0x1691",
    rpcUrls: ["http://127.0.0.1:7545"],
    chainName: "Ganache 5777",
    nativeCurrency: { name: "Ethereum", decimals: 18, symbol: "ETH" },
    iconUrls: []
  },
  "0x539": {
    chainId: "0x539",
    rpcUrls: ["http://127.0.0.1:7545"],
    chainName: "Ganache 1337",
    nativeCurrency: { name: "Ethereum", decimals: 18, symbol: "ETH" },
    iconUrls: []
  }
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "ce0c76c81db548e3a24815ec54649fcc",
    },
  },
};

let web3Modal;

const useWeb3 = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  useEffect(() => {
    if (window) {
      web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const web3 = new Web3(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      setWeb3(web3);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      } else {
        setError(switchError);
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature],
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        const chainId = toDecimal(_hexChainId);
        setChainId(chainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return {
    provider,
    library,
    web3,
    account,
    signature,
    error,
    chainId,
    network,
    message,
    signedMessage,
    verified,
    connectWallet,
    handleNetwork,
    handleInput,
    switchNetwork,
    signMessage,
    verifyMessage,
    disconnect,
  };
};

export default useWeb3;
