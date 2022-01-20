//----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------CONEXION Y CONFIGURACION-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

//Variable para conexion
let connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    port: 3306,
    database : 'sprint1' 
});

//Generar conexion mysql
connection.connect(function(err:any) {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    else{
        console.log('Conexion establecida ' + connection.threadId);
    }    
});

//create application/json parser
var jsonParser = bodyParser.json()
 
//create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Generar conexion postman
const configuracion ={
    hostname: "127.0.0.1",
    port: 3000,
}    

app.use(cors());
//app.listen(configuracion.port);



//--------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------CRUD------------------------------------------------------------//
//--------------------------------------CREATE (post), READ (get), UPDATE (put, path), DELETE (delete)----------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//






//----------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------METODOS MARCAS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//MOSTRAR TODAS LAS MARCAS
app.get('/marca/mostrarTodas',(req:any,res:any)=>{
    let qr = `select * from marcas`;
    connection.query(qr,(err:any,result:any,field:any)=>{
        if(err){
            console.log(err,'Problema al mostrar');
        }
        if(result.length>0){
            res.send({
                message:'Todas las marcas',
                data:result
            })
        }
    })
})

//MOSTRAR UNA MARCA
app.get('/marca/mostrarUna',jsonParser,async(req:any,res:any)=>{
    let nombre = req.body.nombre;
    await connection.query("select nombre, fechaCreacion, fechaActualizacion from marcas where nombre = ?", [nombre], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al mostrar');
        }
        if(result.length>0){
            res.send({
                message:'Datos de la marca',data:result
            })
        }
    })
})


//EDITAR MARCA
app.put('/marca/editar/:id',jsonParser, async(req:any,res:any)=>{
    let id = req.params.id;
    let nombre = req.body.nombre;

    await connection.query("update marcas set nombre=?, fechaActualizacion=now() where nombre = ?", [nombre, id], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al actualizar');
        }
        if(result =! null){
            res.send({
                message:'Datos de la marca modificados con exito'
            })
        }
    })
})

//ELIMINAR MARCA
app.delete('/marca/eliminar/:idMarca',jsonParser, async(req:any,res:any)=>{
    let idMarca = req.params.idMarca;
    await connection.query("select count(nombreMarca) from productos where nombreMarca = ?", [idMarca], function(err:any,result:any,field:any) {

        if (`${JSON.stringify(result)}` == '[{"count(nombreMarca)":0}]'){
            connection.query("delete from marcas where nombre = ?", [idMarca], function(err:any,result:any,field:any) {
                if(err){
                    console.log(err,'Problema al eliminar');
                    throw err;
                }
                if(result =! null){
                    res.send({
                        message:'Marca eliminada con exito'
                    })
                }
            })
        }
        else {
            console.log("No se puede eliminar la marca. Elimine los productos asociados primero");
        }        
    })
})

/*
//ELIMINAR MARCA
app.delete('/marca/eliminar/:nombre',jsonParser, async(req:any,res:any)=>{
    let nombre = req.params.nombre;

    await connection.query("delete from marcas where nombre = ?", [nombre], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al eliminar');
        }
        if(result =! null){
            res.send({
                message:'Marca eliminada con exito'
            })
        }
    })
})

//VER SI EXISTEN PRODUCTOS POR MARCA
app.get('/marca/obtenerProductos/:idMarca',jsonParser, async(req:any,res:any) => {                                        
    let idMarca = req.params.idMarca;
    await connection.query("select count(nombreMarca) from productos where nombreMarca = ?", [idMarca], function(err:any,result:any,field:any) {

        if (`${JSON.stringify(result)}` == '[{"count(nombreMarca)":0}]'){
            console.log("detecto que era 0");
            console.log("res if:" + res.json(result));
            //res.json(result);
            //console.log("func obj values normal: " + Object.values(res));
            //console.log("func obj values con.json: " + Object.values(res.json(result)));
            res = 1;
        }
        else {
            console.log("detecto que era distinto de 0");
            console.log("res else:" + res.json(result));

        }        
    })
})
*/

