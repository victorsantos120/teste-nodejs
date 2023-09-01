const express = require('express');
const path = require('path');
var boryParcer = require('body-parser');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

var tarefas = ['Ajeitar ura', 'Arrumar quarto', 'Almoçar', 'Encher pneu'];

app.get('/',(req,res)=>{
    res.render('index', {tarefasList:tarefas});
})

app.post('/',(req,res)=>{
    tarefas.push(req.body.novaTarefa);
    res.render('index',{tarefasList:tarefas});
})

app.get('/deletar/:id',(req,res)=>{
    tarefas = tarefas.filter((val, index)=>{
        if(index != req.params.id){
            return val;
        }
    })
    res.render('index',{tarefasList:tarefas});
})

app.listen(3000,()=>{
    console.log('server on!');
})