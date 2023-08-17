'use client'

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  
  Icon,
  Select,
} from '@chakra-ui/react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useToast } from "@chakra-ui/react";
import {useDispatch,useSelector} from 'react-redux'
import { loginuser } from '../redux/login/action';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
]

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '25vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="540px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  )
}

export default function JoinOurTeam() {
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
 const navigate=useNavigate()
  const toast = useToast();
  const dispatch=useDispatch()
  const {loading,message}=useSelector((store)=>store.user)
 
  const handleSubmit=()=>{
    if(username!=="" && password!=="" ){
      dispatch(loginuser(username,password)).then((res)=>{
        console.log(res)
        if(res.message==="Invalid username or password"){
          toast({
            title: "Invalid username or password" ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
        }else if(res.message==="Invalid username or password,Please Register first"){
          toast({
            title: "No user found, kindly Register " ,
        
            status: "error",
            duration: 3000,
            isClosable: true,
         });
        }
        else {
          toast({
            title: "Login Successful" ,
             status: "success",
            duration: 3000,
            isClosable: true,
         });
         localStorage.setItem("token",res.token)
         localStorage.setItem("role",res.role)
         localStorage.setItem("user",res.uniqueuser)
         if(res.role==="buyer"){
            navigate("/buyer")
         }else  if(res.role==="seller"){
            navigate("/seller")
         }
        }
       
      
       
      })
    }else{
      toast({
        title: "Enter all fields" ,
    
        status: "error",
        duration: 1500,
        isClosable: true,
     });
     setPassword("")
    }
   
   
  }
 
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Buy Anything from {' '}
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
             Vending Machine
            </Text>{' '}
           and Enjoy 
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Login & Enjoy
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
             We're here to provie you the services to sell your item to local customers and for consumer , they can buy that 
             item very easily.
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
               type={"text"}
                placeholder="Username/Email"
                value={username}
                bg={'gray.100'}
                border={0}
                color={'black'}
                fontWeight='bold'
                
                _placeholder={{
                  color: 'gray.500',
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
               type={"password"}
                placeholder="Password"
                value={password}
                bg={'gray.100'}
                border={0}
                color={'black'}
                fontWeight='bold'
                _placeholder={{
                  color: 'gray.500',
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            
<Flex justifyContent={'center'}  paddingTop={'10px'}> <Text as={'h1'}>New User {" "}</Text><Link to="/"><Text color={'pink.600'} fontWeight={'bold'}>Register Now</Text></Link></Flex>
             
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              disabled={loading}
              onClick={handleSubmit}
              >
              {loading?"Wait...":"Login"}
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(70px)' }} />
    </Box>
  )
}