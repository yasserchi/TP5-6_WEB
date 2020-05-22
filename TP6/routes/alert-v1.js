const express = require('express')
const router = express.Router()
let alertModel = undefined


/* Control alertmodel initialisation */
router.use((req, res, next) => {
  /* istanbul ignore if */
  if (!alertModel) {
    res
      .status(500)
      .json({ message: 'model not initialised'})
  }
  next()
})


/* get by id */
router.get('/:id', async function (req, res, next) {

  const id = req.params.id

  if (id) {
    try {
      const alertFound = await alertModel.get(id)
      res
        .status(200)
        .send(alertFound)
    }
    catch (exc) {
      if (exc.message == 'alert.not.found'){
        res
        .status(404)
        .json({ message: `Alert not found`})
      }
    }
  } else {
    res
      .status(400)
      .json({ message: 'Wrong parameters'})
  }
})



/* Add */
router.post('/', async function (req, res, next) {
  const newAlert = { ...req.body }
  if (newAlert) {
    try {
      const alert = await alertModel.add(newAlert)
      req
        .res
        .status(201)
        .send(alert)
    } catch (exc) {
      if (exc.message == 'alert.not.valid' ){
        res
        .status(405)
        .json({ message: 'Alert not valid'})
      }
    }
  } else {
    res
      .status(400)
      .json({ message: 'Wrong parameters'})
  }
})

// Update by id
router.put('/:id', async function (req, res, next) {
  const id = req.params.id
  const newAlertProperties = req.body

  if (id && newAlertProperties) {
    try {
      const updated = await alertModel.update(id, newAlertProperties)
      res
        .status(200)
        .send(updated)

    } catch (exc) {
      if (exc.message == 'alert.not.valid'){
      res
        .status(405)
        .json({ message: 'Invalid input'})
      }
    }
  } else {
    res
      .status(400)
      .json({ message: 'Wrong parameters'})
  }
})

/* remove by id */
router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  if (id) {
    try {
      await alertModel.remove(id)
      req
        .res
        .status(200)
        .json({})
        .end()
    }
    catch (exc) {
      if (exc.message === 'alert.not.found') {
        res
          .status(404)
          .json({ message: `Alert not found` })
      }
    }
  } else {
    res
      .status(400)
      .json({ message: 'Wrong parameters'})
  }
})


/** return a closure to initialize model */
module.exports = (model) => {
  alertModel = model
  return router
}
