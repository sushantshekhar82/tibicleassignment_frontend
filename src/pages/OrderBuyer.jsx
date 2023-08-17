'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Input,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const adminUsername=localStorage.getItem('user')

const LinkItems = [
  { name: 'Home',href:"/buyer", icon: FiHome },
  { name: 'Deposit Money',href:"/buyer/deposit", icon: FiTrendingUp },
  { name: 'Order',href:"/buyer/order",icon: FiStar}
  
]

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="19px" fontFamily="monospace" fontWeight="bold">
          Buyer Dashboard
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link to={link.href}>
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
        </Link>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen,...rest }) => {
  const navigate=useNavigate()
  const adminUsername=localStorage.getItem('user')
  const handleSignOut=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("user")
    
    navigate("/login")
  }


     
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Buyer Dashboard
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Button bg={'pink.600'} color={'white'}>Rs:{rest.deposit}</Button>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{adminUsername}</Text>
                  <Text fontSize="xs" color="gray.600">
                   
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const OrderBuyer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products,setProducts]=useState([])
  const token=localStorage.getItem("token")
  const id=localStorage.getItem("userid")
  
  const[productname,setProductName]=useState("")
  const[cost,setCost]=useState("")
  const[quantity,setQuantity]=useState("")
  const toast = useToast();
  const [count,setCount]=useState(0)
  const [loading,setLoading]=useState(false)
 const [activeid,setActiveId]=useState("")
const [deposit,setDeposit]=useState(0)
const [amount, setAmount] = useState("");

const handleDeposit = async () => {
   
    if(amount==5||amount==10||amount==20||amount==50||amount==100){
        try {
  
            await axios.post(`https://wild-puce-basket-clam-boot.cyclic.cloud/api/vending-machine/deposit`, { coins: [parseInt(amount)] }, {
              headers: {
                Authorization: `${localStorage.getItem("token")}`
              }
            });
            toast({
                title: "Deposit Successfully" ,
            
                status: "success",
                duration: 3000,
                isClosable: true,
             });
           setCount(count+1)
            setAmount('');
          } catch (error) {
            console.error(error);
          }
    }else{
        toast({
            title: "We don't accept this amount" ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
    }
 
}
 useEffect(()=>{
  fetch(`https://wild-puce-basket-clam-boot.cyclic.cloud/api/vending-machine/purchase-history`,{
    headers: {
      Authorization: `${localStorage.getItem("token")}`
    }
  })
      .then((res) => res.json())
      .then((res) => {
       
         setProducts(res)
        
      })
      fetch(`  https://wild-puce-basket-clam-boot.cyclic.cloud/api/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
     
         setDeposit(res.deposit)
        
      })
    },[token,count])


      
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} deposit={deposit} />
      <Box ml={{ base: 0, md: 60 }} p="4">
      
      <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>All Products</TableCaption>
    <Thead>
      <Tr>
        <Th>Product Name</Th>
        <Th>Quantity</Th>
        <Th>Purchase Date</Th>
        
      </Tr>
    </Thead>
    <Tbody>
    {
       products.map((el)=>(
          <Tr>
          <Td>{el.productName}</Td>
          <Td>{el.quantity}</Td>
          <Td>{el.purchaseDate}</Td>
         
        </Tr>
        ))
      }
   
      </Tbody>
      </Table>
      </TableContainer>
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           
         he
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default OrderBuyer