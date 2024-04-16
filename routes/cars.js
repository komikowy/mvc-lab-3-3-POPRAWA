const express = require('express');
const cheerio = require('cheerio');
const router = express.Router();
const path = require('path');

let cars = [];
let nextId = 1;

router.get('/car', (req, res) => {
    let carHtml = '';
    const $ = cheerio.load('<div class="car"></div>');

    if (cars.length === 0) {
        carHtml = '<div>No cars have been found.</div>';
    } else {
        const car = cars[cars.length - 1];
        carHtml = `<h2>Last added car</h2>
                    <div><span class="bold">Make:</span> ${car.make}</div>
                    <div><span class="bold">Model:</span> ${car.model}</div>
                    <div><span class="bold">Year:</span> ${car.year}</div>
                    <div><span class="bold">Color:</span> ${car.color}</div>`;
    }

    $('.car').append(carHtml);
    res.send($.html());
});

router.get('/car/add', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'add-car.html'));
});

router.get('/car/list', (req, res) => {
    let carsHtml = '';
    const $ = cheerio.load('<div class="cars"></div>');

    if (cars.length === 0) {
        carsHtml = '<div>No cars have been found.</div>';
    } else {
        carsHtml += '<h2>Cars</h2><ul>';
        cars.forEach(car => {
            carsHtml += `<li>
                            <p><span class="bold">Make:</span> ${car.make}</p>
                            <p><span class="bold">Model:</span> ${car.model}</p>
                            <p><span class="bold">Year:</span> ${car.year}</p>
                            <p><span class="bold">Color:</span> ${car.color}</p>
                        </li>`;
        });
        carsHtml += '</ul>';
    }

    $('.cars').append(carsHtml);
    res.send($.html());
});

router.post('/car/add', (req, res) => {
    const { make, model, year, color } = req.body;
    console.log('Make:', make);
    console.log('Model:', model);
    console.log('Year:', year);
    console.log('Color:', color);
    
    const newCar = { id: nextId++, make, model, year, color };
    cars.push(newCar);
    res.redirect('/car');
});

module.exports = router;
