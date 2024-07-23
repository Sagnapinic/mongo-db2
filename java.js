const mongoose = require('mongoose');

const uri = 'mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
    const personSchema = new mongoose.Schema({
        name: { type: String, required: true },
        age: Number,
        favoriteFoods: [String]
    });
    
    const Person = mongoose.model('Person', personSchema);
 
    const createAndSavePerson = (done) => {
        const person = new Person({
            name: 'John Doe',
            age: 30,
            favoriteFoods: ['Pizza', 'Burger']
        });
    
        person.save((err, data) => {
            if (err) return console.error(err);
            done(null, data);
        });
    };
    const createManyPeople = (arrayOfPeople, done) => {
        Person.create(arrayOfPeople, (err, people) => {
            if (err) return console.error(err);
            done(null, people);
        });
    };
    const findPeopleByName = (personName, done) => {
        Person.find({ name: personName }, (err, people) => {
            if (err) return console.error(err);
            done(null, people);
        });
    };
    const findOneByFood = (food, done) => {
        Person.findOne({ favoriteFoods: food }, (err, person) => {
            if (err) return console.error(err);
            done(null, person);
        });
    };
    const findPersonById = (personId, done) => {
        Person.findById(personId, (err, person) => {
            if (err) return console.error(err);
            done(null, person);
        });
    };
    const findEditThenSave = (personId, done) => {
        const foodToAdd = 'hamburger';
        
        Person.findById(personId, (err, person) => {
            if (err) return console.error(err);
            
            person.favoriteFoods.push(foodToAdd);
            
            person.save((err, updatedPerson) => {
                if (err) return console.error(err);
                done(null, updatedPerson);
            });
        });
    };
    const findAndUpdate = (personName, done) => {
        const ageToSet = 20;
    
        Person.findOneAndUpdate(
            { name: personName },
            { age: ageToSet },
            { new: true },
            (err, updatedPerson) => {
                if (err) return console.error(err);
                done(null, updatedPerson);
            }
        );
    };
    const removeById = (personId, done) => {
        Person.findByIdAndRemove(personId, (err, removedPerson) => {
            if (err) return console.error(err);
            done(null, removedPerson);
        });
    };
    const removeManyPeople = (done) => {
        const nameToRemove = 'Mary';
    
        Person.remove({ name: nameToRemove }, (err, result) => {
            if (err) return console.error(err);
            done(null, result);
        });
    };
    const queryChain = (done) => {
        const foodToSearch = 'burritos';
    
        Person.find({ favoriteFoods: foodToSearch })
            .sort({ name: 1 })
            .limit(2)
            .select('-age')
            .exec((err, data) => {
                if (err) return console.error(err);
                done(null, data);
            });
    };
                                      