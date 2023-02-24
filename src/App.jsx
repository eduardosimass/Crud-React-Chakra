import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { Box, Flex, Button, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComponents";



const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setdataEdit] = useState([]);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem('db_costumer')
      ? JSON.parse(localStorage.getItem('db_costumer'))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    const newArray = data.filter((item) => item.email !== email);

    setData(newArray);
    localStorage.setItem("cad_cliente", JSON.stringify(newArray));

  };



  return (
  <Flex
    h="100vh"
    aling="center"
    justify="center"
    fontSize="20px"
    fontFamily="poppins">
    <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
      <Button colorScheme="blue" onClick={() => [setdataEdit({}), onOpen()]}>
        Novo Cadastro
      </Button>
      <Box overflowY="auto" height="100%">
        <Table mt="6">
          <Thead>
            <Tr>
              <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                Nome
              </Th>
              <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                Email
              </Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({ name, email }, index) => (
              <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }} >
                <Td maxW={isMobile ? 5 : 100} >{name}</Td>
                <Td maxW={isMobile ? 5 : 100} >{email}</Td>
                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => {
                      setdataEdit({ name, email, index }),
                        onOpen()
                    }} />
                </Td>
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleRemove(email)} />
                </Td>
              </Tr>

            ))}
          </Tbody>

        </Table>
      </Box>
    </Box>
    {isOpen && (
      <ModalComp
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        setData={setData}
        dataEdit={dataEdit}
        setDataEdit={setdataEdit}

      />


    )}

  </Flex>
  );
};

export default App
