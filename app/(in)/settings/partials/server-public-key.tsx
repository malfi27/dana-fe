'use client'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from 'ui'
import { useCopyText } from '@/hooks/use-copy-text'

export function ServerPublicKey() {
  const { copyText } = useCopyText()
  const publicKey = `ssh-rsa maiey1kSoFgqwSr3LLqWfxua3PbYKzfCkNeImdzCGzz62ygKtmLdlLKPZHHRPe5dNmggXBCxARYaTB9tEhpaNj4j18pJkGRU7QsWDdUKjkN6EU74j0TpcitnCaLQxKdkOKpQaZ8YKVm5q1BfPEZy6wM2xfiQ0fAc4UtL06kn0fb4I1eUS1iqNiYTwflWHqbtzigQXhladlD2EmncoztKKwW8ECtUZBHI6KfYBDrmDFioXWiDsTNMM9hiSwsNOcH0GkOzFPLqEVKVtkZbALPKBKktYFODQ4zLDWgS7B1vWFlx6rJWCmIH6rlWSvbW5fSMBISs6GnXP0OFGSx6mgCeOUpkdber79MjOvmaouYNEUuep1fQNg6tnAPeLzUUrFKiUnxioVOqOE4dK6l3QgtSNrDgomqnzgyEM9YyEZN9OXQ1WnaRKKj1z6bITHeidl40YlpxafxmvHpwJhVdmOjt960gqxKfHnS5JG6iQRwwLD5ebS6ZKTO97fQcimHgwwFlgVBjir4iHFjvjsvwED0CmPlMCZ2wPnuKdCUZ8MXDf5z0sIWIYiHgQetFFDjVVaMMFlhrB16hUzgmSHvQd5yiuv82S2WGs0GIaRfRQRP5c20umBosv08FJHE5iKiSUcq7jfXH02wQaxs2fB1LiPk8wSaffVKwT8mSBJu7IhlAO7o0ZsjdmGAXxEYmdIVQUYKrP7J6NTdABadCP3625rX57fIyw95mrm7m2JWxDYcqD2e6v6QjEbZvOTCBO7DZOkBhbD0QhcrFi2QweF20VEslJo2GaJBYYegIsDacbAgpbBs70kcnHM2aYPiS7cWMdMqjcAo2w58vqDDIT9mA1Mup2G0UwLADQZd7pp10ohtueH5XI2NLxa5JgiV0WxtGbhcrOK8Hg20p17Xjt5eu8pdTyAyA0IgATxfo4Vdhp7AcWmPhzyFq717Khl9wkPsgUijiupJHwAr7UxoR6Fdgrozw8j0xe7GyCtzziH4ilgJZ24AJWIheTc61idPzJGpjCA2F8f0UlP0G0BGu5XQgqffGgSuflbcFajTD436ythi80G2YFoYuLz8ccgyz1SpIPlYB6mYcbLz0KSNM8IVr7ZSyCHRXxLpQjE9krFhazm30yntbVZkmpPhtKeRyqDJqutIXKvWwA17NsRxQB9MPu5V9A6ayjiM47y9c1UPRLve88s2upDTatwA2ulqkwVNU4UZZKwyVw0MJFRznoFk5yMgLFYFws9wxdEpcHG2dWJAITDtx2Ka8z0GpPslWu3dHey5PdooyEHfxYj= root@server`
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server's Public Key</CardTitle>
        <CardDescription>
          Typically, this key will automatically be added to GitHub, GitLab and
          Bitbucket. However, if you need to add it to a source control service
          manually, you may copy it from here.
        </CardDescription>
      </CardHeader>
      <Form onSubmit={() => {}}>
        <CardContent>
          <Tooltip>
            <TooltipTrigger
              onPress={() => copyText(publicKey)}
              className="whitespace-pre-wrap break-all rounded-md border bg-zinc-900 p-6 text-left font-mono text-xs text-white"
            >
              {publicKey}
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to copy</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
        <CardFooter>
          <Button intent="danger">Regenerate Key</Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
