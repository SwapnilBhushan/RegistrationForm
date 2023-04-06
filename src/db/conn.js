const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://root:root@cluster0.ut6uudn.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true
}).then(()=>{
    console.log('Connection Successful');
}).catch((e)=>{
    console.log(e)
    console.log('Connection Unsuccessful')
})

