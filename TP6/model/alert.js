const tcomb = require('tcomb')
const uuidv1 = require('uuid/v1')
const mongoose = require('mongoose');

const Category = tcomb.enums({
	weather: 'weather',
    sea: 'sea',
    transport: 'transport'
}, 'Category');

const Status = tcomb.enums({
    warning: 'warning',
    threat: 'threat',
    danger: 'danger',
    risk: 'risk'
}, 'Status')


const Alert = tcomb.struct({
    id: tcomb.String,
    type: Category,
    label: tcomb.String,
    status: Status,
    from: tcomb.String,
    to: tcomb.String
}, { strict: true });


const AlertModel = mongoose.model('Alert', {
	type: String,
	label: String,
 	status: String,
 	from: Date,
 	to: Date,
})


const get = async (id) => {
    try {
        const res = await AlertModel.findById(id);
        return mongoObjectToAlertModel(res)
    }
    catch (exc) {
        throw new Error("alert.not.found")
    }
}


const add = async (alert) => {
    
    const newAlert = {
        ...alert,
        id: uuidv1()
    }
   
    if (validateAlert(newAlert)) {
        try {
            const alertmongo = new AlertModel(alert);
            const id = alertmongo._id
            const test = await alertmongo.save()
            return {...alert, id};
        } catch (error) {
            /* istanbul ignore next */
            throw error;
        }
    } else {
        throw new Error('alert.not.valid');
    } 
}


const update = async (id_in, alert) => {
    if (validateAlert(alert) && id_in === alert.id) {
        delete alert.id
            const res = (await AlertModel.findByIdAndUpdate(id_in, alert));
            alert.id = id_in
            return alert
    } else {
        throw new Error('alert.not.valid')
    }
}


const remove = async (id_in) => {

    try {
        const test = (await AlertModel.findByIdAndDelete(id_in))
    }
    catch (exc) {

        throw new Error("alert.not.found")
    }

}


function validateAlert(alert) {
    let bool = false
    /* istanbul ignore else */
    if (alert) {
        try {
            const tcombAlert = Alert(alert)
            bool = true
        } catch (exc) {
            bool = false
        }
    }
    return bool
}


function mongoObjectToAlertModel(mongo){
    return {
        id:mongo._id.toString(),
        type: mongo.type,
        label: mongo.label,
        status: mongo.status,
        from: mongo.from,
        to: mongo.to
    }
}


exports.get = get
exports.add = add
exports.update = update
exports.remove = remove
exports.Alert = AlertModel