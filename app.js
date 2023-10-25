let express= require('express');
let mysql = require('mysql');
let app = express();

app.listen('3000',function(){
    console.log('Servidor ok');
})

app.get('/', function(req,res){
    res.send('Ruta INICIO');
})

//crear 
//objeto de la conexion--  se establecen los parámetros
let conexion = mysql.createConnection({
    host:'localhost',
    user:'tomramirezg11',
    password:'tomasramirez2006',
    database:'articulosdb'
});
// Probar la conexión
conexion.connect(function(error){
   if(error){
       throw error;
   } else{
       console.log('Conexión exitosa');
   }
});

//mostrar todos los articulos
app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

//mostrar un articulo
app.get('/api/artículos/:id', (req,res)=>{
    conexion.query('SELECT * FROM artículos WHERE id=?', [req.params.id] , (error,fila)=>{
        if(error){
            throw error;
        }else{
           res.send(fila[0].descripción);
        }
    });
});

//metodo crear un articulo
app.post('/api/articulos',(req,res)=>{
    let data = {id:req.body.id, descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, function(error,results){
        if(error){
            throw error;
        }else{
           res.send(results);     
        }
    });
});
