const [shouldFetch, setShouldFetch] = useState(true); // Controla cuándo obtener la lista de usuarios

useEffect(() => {
    const fetchUsers = async () => {
        const fetchedUsers: ICreateUserResponse[] = [];
        const range = 2; // Rango de IDs de usuario a consultar

        for (let id = 1; id <= range; id++) {
            try {
                const result = await fetch(`/create-user-back/${id}`);
                if (result.ok) {
                    const user: ICreateUserResponse = await result.json();
                    fetchedUsers.push(user); // Añade cada usuario al array
                }
            } catch (error) {
                console.error(`Error fetching user with ID ${id}:`, error);
            }
        }
        setUsers(fetchedUsers); // Guarda todos los usuarios en el estado
        setShouldFetch(false); // Desactiva el fetch hasta la próxima actualización
    };

    if (shouldFetch) {
        fetchUsers();
    }
}, [shouldFetch]); // Ejecuta cuando shouldFetch cambia a true

const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/');
};

const handleDelete = async (idUsuario: number) => {
    const response = await fetch(`/create-user-back/${idUsuario}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        }
    });

    if (response.ok) {
        setShouldFetch(true); // Activa el fetch para actualizar la lista de usuarios
    } else {
        console.error('Error eliminando el usuario');
    }
};