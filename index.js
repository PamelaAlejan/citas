import axios from 'axios'
import express from 'express'
import { engine } from "express-handlebars"
import moment from 'moment';
import { nanoid } from 'nanoid';
import chalk from 'chalk';
import _ from 'lodash';


const app = express()
const PORT = 3000;
const users = [];


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');



app.get('/', async (req, res) => {

    const response = await axios.get('https://randomuser.me/api/')

    const gender = response.data.results[0].gender
    const first = response.data.results[0].name.first
    const last = response.data.results[0].name.last

    const user = {
        gender,
        first,
        last,
        id: nanoid(),
        timestamp: moment().format('LLL')
    }

    users.push(user)
    const [females, males] = _.partition(users, user => user.gender === 'female');

    females.forEach(item => {
        console.log(chalk.bgWhite.blue('Nombre:', user.first, '- Apellido:', user.last, '- ID:', user.id, '- Timestamp:', user.timestamp,
            '- Sexo:', user.gender))
    });
    males.forEach(item => {
        console.log(chalk.bgWhite.blue('Nombre:', user.first, '- Apellido:', user.last, '- ID:', user.id, '- Timestamp:', user.timestamp,
            '- Sexo:', user.gender))
    });

    res.render('home', { females, males });

});


app.get('arreglo', (req, res) => {
    res.render
})

app.get('/*', (req, res) => {
    res.send('404',)
})



app.listen(PORT, () => {
    console.log(`servidor inicializado en el puerto http://localhost:${PORT}/`)
})