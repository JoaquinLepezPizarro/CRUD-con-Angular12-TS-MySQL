"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------CONEXION Y CONFIGURACION-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
//Variable para conexion
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'sprint1'
});
//Generar conexion mysql
connection.connect(function (err) {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    else {
        console.log('Conexion establecida ' + connection.threadId);
    }
});
//create application/json parser
var jsonParser = bodyParser.json();
//create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Generar conexion postman
var configuracion = {
    hostname: "127.0.0.1",
    port: 3000,
};
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
app.get('/marca/mostrarTodas', function (req, res) {
    var qr = "select * from marcas";
    connection.query(qr, function (err, result, field) {
        if (err) {
            console.log(err, 'Problema al mostrar');
        }
        if (result.length > 0) {
            res.send({
                message: 'Todas las marcas',
                data: result
            });
        }
    });
});
//MOSTRAR UNA MARCA
app.get('/marca/mostrarUna', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nombre = req.body.nombre;
                return [4 /*yield*/, connection.query("select nombre, fechaCreacion, fechaActualizacion from marcas where nombre = ?", [nombre], function (err, result, field) {
                        if (err) {
                            console.log(err, 'Problema al mostrar');
                        }
                        if (result.length > 0) {
                            res.send({
                                message: 'Datos de la marca', data: result
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//EDITAR MARCA
app.put('/marca/editar/:id', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, nombre;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                nombre = req.body.nombre;
                return [4 /*yield*/, connection.query("update marcas set nombre=?, fechaActualizacion=now() where nombre = ?", [nombre, id], function (err, result, field) {
                        if (err) {
                            console.log(err, 'Problema al actualizar');
                        }
                        if (result = !null) {
                            res.send({
                                message: 'Datos de la marca modificados con exito'
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//ELIMINAR MARCA
app.delete('/marca/eliminar/:idMarca', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idMarca;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idMarca = req.params.idMarca;
                return [4 /*yield*/, connection.query("select count(nombreMarca) from productos where nombreMarca = ?", [idMarca], function (err, result, field) {
                        if ("" + JSON.stringify(result) == '[{"count(nombreMarca)":0}]') {
                            connection.query("delete from marcas where nombre = ?", [idMarca], function (err, result, field) {
                                if (err) {
                                    console.log(err, 'Problema al eliminar');
                                    throw err;
                                }
                                if (result = !null) {
                                    res.send({
                                        message: 'Marca eliminada con exito'
                                    });
                                }
                            });
                        }
                        else {
                            console.log("No se puede eliminar la marca. Elimine los productos asociados primero");
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
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
app.post('/marca/agregar', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nombre = req.body.nombre;
                return [4 /*yield*/, connection.query("insert into marcas set nombre=?, fechaCreacion=now(), fechaActualizacion=now()", [nombre], function (err, result, field) {
                        if (err) {
                            console.log(err, 'Problema al crear');
                        }
                        if (result = !null) {
                            res.send({
                                message: 'Marca agregada con axito'
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//----------------------------------------------------------------------------------------------------------------------//
//------------------------------------------METODOS PRODUCTOS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//MOSTRAR TODOS LOS PRODUCTOS
app.get('/producto/mostrarTodos', function (req, res) {
    var qr = "select * from productos";
    connection.query(qr, function (err, result, field) {
        if (err) {
            console.log(err, 'Problema al mostrar');
        }
        if (result.length > 0) {
            res.send({
                message: 'Datos de todos los productos',
                data: result
            });
        }
    });
});
//MOSTRAR UN PRODUCTO
app.get('/producto/mostrarUno', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, connection.query("select nombre, valor, fechaCreacion, fechaActualizacion, estado, nombreMarca from productos where id = ?", [id], function (err, result, field) {
                        if (err) {
                            console.log(err, 'Problema al mostrar');
                        }
                        if (result.length > 0) {
                            res.send({
                                message: 'Datos del producto', data: result
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//EDITAR PRODUCTO
app.put('/producto/editar/:id', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, nombre, valor, estado, nombreMarca;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                nombre = req.body.nombre;
                valor = req.body.valor;
                estado = req.body.estado;
                nombreMarca = req.body.nombreMarca;
                return [4 /*yield*/, connection.query("update productos set nombre=?, valor=?, fechaActualizacion=now(), estado=?, nombreMarca=? where id = ?", [nombre, valor, estado, nombreMarca, id], function (err, result, field) {
                        if (err) {
                            console.log(err, 'Problema al actualizar');
                        }
                        if (result = !null) {
                            res.send({
                                message: 'Datos del producto modificados con exito'
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//ELIMINAR PRODUCTO
app.delete('/producto/eliminar/:id', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, connection.query("delete from productos where id = ?", [id], function (err, result, field) {
                        if (err) {
                            console.log(err, 'Problema al eliminar');
                        }
                        if (result = !null) {
                            res.send({
                                message: 'Producto eliminado con exito'
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//CREAR PRODUCTO
app.post('/producto/agregar', jsonParser, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre, valor, estado, nombreMarca;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nombre = req.body.nombre;
                valor = req.body.valor;
                estado = req.body.estado;
                nombreMarca = req.body.nombreMarca;
                return [4 /*yield*/, connection.query("insert into productos set nombre=?, valor=?, fechaCreacion=now(), fechaActualizacion=now(), estado=?, nombreMarca=?", [nombre, valor, estado, nombreMarca], function (err, result, field) {
                        if (err) {
                            console.log(err, 'Problema al crear');
                        }
                        if (result = !null) {
                            res.send({
                                message: 'Producto agregado con axito'
                            });
                        }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//----------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------*OTROS--------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
//LISTEN
app.listen(configuracion, function () {
    console.log("Conectando al servidor http://localhost:" + configuracion.port);
});
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
