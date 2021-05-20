const users = ['Кирилл', 'Марк'];

const UsersBlock = () => {
    const listUsers = users.map((user, i) =>
        <span key={`user${i}`}>{user}</span>
    );

    return (
        <div className="wrapper__users">
            {listUsers}
        </div>
    )
} 

export default UsersBlock;