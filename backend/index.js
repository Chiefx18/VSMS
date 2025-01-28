const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;
const { sequelize } = require('./db');
const routes = require('./routes');
const cors = require('cors');

app.use(cors());

app.get('/',(req,res)=>{
    res.send('App is working')
})

app.use(routes);

sequelize.sync().then((req)=>{
    console.log('Database Connection Successful');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});