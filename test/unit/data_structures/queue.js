'use strict';

var Queue = require('../../../index').DataStructures.Queue;
var assert = require('assert');

describe('Queue', function() {
    it('should create an empty queue', function() {
        var q = new Queue();
        
        assert.equal(q.size(), 0);
    });
    
    describe('contains', function() {
        it('should find an element to the queue', function() {
            var q = new Queue();
            var element = 123;
            q.add(1);
            q.add(2);
            
            assert.equal(q.contains(element), false);
            
            q.add(element);
            q.add(3);
            
            assert.equal(q.contains(element), true);
        });
    });
    
    describe('isEmpty', function() {
        it('should check if the queue is empty', function() {
            var q = new Queue();
            
            assert.equal(q.isEmpty(), true);
            
            q.push(123);
            
            assert.equal(q.isEmpty(), false);
        });
    });
    
    describe('peek', function() {
        it('should retrieve the next element without removing it', function() {
            var q = new Queue();
            var first_element = 123;
            
            assert.equal(q.peek(), undefined);
            
            q.push(first_element);
            q.push(456);
            
            assert.equal(q.peek(), first_element);
            assert.equal(q.peek(), first_element);
            assert.equal(q.size(), 2);
        });
    });
    
    describe('pop | remove', function() {
        it('should retrieve and remove the next element of the list', function() {
            var q = new Queue();
            var first_element = 123;
            var second_element = 456;
            var removed_element;
            
            q.push(first_element);
            q.push(second_element);
            
            removed_element = q.pop();
            
            assert.equal(removed_element, first_element);
            assert.equal(q.size(), 1);
            
            removed_element = q.remove();
            
            assert.equal(removed_element, second_element);
            assert.equal(q.size(), 0);
        });
    });
    
    describe('push | add', function() {
        it('should add an element to the queue', function() {
            var q = new Queue();
            var first_element = 123;
            var second_element = 456;
            
            q.push(first_element);
            
            assert.equal(q.size(), 1);
            assert.equal(q.peek(), first_element);
            
            //first - second
            q.add(second_element);
            
            assert.equal(q.size(), 2);
            assert.equal(q.peek(), first_element);
        });
    });
    
    
    describe('size | length', function() {
        it('should retrieve the size of the queue', function() {
            var q = new Queue();
            
            assert.equal(q.size(), 0);
            assert.equal(q.length(), 0);
            
            q.push(123);
            
            assert(q.size(), 1);
            assert(q.length(), 1);
        });
    });
    
    describe('toArray', function() {
        it('should retrieve the queue as an array', function() {
            var q = new Queue();
            var first = 123;
            var second = 456;
            var third = 789;
            var array;
            
            q.push(first);
            q.push(second);
            q.push(third);
            
            array = q.toArray();
            
            assert.equal(q.pop(), array[0]);
            assert.equal(q.pop(), array[1]);
            assert.equal(q.pop(), array[2]);
        });
    });
});
