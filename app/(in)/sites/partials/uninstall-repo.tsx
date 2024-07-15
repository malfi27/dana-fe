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
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  TextField
} from 'ui'

export function UninstallRepo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uninstall Repository</CardTitle>
        <CardDescription>@irsyadadl/provision</CardDescription>
      </CardHeader>
      <CardContent>
        Uninstalling a repository will reset the site back to its original
        state, which shows Forge's default site page. All files in the site's
        directory will be removed.
      </CardContent>
      <CardFooter className="justify-start">
        <Modal>
          <Button intent="danger">Uninstall Repository</Button>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Uninstall Repository</ModalTitle>
                <ModalDescription>
                  Are you sure you want to uninstall the repository?
                </ModalDescription>
              </ModalHeader>
              <Form>
                <ModalBody>
                  <TextField label="Type the name of the repository to uninstall" />
                </ModalBody>
                <ModalFooter>
                  <ModalClose>Cancel</ModalClose>
                  <Button type="submit" intent="danger" isDisabled>
                    Uninstall
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </CardFooter>
    </Card>
  )
}
