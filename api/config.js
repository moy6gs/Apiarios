
var express=require('express')
var app=express()
const parse=require("body-parser")
var formidable = require('formidable');
var con=require('../database/config.js');
var pass=require('../passport/config.js')
var session=require("express-session")
var cookie=require("cookie-parser")
app.use(cookie())
app.use(session({
  secret:"thesecret",
  saveUninitialized: false,
  resave: false
}
))
app.use(parse.urlencoded({extended:true}))
app.use(parse.json())
app.use(pass.initialize())
app.use(pass.session())

app.get('/api/user_data', function(req, res) {
  if (req.user === undefined) {
    // The user is not logged in
    res.status(200).send({success:false})
  } else {

    var sql="select id_cliente as id from clientes where user='"+req.user+"'";
    con.query(sql,function(err,result) {

      if(err)
      {
        console.log('err'+ err.message)
      }else {
        console.log('Usuario en sesion activa ')
        res.send({
          username: req.user,
          password: req.pass,
          id:result[0].id,
          success:true
        });
      }
    })
  }
});

app.get('/precios', (req,res)=> {
  var sql="select precio from productos"
  con.query(sql,(err,result)=> {
    if(err)
    {
      console.error('error: ' + err.message)
      res.status(500).send({success:false})
    }else
    {
      res.status(200).send({success:true,mezquite:result[0].precio,campo:result[1].precio})
    }
  }
)
});
app.get('/precios/:flor', (req,res)=> {
  var sql="select precio from productos where nombre='"+req.params.flor+"'";
  con.query(sql,(err,result)=> {
    if(err)
    {
      console.error('error: ' + err.message)
      res.status(500).send({success:false})
    }else
    {
      if(result[0])
      {
        res.status(200).send({
          success:true,
          precio:result[0].precio
        })
      }else {
        res.status(200).send({
          success:false,
          message:'Producto no encontrado'
        })
      }
    }
  }
)
});

app.post('/pedidos',(req,res)=>{
  console.log(req.body)
  con.query('select id_cliente as id, direccion  from clientes where user="'+req.user+'"',function (err,result) {

    if(err)
    {
      console.error('error: ' + err.message)
    }else
    {
      console.log(result[0].id)
      var sql="INSERT INTO `pedidos` (`id_pedido`, `id_cliente`, `Floracion`, `cantidad_miel`,`fecha_pedido`, `fecha_entrega`, `direccion_envio`, `forma_pago`,`baucher`, `total`)VALUES (NULL, '"+result[0].id+"', '"+req.body.flor+"', '"+req.body.cant+"','"+req.body.date+"', '"+req.body.date+"', '"+req.body.dire+"', 'Deposito','sin baucher', '"+req.body.amount+"')";
      con.query(sql,function (err,result) {
        if(err)
        {
          console.log('error'+err.message)
        }else {
          {
            console.log('pedidoinsertado')
            var sql="SELECT id_pedido as id from pedidos order by 1 DESC limit 1";
            con.query(sql,function (err,result) {
              if(err)
              {
                console.log('error'+err.message)
              }else {
                res.send({redire:"#!compraexitosa/"+req.body.amount+"/"+req.body.cant})

              }

            })


          }
        }

      })

    }

  })
});

app.post('/reg',
function(req,res) {

  var sql="INSERT INTO `clientes` (`id_cliente`, `nombre`, `A_Paterno`, `A_Materno`, `direccion`,`phone`, `email`, `nacimiento`, `Sexo`, `RFC`, `direfis`, `user`, `password`, `addby`)   VALUES (NULL, '"+req.body.nombre+"', '"+req.body.apep+"', '"+req.body.apem+"', '"+req.body.direccion+"','"+req.body.tel+"', '"+req.body.emaill+"', '"+req.body.birth+"', '"+req.body.sex+"', '"+req.body.rfcn+"', '"+req.body.direff+"','"+req.body.username+"','"+req.body.password+"', 'Online')";
  con.query(sql,function (err,resul) {
    if(err)
    {
      console.log('error'+err.message)
      res.status(500).send({session:"No se pudo registrar"})
    }else {
      {
        console.log("cliente registrado")
        var sql="INSERT INTO `history` (`id_history`, `password`, `user`) VALUES (NULL, '"+req.body.password+"', '"+req.body.username+"')";
        con.query(sql,function(err,result) {
          if(err)
          {
            console.log('error'+err.message)
            res.status(500).send({session:false})
          }else {
            console.log("agreado a la historia")
            res.status(200).send({session:true,user:req.body.username,pass:req.body.password})
          }

        })

      }
    }

  })
})

