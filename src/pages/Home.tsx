import { useMutation, useQuery } from 'urql'
import { GetUsersDocument, AddUsersDocument, type GetUsersQuery } from "../graphql/generated"
import UserDisplay from "../components/UserDisplay"
import { useEffect, useState } from 'react'
import type { Route } from "./+types/Home"

export default function Home(args: Route.ComponentProps) {
  console.log("args.actionData: ", args.actionData)
  const [getUsersResult] = useQuery({ query: GetUsersDocument })
  const [addUserResult] = useMutation(AddUsersDocument)
  // const [addUserResult, addUser] = useMutation(AddUsersDocument)
  const [users, setUser] = useState<GetUsersQuery["users"]>([])

  // Initialize users once
  useEffect(() => {
    const users = getUsersResult.data?.users;
    if (users) setUser([...users])

  }, [getUsersResult.data?.users])

  // Append new user when mutation completes
  useEffect(() => {
    const newUser = addUserResult.data?.addUsers
    if (newUser) setUser((prev) => [...(prev ?? []), newUser])

  }, [addUserResult.data?.addUsers])

  // const refresh = () => {
  //   // Re-execute the query with a network-only policy, skipping the cache
  //   // getUsers({ requestPolicy: 'network-only' });
  // };

  // const handleSubmit = () => {
  //   addUser({ name: "Naruto" }).then(result => {
  //     if (result.error)
  //       return console.error(`${result.error}`)
  //   })
  // }

  function PageContent() {
    if ((getUsersResult.fetching || addUserResult.fetching) && (!getUsersResult.error || !addUserResult.error)) return <p>Loading...</p>
    if (getUsersResult.error || addUserResult.error) return <p>{`error.message sdfsdffsdf`}</p>

    if (users)
      return <>
        {users.map((user, i) => <UserDisplay user={user} key={i} />)}
        {/* <button onClick={handleSubmit}>Add Sakura</button> */}
      </>
  }

  return (
    <div className="bg-zinc-800 flex-col h-screen w-full flex items-center justify-center p-4 gap-y-12 overflow-scroll">
      <PageContent />
    </div>
  )
}