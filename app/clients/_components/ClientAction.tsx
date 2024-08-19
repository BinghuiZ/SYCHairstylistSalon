'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import ClientNewForm from './ClientNewForm'

const ClientAction = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value)
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const params = new URLSearchParams(searchParams)
      params.set('q', inputValue)
      router.push(`/clients?${params.toString()}`)
    }
  }

  return (
    <Flex justify='between'>
      <TextField.Root
        placeholder='Search the clients…'
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height='16' width='16' />
        </TextField.Slot>
      </TextField.Root>
      <ClientNewForm />
    </Flex>
  )
}

export default ClientAction
