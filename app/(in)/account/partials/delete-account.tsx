'use client'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Form,
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  SectionTitle
} from 'ui'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { wait } from '@/lib/utils'

export function DeleteAccount() {
  const router = useRouter()
  return (
    <Card id="delete-account">
      <SectionTitle
        title="Delete Account"
        description="Permanently delete your account"
      />
      <Form onSubmit={() => {}}>
        <CardContent>
          This will cancel your subscription and delete all of your account's
          data. Your data will not be recoverable; however, your servers will be
          preserved.
        </CardContent>
        <CardFooter>
          <Modal>
            <Button intent="danger">Delete Account</Button>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Are you absolutely sure?</ModalTitle>
                  <ModalDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </ModalDescription>
                </ModalHeader>
                <ModalFooter>
                  <ModalClose>Cancel</ModalClose>
                  <Button
                    intent="danger"
                    onPress={() => {
                      toast.promise(wait(2000), {
                        loading: 'Deleting account...',
                        success: 'Account deleted.',
                        error: 'Failed to delete account.',
                        finally: () => {
                          router.replace('/login')
                        }
                      })
                    }}
                  >
                    Continue
                  </Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </CardFooter>
      </Form>
    </Card>
  )
}
