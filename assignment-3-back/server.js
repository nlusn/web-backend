const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 3000

// ==============================
// MIDDLEWARE (ORDER MATTERS)
// ==============================
app.use(cors())               // ✅ allow Live Server
app.use(express.json())       // ✅ parse JSON bodies

// ==============================
// MONGODB ATLAS CONNECTION
// ==============================
mongoose.connect(
  'mongodb+srv://test:1234@cluster0.ugbvokq.mongodb.net/?appName=Cluster0'
)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error(err))

// ==============================
// SCHEMAS
// ==============================
const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number }
  },
  { timestamps: true }
)

const Car = mongoose.model('Car', carSchema)

const reviewSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true
    },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
)

const Review = mongoose.model('Review', reviewSchema)

// ==============================
// ROUTES
// ==============================
app.get('/', (req, res) => {
  res.send('Cars API (MongoDB Atlas) is running')
})

// CREATE car
app.post('/cars', async (req, res) => {
  try {
    const { name, brand, price, year } = req.body

    if (!name || !brand || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const car = new Car({ name, brand, price, year })
    await car.save()

    res.status(201).json(car)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET all cars
app.get('/cars', async (req, res) => {
  const cars = await Car.find()
  res.json(cars)
})

// GET car by ID
app.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    if (!car) return res.status(404).json({ error: 'Car not found' })
    res.json(car)
  } catch {
    res.status(400).json({ error: 'Invalid ID' })
  }
})

// UPDATE car
app.put('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!car) return res.status(404).json({ error: 'Car not found' })
    res.json(car)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE car
app.delete('/cars/:id', async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id)
  if (!car) return res.status(404).json({ error: 'Car not found' })
  res.json({ deleted: true })
})

// ==============================
// REVIEWS
// ==============================
app.post('/cars/:id/reviews', async (req, res) => {
  try {
    const { author, rating, comment } = req.body

    if (!author || !rating) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const review = new Review({
      carId: req.params.id,
      author,
      rating,
      comment
    })

    await review.save()
    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.get('/cars/:id/reviews', async (req, res) => {
  const reviews = await Review.find({ carId: req.params.id })
  res.json(reviews)
})

app.delete('/reviews/:id', async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id)
  if (!review) return res.status(404).json({ error: 'Review not found' })
  res.json({ deleted: true })
})

// ==============================
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
