const { Pool } = require('pg')

const pool = new Pool({
host: 'localhost',
user: 'postgres',
password: 'postgres',
 database: 'Registro_ul3l', 
 allowExitOnIdle: true
})

    //Insertar datos desde el backend a la base de datos
    const agregarPosts = async(post) => {
        const values = Object.values(post);
        const consulta = "insert into posts values (DEFAULT, $1, $2, $3)"
        const result = await pool.query(consulta, values)
        return result
    };
        //Obteniendo registros de PostgreSQL desde Node
        const obtenerPosts = async () => {
            const { rows } = await pool.query("SELECT * FROM posts")
            console.log(rows)
            return rows
            }
            obtenerPosts()

            const likePosts = async (id) => {
                const result = await pool.query(
                 "UPDATE posts SET likes = likes + 1 WHERE id =$1",
                [id]
                );
                return result.rows;
             };
             
             const eliminarPosts = async (id) => {
                 const { rows } = await pool.query(
                  "DELETE FROM posts WHERE id = $1",
                 [id]
                 );
                 return rows;
              };

            module.exports = { agregarPosts, obtenerPosts, likePosts, eliminarPosts }