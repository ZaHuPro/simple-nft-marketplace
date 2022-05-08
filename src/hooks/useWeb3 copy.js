// import { useEffect, useState, useCallback } from "react";
// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// import { toast } from "react-toastify";

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider, // required
//     options: {
//       infuraId: "ce0c76c81db548e3a24815ec54649fcc",
//     },
//   },
// };

// const useWeb3 = () => {
//   let web3Modal;
//   const [web3Connected, setConnected] = useState(false);
//   //   const [web3Modal, setWeb3Modal] = useState(false);
//   const [web3Provider, setWeb3Provider] = useState(false);
//   const [account, setAccount] = useState(false);
//   const [address, setAddress] = useState(0x00);

//   const handleAddress = async () => {
//     if(account) {
//         setAddress(await account.getAddress());
//     } else {
//         setAddress(0x00);
//     }
//   }

//   useEffect(() => {
//     handleAddress()
//   }, [account])

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       web3Modal = new Web3Modal({
//         network: "mainnet",
//         cacheProvider: true,
//         providerOptions,
//       });
//     }
//   }, [web3Provider]);

//   useEffect(() => {
//     if (web3Provider) {
//       console.log({ web3Provider });
//       const signer = web3Provider.getSigner(0);
//       setAccount(signer);
//       setConnected(true);
//     }
//   }, [web3Provider]);

//   const connect = useCallback(async () => {
//     console.log({ web3Modal})
//     if (web3Modal) {
//       try {
//         const provider = await web3Modal.connect();
//         setWeb3Provider(new ethers.providers.Web3Provider(provider));
//         toast.success("Connected to Web3");
//       } catch (e) {
//         console.log("connect error", e);
//       }
//     } else {
//       console.error("No Web3Modal");
//     }
//   }, []);

//   const disconnect = useCallback(async () => {
//       console.log({ web3Modal})
//     if (web3Modal) {
//       web3Modal.clearCachedProvider();
//       if (
//         web3Provider?.disconnect &&
//         typeof web3Provider.disconnect === "function"
//       ) {
//         await web3Provider.disconnect();
//       }
//       setConnected(false);
//       setAccount(false);
//       toast.error("Disconnected from Web3");
//     } else {
//       console.error("No Web3Modal");
//     }
//   }, [web3Provider]);

//   useEffect(() => {
//     if (web3Modal && web3Modal.cachedProvider) {
//       connect();
//     }
//   }, [connect]);

//   // EIP-1193 events
//   useEffect(() => {
//     if (web3Provider?.on) {
//       const handleAccountsChanged = (accounts) => {
//         toast.info("Changed Web3 Account");
//         setAccount(accounts[0]);
//       };

//       // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
//       const handleChainChanged = (_hexChainId) => {
//         if (typeof window !== "undefined") {
//           console.log("switched to chain...", _hexChainId);
//           toast.info("Web3 Network Changed");
//           window.location.reload();
//         } else {
//           console.log("window is undefined");
//         }
//       };

//       const handleDisconnect = (error) => {
//         // eslint-disable-next-line no-console
//         console.log("disconnect", error);
//         web3Connected(false);
//         disconnect();
//       };

//       web3Provider.on("accountsChanged", handleAccountsChanged);
//       web3Provider.on("chainChanged", handleChainChanged);
//       web3Provider.on("disconnect", handleDisconnect);

//       // Subscription Cleanup
//       return () => {
//         if (web3Provider.removeListener) {
//           web3Provider.removeListener("accountsChanged", handleAccountsChanged);
//           web3Provider.removeListener("chainChanged", handleChainChanged);
//           web3Provider.removeListener("disconnect", handleDisconnect);
//         }
//       };
//     }
//   }, [web3Provider, disconnect]);

//   return {
//     web3Connected,
//     web3Provider,
//     connect,
//     disconnect,
//     account,
//     address
//   };
// };

// export default useWeb3;
