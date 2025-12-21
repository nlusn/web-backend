// const fs = require('fs')
// const path = require('path')
// let filePath = path.join(__dirname, "data.json")

// const data = fs.readFileSync('data.json')

// console.log(filePath)
// console.log(data.toString())

// let a = JSON.parse(`
    
//     {
//         "id":1 ,
//         "name":"Alex"
//     }
    
//     `)

// let b = JSON.stringify({id:2,name:"Connor"})
// fs.writeFileSync(filePath, b)


// console.log(a.id)



//Importationt of the modules and initialization of the variables
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.json())


const port = 3000
const filePath = path.join(__dirname, 'data.json')

// Demo routes 

app.get('/', (req,res)=>{
    res.send("Server is Running!")
})

app.get('/hello', (req,res)=>{
    res.json({message: "Hello from server!"})
})

app.get('/time', (req,res)=>{
    const time = new Date()
    res.json({currentTime: time.toTimeString()})
})

app.get('/status', (req,res)=>{
    res.status(200).json({message: "Hell yeah"})
})


// Functions to read and write json

function readData() {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}



// routes to implement CRUD 

app.get('/cart', (req,res)=>{
    res.json(readData().cart)
})


app.post('/cart', (req,res)=>{
    const data = readData()

    const newItem = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount
    }

    data.cart.push(newItem)
    writeData(data)

    res.status(201).json(newItem)
})

app.put('/cart/:id', (req,res)=>{
    const data = readData()
    const id = Number(req.params.id)

    const item = data.cart.find(i => i.id === id)

    if (!item) {
        return res.status(404).json({error:"Item not found"})
    }

    item.name = req.body.name ?? item.name
    item.price = req.body.price ?? item.price
    item.amount = req.body.amount ?? item.amount

    writeData(data)
    res.json(item)

})

app.delete('/cart/:id', (req,res)=>{
    const data = readData()
    const id = Number(req.params.id)

    const index = data.cart.findIndex(i => i.id === id)

    if (index === -1){
        return res.status(404).json({error: 'Item not found'})
    }

    const deletedItem = data.cart.splice(index, 1)


    writeData(data)
    res.json({deleted:true})

})









// start the express project and listen to its requests on the specific port

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
