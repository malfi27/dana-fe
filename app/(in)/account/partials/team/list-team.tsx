'use client'

import { useGetAllUsers } from '@/app/api/auth/get-all-user'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Menu,
  MenuContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@/components/ui'
import { IconDotsVertical, IconTrash } from '@irsyadadl/paranoid'
import { CreateUsers } from './create-user'

export const ListTeam = () => {
  //Get list group
  const { data, isLoading, refetch } = useGetAllUsers()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Teams</CardTitle>
          <CardDescription>
            Manage your team to make your work easier and more efficient.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 p-4">
            {/* Filter */}
            <div className="flex items-end justify-between gap-x-2">
              <div className="hidden gap-2 lg:flex"></div>
              <div className="flex gap-2">
                {/* <SearchField
                  aria-label="Search sites"
                  placeholder="Search..."
                  className="w-full lg:max-w-52"
                    onChange={(e) => {
                      wait(500).then(() => {
                        setState({ ...state, search: e })
                      })
                    }}
                /> */}
                <CreateUsers refetch={refetch} />
              </div>
            </div>
            {/* Table */}
            <div className="overflow-hidden rounded-md border bg-background">
              <Table
                aria-label="transaction"
                selectionMode="none"
                aria-describedby="transaction"
                aria-labelledby="transaction"
              >
                <TableHeader>
                  <TableColumn className={`text-nowrap`}>Name</TableColumn>
                  <TableColumn className={`text-nowrap`}>Username</TableColumn>
                  <TableColumn className={`text-nowrap`}>Email</TableColumn>
                  <TableColumn className={`text-nowrap`}>Roles</TableColumn>
                  <TableColumn className={`text-nowrap`}></TableColumn>
                </TableHeader>
                <TableBody
                  renderEmptyState={() => (
                    <div className="p-2 text-center">No data found.</div>
                  )}
                  items={data?.data}
                >
                  {isLoading ? (
                    <TableRow>
                      <TableCell>Searching Data...</TableCell>
                    </TableRow>
                  ) : (
                    (item: any) => {
                      return (
                        <TableRow id={item?._id}>
                          <TableCell>{item?.name ? item?.name : '-'}</TableCell>
                          <TableCell>
                            {item?.username ? item?.username : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.email ? item?.email : '-'}
                          </TableCell>
                          <TableCell>
                            {item?.roles ? item?.roles?.name : '-'}
                          </TableCell>

                          <TableCell className="flex justify-end">
                            <Menu>
                              <Button
                                className="ml-auto h-8 w-6"
                                appearance="plain"
                                size="square-petite"
                              >
                                <IconDotsVertical />
                              </Button>
                              <MenuContent placement="left top">
                                <MenuItem onAction={() => {}} isDanger>
                                  <IconTrash />
                                  Delete Users
                                </MenuItem>
                              </MenuContent>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      )
                    }
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
