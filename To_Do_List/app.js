const express = require('express');
const path = require('path');

const checklistRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/task');

const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override');

require('./config/database')

const app = express();
app.use(express.json()); // Middleware do express para utilizar json
app.use(express.urlencoded({ extended: true })); // necessário para o método Post, enviar dados para o banco (Middleware padrão express)
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));


// Mostrar para o express que os arquivos staticos vai ficar na pasta public
// O bulma trabalha com arquivos static ou seja que não muda, ex: css
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

//Criação de um middleware, os middleware tem sem pre a sintaxe de req, res, next
// requisição, resposta, proximo, o next é para ir para o proximo middleware
// Podemos criar middleware para verificação de login permissão etc
// Para utilizar o middleware é necessário chamar app.use(nomeDoMiddleware) 

app.use('/', rootRouter);
app.use('/checklists', checklistRouter);
app.use('/checklists', taskRouter.checklistDepedent);



app.listen(3000, () => {
    console.log('Servidor foi iniciado');
})