app.get('/users/:id', (req,res)=> {

  var sql="SELECT * FROM clientes where id_cliente="+req.params.id;
  con.query(sql,function (err,result) {

    if(err)
    {
      console.log('err'+err.message)
    }
    {
      res.send(result[0])
    }

  })
})

app.put('/users/:id',(req,res)=>{
  console.log("this is an update")
  console.log(req.body)

  var sql="select count(password) as isa from clientes where user='"+req.body.user+"' and password='"+req.body.oldpass+"'";
  con.query(sql, (err,result)=> {

    if(err)
    {
      console.log('err'+err.message)
    }else {
      if(result[0].isa==1)
      {
        var sql="select count(password) as psa from history where password='"+req.body.password+"' and user='"+req.body.user+"'";
        con.query(sql, (err,result)=> {

          if(err)
          {
            console.log('err'+err.message)
          }else {

            if(result[0].psa==0)
            {
              var sql="UPDATE `clientes` SET `password` = '"+req.body.password+"' WHERE user = '"+req.body.user+"'";
              con.query(sql,(err,resul)=> {

                if(err)
                {
                  console.log('eror'+err.message)
                }else {
                  res.send({success:true,message:'La contraseña ha sido cambiada'})
                }


              })
            }
            else {

              res.send({success:false,message:'Contraseña ya la haz utilizado'})
            }
          }
        })
      }
      else {

        res.send({succes:false,message: 'Contraseña Actual Incorrecta'})
      }

    }

  })



})

app.get('/users/:id/pedidos',(req,res)=>{
  var sql="select * from pedidos where id_cliente="+req.params.id;
  con.query(sql,(err,result)=>{

    if(err)
    {
      console.log('error'+err.message);
    }
    else {
      console.log(result)
      res.send(result)
    }
  })
})

app.post('/uploadimg', function (req, res){

  var form = new formidable.IncomingForm();

  form.parse(req,function(err, fields, files) {

    var sql="UPDATE `pedidos` SET `baucher` = '"+files.upload.name+"' WHERE `pedidos`.`id_pedido` = "+fields.pedido;
    con.query(sql,function(err,result) {
      if(err)
      {
        console.log('error'+err.message)
      }
      else {
        console.log('imagen guardada')
      }
    })

  });

  form.on('fileBegin', function (name, file){
    file.path = __dirname + '/img/'+file.name;
  });

  form.on('file', function (name, file){
    console.log('Uploaded ' + file.name);
  });

  res.redirect('/#!/gracias')
});

app.get('/comentarios',(req,res)=>{

  var sql="select * from coments limit 5";
  con.query(sql,(err,result)=>{

    if(err)
    {
      console.log('error'+err.message)
    }else {
      res.send(result)
    }
  })
})
app.post('/comentarios',(req,res)=>{

  var sql="INSERT INTO `coments` (`Id_comentario`, `Id_cliente`, `descripcion`, `user`)   VALUES (NULL, '"+req.body.id+"', '"+req.body.descripcion+"', '"+req.body.user+"')";
  con.query(sql,(err,result)=>{

    if(err)
    {
      console.log('err'+err.message)
    }else {
      res.send({success:true,message:'El comentario ha sido registrado'})
    }
  })

})

app.post('/login',
pass.authenticate('local', { failureRedirect: '/log.html' }),
function(req, res) {

  res.redirect('/index.html');
});

app.get('/logout',(req, res) =>{
  req.logout();
  res.redirect('/index.html');
});
module.exports=app;
