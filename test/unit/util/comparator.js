'use strict';

var Comparator = require('../../../index').Util.Comparator;
var assert = require('assert');

describe('Comparator', function () {
    describe('compare', function () {
        it('should compare two numbers', function () {
            var c = new Comparator();

            assert.equal(c.compare(1, 1), 0);
            assert.equal(c.compare(1, 2), -1);
            assert.equal(c.compare(1, 0), 1);
            assert.equal(c.compare(-1, 0), -1);
            assert.equal(c.compare(-1, -1), 0);
            assert.equal(c.compare(-1, -2), 1);
        });
        
        it('should compare two elements according to an external function', function() {
            function comp(a, b) {
                return 3;
            };
            var c = new Comparator(comp);

            assert.equal(c.compare(1, 1), 3);
            assert.equal(c.compare(1, 2), 3);
            assert.equal(c.compare(1, 0), 3);
            assert.equal(c.compare(-1, 0), 3);
            assert.equal(c.compare(-1, -1), 3);
            assert.equal(c.compare(-1, -2), 3);
        });
    });
    
    describe('equal', function() {
        it('should return true if an element is equal to the other', function() {
            var c = new Comparator();
            
            assert.equal(c.equal(1, 1), true);
            assert.equal(c.equal(1, 2), false);
            assert.equal(c.equal(1, 0), false);
            assert.equal(c.equal(-1, 0), false);
            assert.equal(c.equal(-1, -1), true);
            assert.equal(c.equal(-1, -2), false);
            assert.equal(c.equal('a', 'a'), true);
        });
    });
    
    describe('lessThan', function() {
        it('should return true if an element less than the other', function() {
            var c = new Comparator();
            
            assert.equal(c.lessThan(1, 1), false);
            assert.equal(c.lessThan(1, 2), true);
            assert.equal(c.lessThan(1, 0), false);
            assert.equal(c.lessThan(-1, 0), true);
            assert.equal(c.lessThan(-1, -1), false);
            assert.equal(c.lessThan(-1, -2), false);
        });
    });
    
    describe('lessThanOrEqual', function() {
        it('should return true if an element less than or equal the other', function() {
            var c = new Comparator();
            
            assert.equal(c.lessThanOrEqual(1, 1), true);
            assert.equal(c.lessThanOrEqual(1, 2), true);
            assert.equal(c.lessThanOrEqual(1, 0), false);
            assert.equal(c.lessThanOrEqual(-1, 0), true);
            assert.equal(c.lessThanOrEqual(-1, -1), true);
            assert.equal(c.lessThanOrEqual(-1, -2), false);
        });
    });
    
    describe('greaterThan', function() {
        it('should return true if an element greater than the other', function() {
            var c = new Comparator();
            
            assert.equal(c.greaterThan(1, 1), false);
            assert.equal(c.greaterThan(1, 2), false);
            assert.equal(c.greaterThan(1, 0), true);
            assert.equal(c.greaterThan(-1, 0), false);
            assert.equal(c.greaterThan(-1, -1), false);
            assert.equal(c.greaterThan(-1, -2), true);
        });
    });
    
    describe('greaterThanOrEqual', function() {
        it('should return true if an element greater than or equal the other', function() {
            var c = new Comparator();
            
            assert.equal(c.greaterThanOrEqual(1, 1), true);
            assert.equal(c.greaterThanOrEqual(1, 2), false);
            assert.equal(c.greaterThanOrEqual(1, 0), true);
            assert.equal(c.greaterThanOrEqual(-1, 0), false);
            assert.equal(c.greaterThanOrEqual(-1, -1), true);
            assert.equal(c.greaterThanOrEqual(-1, -2), true);
        });
    });
    
    describe('invert', function() {
        it('should invert the comparisons', function() {
            var c = new Comparator();
            
            c.invert();
            
            assert.equal(c.compare(1, 1), 0);
            assert.equal(c.compare(1, 2), 1);
            assert.equal(c.compare(1, 0), -1);
            assert.equal(c.compare(-1, 0), 1);
            assert.equal(c.compare(-1, -1), 0);
            assert.equal(c.compare(-1, -2), -1);
        });
    });
});