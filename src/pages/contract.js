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
import useContract from "../hooks/useContract";
import { toHex, truncateAddress } from "../utils/common";

const ContractPage = () => {
  const { network, abi, address, contract, connected, contractData, handleContact } =
    useContract();


  const [mintStr, setMintStr] = useState("");

  useEffect(() => {
    console.log({ contract });
  }, [contract]);

  const handleMint = async () => {
    const mintData = await contract.mint(mintStr);
    console.log("1111", mintData)
    const waitData = await mintData.wait()
    console.log("222", waitData)
    handleContact()
  }

  const handleMintInput = (e) => {
    const msg = e.target.value;
    setMintStr(msg);
  };


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
        {connected ? (
          <>
            <HStack justifyContent="flex-start" alignItems="flex-start">
              <Box
                borderWidth="1px"
                borderRadius="lg"
                padding="10px"
              >
                <VStack>
                  <Tooltip label={address} placement="bottom">
                    <Text>{`Address: ${truncateAddress(address)}`}</Text>
                  </Tooltip>
                  <Text>{`Name: ${contractData.name}`}</Text>
                  <Text>{`Symbol: ${contractData.symbol}`}</Text>
                  <Text>{`Total Supply: ${contractData.totalSupply}`}</Text>
                  {/* {contractData && Object.entries(contractData).map(([key, val]) => (<Text><strong>{`${key.toUpperCase()}`}</strong>{`: ${val}`}</Text>))} */}
                </VStack>
              </Box>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                padding="10px"
              >
                <VStack>
                    <Text><strong>NFT's</strong></Text>
                    {contractData?.nft?.map((each, i) => <Text>{`${each}`}</Text>)}
                </VStack>
              </Box>
              <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="10px"
            >
              <VStack>
                <Button onClick={handleMint}>
                  Mint it now
                </Button>
                <Input
                  placeholder="Mint Message"
                  maxLength={20}
                  onChange={handleMintInput}
                  w="140px"
                />
              </VStack>
            </Box>
            </HStack>
          </>
        ) : (
          <>
            <Text>Contract not deployed to the blockchain</Text>
          </>
        )}
      </VStack>
    </>
  );
};

export default ContractPage;
