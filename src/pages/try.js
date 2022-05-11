import { useState, useEffect } from "react";
import {
  VStack,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import useWeb3 from "../hooks/useWeb3";
import { toHex, truncateAddress } from "../utils/common";
import EthLibrary from "../utils/ethers";

const ContractPage = () => {
  const [isConnected, setConnected] = useState(false);
  const [ethLibrary, setEthLibrary] = useState(false);
  const [data, setData] = useState({});
  const { provider, library, web3 } = useWeb3();

  const handleData = async () => {
    const data = {};
    data.accounts = await ethLibrary.accounts();
    data.networkId = await ethLibrary.networkId();
    setData(data);
  }

  useEffect(() => {
    if(ethLibrary) {
      handleData();
    }
  }, [ethLibrary])


  useEffect(() => {
    if (provider) {
      window.web3 = web3;
      window.library = library;
      setConnected(true);
      setEthLibrary(new EthLibrary(provider));
    }
  }, [provider]);

  return (
    <>
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <HStack marginBottom="10px">
          <Text
            margin="0"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
            sx={{
              color: "#aa6567",
            }}
          >
            Contract
          </Text>
        </HStack>
        {isConnected && ethLibrary && (
          <>
            <HStack justifyContent="flex-start" alignItems="flex-start">
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding="10px"
              >
                <VStack>

                <Text>{`Network ID: ${data.networkId}`}</Text>
                </VStack>
              </Box>
            </HStack>
          </>
        )}
      </VStack>
    </>
  );
};

export default ContractPage;
