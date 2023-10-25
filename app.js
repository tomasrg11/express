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
    user:'root',
    password:'',
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

app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});
