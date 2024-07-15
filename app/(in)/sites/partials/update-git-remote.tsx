'use client'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Note,
  NoteDescription,
  NoteTitle,
  TextField
} from 'ui'

export function UpdateGitRemote() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Git Remote</CardTitle>
      </CardHeader>
      <CardContent>
        <Note intent="warning">
          <NoteTitle>Git remote URL</NoteTitle>
          <NoteDescription>
            You should not use this function to install an entirely different
            project onto this site. If you would like to install an entirely
            different project, you should completely uninstall the existing
            repository using the "Uninstall Repository" button below.
          </NoteDescription>
        </Note>
        <div className="mt-4 space-y-1">
          <TextField
            label="Git remote URL"
            placeholder="https://github.com/irsyadadl/example.com"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Update Git Remote</Button>
      </CardFooter>
    </Card>
  )
}
