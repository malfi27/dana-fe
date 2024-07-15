'use client'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Form,
  Note,
  NoteDescription,
  NoteTitle,
  SectionTitle
} from 'ui'
import { useState } from 'react'
import QRCode from 'react-qr-code'

export function TwoFactorAuthentication() {
  const [enable, setEnable] = useState(false)
  return (
    <Card id="tfa">
      <SectionTitle
        title="Two-Factor Authentication"
        description="Two-factor authentication (2FA) is a way to add additional security to your account. You will be asked for a
                        verification code when you log in."
      />
      <Form onSubmit={() => {}}>
        <CardContent>
          {enable ? (
            <>
              <div className="flex flex-col items-start gap-6 md:flex-row">
                <QRCode
                  className="rounded-md border p-4"
                  size={180}
                  value="https:af/dadsffajk"
                />
                <div className="whitespace-pre-wrap break-all rounded border bg-background p-4 font-mono text-sm shadow-sm">
                  {`3992 3992 3992 3992
3992 3992 3992 3992
3992 3992 3992 3992
4234 4234 4234 4234
3992 3992 3992 3992
3992 3992 3992 3992
3012 3012 3012 3012`}
                </div>
              </div>
            </>
          ) : (
            <Note intent="warning">
              <NoteTitle>Account Not Protected</NoteTitle>
              <NoteDescription>
                You do not have two-factor authentication enabled. Two-factor
                authentication enhances the security of your account. You will
                be asked to enter a
              </NoteDescription>
            </Note>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between gap-1 sm:flex-row">
          <Button className="w-full sm:w-auto">Show Recovery Codes</Button>
          <Button
            onPress={() => setEnable(!enable)}
            intent={enable ? 'danger' : 'success'}
            className="w-full sm:w-auto"
          >
            {enable
              ? 'Disable Two Factor Authentication'
              : 'Enable Two Factor Authentication'}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  )
}
