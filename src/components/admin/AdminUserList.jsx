const AdminUserList = ({ users, loading, error }) => {
  if (error) {
    return <p>{error}</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  // console.log(users)
  // todo: remove

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  )
}
export default AdminUserList
