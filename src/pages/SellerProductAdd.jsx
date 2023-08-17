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
import { IconType } from 'react-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const adminUsername=localStorage.getItem('user')

const LinkItems = [
    { name: 'Home',href:"/seller", icon: FiHome },
    { name: 'Add Products',href:"/seller/add_product", icon: FiTrendingUp },
    { name: 'Orders',href:"/seller/order", icon: FiStar },
    
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
          Seller Dashboard
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

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate=useNavigate()
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
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
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
                    Admin
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

const SellerProductAdd = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const[productname,setProductName]=useState("")
  const[cost,setCost]=useState("")
  const[quantity,setQuantity]=useState("")
  const toast = useToast();
  const token = localStorage.getItem("token");
  const handleAddProduct=()=>{
     console.log(productname,cost,quantity)
     if(productname!=="" && cost!=="" && quantity!==""){
        const productData = {
            productName:productname,
            cost,
            amountAvailable:quantity
          };
        fetch(`http://localhost:8080/api/prod/products`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(productData)
      })
        .then((res) => res.json())
        .then((res) => {
            if(res.message==="Product added successfully"){
                toast({
                    title: "Product Added Succssfully" ,
                
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                 });
            }
        })
       
         setProductName("")
     setCost("")
     setQuantity("")
     }else{
        toast({
            title: "Enter all fields " ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
     }
     
  }
   

 
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="50" >
          <Box margin={'auto'} padding={'10px'} borderRadius={'20px'} backgroundColor={'white'} width={'500px'} height={'500px'}>
           <Text as={'h1'} fontSize={'5xl'} fontWeight={'bold'} textAlign={'center'}>Add Products</Text>
           <Input marginTop={'20px'} type='text' value={productname} onChange={(e)=>setProductName(e.target.value)} placeholder='Product Name' size='lg' />
           <Input marginTop={'20px'} type='number' value={cost} onChange={(e)=>setCost(e.target.value)} placeholder='Cost' size='lg' />
           <Input marginTop={'20px'} type='number' value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder='Quantity' size='lg' />
           <Button  marginTop={'20px'} bg={'pink.600'} color={'white'} onClick={handleAddProduct}>Add Product</Button>
              
          </Box>
      </Box>
    </Box>
  )
}

export default SellerProductAdd