"use strict";

function getPhotographers() {
  var response, data, photographers;
  return regeneratorRuntime.async(function getPhotographers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:5501/data/photographers.json"));

        case 2:
          response = _context.sent;

          if (response.ok) {
            _context.next = 5;
            break;
          }

          throw new Error("Erreur lors de la récupération des photographes");

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          photographers = data.photographers;
          return _context.abrupt("return", photographers);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function displayData(photographers) {
  var photographersSection;
  return regeneratorRuntime.async(function displayData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          photographersSection = document.querySelector(".photographer_section");
          photographers.forEach(function (photographer) {
            var photographerModel = photographerTemplate(photographer);
            var userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function init() {
  var photographers;
  return regeneratorRuntime.async(function init$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getPhotographers());

        case 2:
          photographers = _context3.sent;
          displayData(photographers);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

init();