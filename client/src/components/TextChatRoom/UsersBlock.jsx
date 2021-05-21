// const users = ['Кирилл', 'Марк'];

const UsersBlock = ( { users } ) => {
    // console.log('users', users)

    // const listUsers = users.map((user, i) =>
    //     <span key={`user${i}`}>{user}</span>
    // );

    return (
        <div className="wrapper__users">
            <span className="users__count">Online: {users.length} user(s)</span>
            { users.map((user, i) =>
                <span key={`user${i}`}> {user} </span>
            )}
        </div>
    )
} 

export default UsersBlock;