//CREAR MARCA
app.post('/marca/agregar',jsonParser, async(req:any,res:any)=>{
    let nombre = req.body.nombre;
    await connection.query("insert into marcas set nombre=?, fechaCreacion=now(), fechaActualizacion=now()", [nombre], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al crear');
        }
        if(result =! null){
            res.send({
                message:'Marca agregada con axito'
            })
        }
    })
})



//----------------------------------------------------------------------------------------------------------------------//
//------------------------------------------METODOS PRODUCTOS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//MOSTRAR TODOS LOS PRODUCTOS
app.get('/producto/mostrarTodos',(req:any,res:any)=>{
    let qr = `select * from productos`;
    connection.query(qr,(err:any,result:any,field:any)=>{
        if(err){
            console.log(err,'Problema al mostrar');
        }
        if(result.length>0){
            res.send({
                message:'Datos de todos los productos',
                data:result
            })
        }
    })
})

//MOSTRAR UN PRODUCTO
app.get('/producto/mostrarUno',jsonParser,async(req:any,res:any)=>{
    let id = req.body.id;
    await connection.query("select nombre, valor, fechaCreacion, fechaActualizacion, estado, nombreMarca from productos where id = ?", [id], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al mostrar');
        }
        if(result.length>0){
            res.send({
                message:'Datos del producto',data:result
            })
        }
    })
})

//EDITAR PRODUCTO
app.put('/producto/editar/:id',jsonParser, async(req:any,res:any)=>{
    let id = req.params.id;
    let nombre = req.body.nombre;
    let valor = req.body.valor;
    let estado = req.body.estado;
    let nombreMarca = req.body.nombreMarca;

    await connection.query("update productos set nombre=?, valor=?, fechaActualizacion=now(), estado=?, nombreMarca=? where id = ?", [nombre, valor, estado, nombreMarca,  id], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al actualizar');
        }
        if(result =! null){
            res.send({
                message:'Datos del producto modificados con exito'
            })
        }
    })
})

//ELIMINAR PRODUCTO
app.delete('/producto/eliminar/:id',jsonParser, async(req:any,res:any)=>{
    let id = req.params.id;

    await connection.query("delete from productos where id = ?", [id], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al eliminar');
        }
        if(result =! null){
            res.send({
                message:'Producto eliminado con exito'
            })
        }
    })
})

//CREAR PRODUCTO
app.post('/producto/agregar',jsonParser, async(req:any,res:any)=>{
    let nombre = req.body.nombre;
    let valor = req.body.valor;
    let estado = req.body.estado;
    let nombreMarca = req.body.nombreMarca;

    await connection.query("insert into productos set nombre=?, valor=?, fechaCreacion=now(), fechaActualizacion=now(), estado=?, nombreMarca=?", [nombre, valor, estado, nombreMarca], function(err:any,result:any,field:any) {
        if(err){
            console.log(err,'Problema al crear');
        }
        if(result =! null){
            res.send({
                message:'Producto agregado con axito'
            })
        }
    })
})



//----------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------*OTROS--------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//

//LISTEN
app.listen(configuracion, () => {
    console.log(`Conectando al servidor http://localhost:${configuracion.port}`)
})



/*
//EJEMPLO BORRADO CASCADA - A LA MALA - POR LA RAZON O LA FUERZA
app.delete('/marca/eliminar/:nombre',jsonParser, async(req:any,res:any)=>{
    let nombre = req.params.nombre;

    await connection.query("delete from productos where nombreMarca = ?", [nombre], function(err:any,result:any,field:any) {
        connection.query("delete from marcas where nombre = ?", [nombre], function(err:any,result:any,field:any) {
            if(err){
                console.log(err,'Problema al eliminar');
            }
            if(result =! null){
                res.send({
                    message:'Marca (y productos asociados) eliminada con exito'
                })
            }
        })
    })
})
*/



/*  1. Como utilizar el editarProducto sin actualizar la pagina
    2. Como enviar parametros entre componentes. Lo intentamos añadiendolo a la ruta y como parametro dentro del llamado a los metodos pero no nos funciono. Usamos editar y mostrar en un componente para solucionarlo.
    3. Autocompletar los option en un select, con los datos de una BD, dejando como PRIMERA OPCION el que tenia y sin que se caiga SI NO REALIZA CAMBIOS
    4. 
*/