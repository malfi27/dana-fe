'use client'

import {
  Button,
  Checkbox,
  CheckboxGroup,
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
  Select,
  SelectItem,
  TextField
} from 'ui'
import { IconCirclePlusFill, IconGlobe } from '@irsyadadl/paranoid'

export function CreateSite() {
  return (
    <Modal>
      <Button className="ml-auto">
        <IconCirclePlusFill />
        New Site
      </Button>
      <ModalOverlay isKeyboardDismissDisabled isDismissable={false}>
        <ModalContent size="4xl">
          <Form>
            <ModalHeader>
              <ModalTitle>Create New Site</ModalTitle>
              <ModalDescription>
                Let's create a new site for your website.
              </ModalDescription>
            </ModalHeader>
            <ModalBody>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField
                  isRequired
                  prefix={<IconGlobe />}
                  label="Root Domain"
                  placeholder="irsyad.co"
                />
                <TextField
                  isRequired
                  label="Aliases"
                  placeholder="blog.parsinta.com, dashboard.parsinta.com"
                />
                <Select isRequired label="Project Type">
                  <SelectItem id="pls">PHP / Laravel / Symfony</SelectItem>
                  <SelectItem id="sh">Static HTML</SelectItem>
                  <SelectItem id="n-o-n">Next.js / Nuxt.js</SelectItem>
                </Select>

                <TextField
                  isRequired
                  label="Web Directory"
                  placeholder="/"
                  defaultValue="/"
                />
                <Select isRequired label="Nginx Template">
                  <SelectItem id="default">Default</SelectItem>
                  <SelectItem id="laravel">Laravel</SelectItem>
                  <SelectItem id="next.js">Next.js</SelectItem>
                  <SelectItem id="nuxt.js">Nuxt.js</SelectItem>
                </Select>
                <CheckboxGroup
                  className="mt-1"
                  description="Some additional information about the site"
                  label="Settings"
                >
                  <Checkbox value="wsd">Allow Wildcard Sub-Domains</Checkbox>
                  <Checkbox value="wi">Use Website Isolation</Checkbox>
                  <Checkbox value="cd">Create database</Checkbox>
                </CheckboxGroup>
              </div>
            </ModalBody>

            <ModalFooter>
              <ModalClose>Cancel</ModalClose>
              <Button type="submit">Create Site</Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
