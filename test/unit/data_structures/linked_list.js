'use strict';

var LinkedList = require('../../../index').DataStructures.LinkedList;
var assert = require('assert');

describe('Linked List', function () {
    it('should create an empty list', function () {
        var ll = new LinkedList();

        assert(ll.isEmpty());
        assert.equal(ll.length, 0);
        assert.equal(ll.size(), 0);
    });

    describe('add', function () {
        it('should add an element to the empty list', function () {
            var ll = new LinkedList();
            var value = 123;

            ll.add(value);

            assert.equal(ll.length, 1);
            assert.equal(ll._front, ll._back);
            assert.equal(ll._front.value, value);
        });

        it('should add an element to the front', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 345;

            ll.add(back_value);
            ll.add(front_value, 0);

            assert.equal(ll.length, 2);
            assert.equal(ll._front, ll._front.next.prev);
            assert.equal(ll._front.prev, null);
            assert.equal(ll._front.next.next, null);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(ll._front.value, front_value);
            assert.equal(ll._back.value, back_value);
        });

        it('should add an element to the back', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 345;

            ll.add(front_value);
            ll.add(back_value);

            assert.equal(ll.length, 2);
            assert.equal(ll._front, ll._front.next.prev);
            assert.equal(ll._front.prev, null);
            assert.equal(ll._front.next.next, null);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(ll._front.value, front_value);
            assert.equal(ll._back.value, back_value);
        });

        it('should add an element to the back using the length as the index', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 345;

            ll.add(front_value);
            ll.add(back_value, 1);

            assert.equal(ll.length, 2);
            assert.equal(ll._front, ll._front.next.prev);
            assert.equal(ll._front.prev, null);
            assert.equal(ll._front.next.next, null);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(ll._front.value, front_value);
            assert.equal(ll._back.value, back_value);
        });

        it('should add an element to the specified index', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;

            ll.add(front_value);
            ll.add(back_value);
            ll.add(middle_value, 1);

            //front - middle - back
            assert.equal(ll.length, 3);
            assert.equal(ll._front.value, front_value);
            assert.equal(ll._front.next.value, middle_value);
            assert.equal(ll._back.value, back_value);
            assert.equal(ll._front, ll._front.next.prev);
            assert.equal(ll._back, ll._front.next.next);
            assert.equal(ll._front.next, ll._back.prev);
            
            //front - front - middle - back
            ll.add(front_value, 1);
            assert.equal(ll._front.next.value, front_value);
            assert.equal(ll._back.prev.value, middle_value);
            
            //front - front - back - middle - back
            ll.add(back_value, 2);
            assert.equal(ll._front.next.next.value, back_value);
            assert.equal(ll._back.prev.value, middle_value);
        });

        it('should throw an exception when trying to insert to an index higher than the length', function () {
            var ll = new LinkedList();
            var error = false;

            try {
                ll.add(123, 1);
            } catch (e) {
                error = true;
            }

            assert(error);
        });

        it('should throw an exception when using a negative index', function () {
            var ll = new LinkedList();
            var error = false;

            try {
                ll.add(123, 1);
            } catch (e) {
                error = true;
            }

            assert(error);
            assert.equal(ll.length, 0);
        });
    });

    describe('addFirst', function () {
        it('should add an element to the front', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 345;

            ll.add(back_value);
            ll.addFirst(front_value);

            assert.equal(ll.length, 2);
            assert.equal(ll._front, ll._front.next.prev);
            assert.equal(ll._front.prev, null);
            assert.equal(ll._front.next.next, null);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(ll._front.value, front_value);
            assert.equal(ll._back.value, back_value);
        });
    });

    describe('addLast', function () {
        it('should add an element to the back', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 345;

            ll.add(front_value);
            ll.addLast(back_value);

            assert.equal(ll.length, 2);
            assert.equal(ll._front, ll._front.next.prev);
            assert.equal(ll._front.prev, null);
            assert.equal(ll._front.next.next, null);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(ll._front.value, front_value);
            assert.equal(ll._back.value, back_value);
        });
    });

    describe('clear', function () {
        it('should empty the list', function () {
            var ll = new LinkedList();
            var first;
            var middle;
            var last;

            ll.add(123);
            ll.add(456);
            ll.add(789);

            first = ll.get(0);
            middle = ll.get(1);
            last = ll.get(2);

            ll.clear();

            assert.equal(ll._front, null);
            assert.equal(ll._back, null);
            assert.equal(ll.length, 0);

            assert.equal(first._next, null);
            assert.equal(first._prev, null);
            assert.equal(middle._next, null);
            assert.equal(middle._prev, null);
            assert.equal(last._next, null);
            assert.equal(last._prev, null);

        });
    });

    describe('contains', function () {
        it('should find the element', function () {
            var ll = new LinkedList();
            var desired_value = 123;

            ll.add(1);
            ll.add(2);
            ll.add(3);
            ll.add(desired_value);

            assert.equal(ll.contains(desired_value), true);
        });

        it('should not find the element', function () {
            var ll = new LinkedList();
            var desired_value = 123;

            ll.add(1);
            ll.add(2);
            ll.add(3);

            assert.equal(ll.contains(desired_value), false);
        });
    });

    describe('every', function () {
        it('should iterate over all the elements', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var counter = 0;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            ll.every(function (element, index) {
                if (counter === 0) {
                    assert.equal(element, front_value);
                } else if (counter === 1) {
                    assert.equal(element, middle_value);
                } else if (counter === 2) {
                    assert.equal(element, back_value);
                } else {
                    assert(false);
                }
                assert.equal(counter, index);

                counter += 1;

                return true;
            });
        });

        it('should not iterate over an empty list', function () {
            var ll = new LinkedList();

            ll.every(function (element, index) {
                assert(false);
            });
        });

        it('should return the list as the third argument of the callback function', function () {
            var ll = new LinkedList();

            ll.add(123);
            ll.every(function (element, index, list) {
                assert(list, ll);
            });
        });

        it('should stop iterating when the callback returns false', function () {
            var ll = new LinkedList();

            ll.add(123);
            ll.add(456);
            ll.add(789);

            ll.every(function (element, index) {
                if (index == 1) {
                    return false;
                } else if (index === 2) {
                    assert(false);
                }
                return true;
            });
        });

    });

    describe('forEach', function () {
        it('should iterate over all the elements', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var counter = 0;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            ll.forEach(function (element, index) {
                if (counter === 0) {
                    assert.equal(element, front_value);
                } else if (counter === 1) {
                    assert.equal(element, middle_value);
                } else if (counter === 2) {
                    assert.equal(element, back_value);
                } else {
                    assert(false);
                }
                assert.equal(counter, index);

                counter += 1;
            });
        });

        it('should not iterate over an empty list', function () {
            var ll = new LinkedList();

            ll.forEach(function (element, index) {
                assert(false);
            });
        });

        it('should return the list as the third argument of the callback function', function () {
            var ll = new LinkedList();

            ll.add(123);
            ll.forEach(function (element, index, list) {
                assert(list, ll);
            });
        });

    });

    describe('get', function () {
        it('should get the element at the specified index', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            assert.equal(ll.get(0), front_value);
            assert.equal(ll.get(1), middle_value);
            assert.equal(ll.get(2), back_value);
            assert.equal(ll.get(3), undefined);
        });
    });

    describe('getFirst', function () {
        it('should get the first element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 456;

            ll.add(front_value);
            ll.add(back_value);

            assert.equal(ll.getFirst(), front_value);
        });
    });

    describe('getLast', function () {
        it('should get the last element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 456;

            ll.add(front_value);
            ll.add(back_value);

            assert.equal(ll.getLast(), back_value);
        });
    });

    describe('indexOf', function () {
        it('should find the index of the element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 456;
            var back_value = 789;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            assert.equal(ll.indexOf(front_value), 0);
            assert.equal(ll.indexOf(middle_value), 1);
            assert.equal(ll.indexOf(back_value), 2);
            assert.equal(ll.indexOf(5), -1);
        });
    });

    describe('isEmpty', function () {
        it('should check if the list is empty', function () {
            var ll = new LinkedList();

            assert.equal(ll.isEmpty(), true);

            ll.add(123);

            assert.equal(ll.isEmpty(), false);
        });
    });

    describe('lastIndexOf', function () {
        it('should return the last index of an element', function () {
            var ll = new LinkedList();
            ll.add(123);
            ll.add(456);
            ll.add(123);
            ll.add(789);

            assert.equal(ll.lastIndexOf(123), 2);
            assert.equal(ll.lastIndexOf(456), 1);
            assert.equal(ll.lastIndexOf(5), -1);
        });
    });

    describe('peek', function () {
        it('should get the first element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 456;

            ll.add(front_value);
            ll.add(back_value);

            assert.equal(ll.peek(), front_value);
            assert.equal(ll.length, 2);
        });
    });

    describe('pop', function () {
        it('should remove the first element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var removed_element;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            removed_element = ll.pop();

            assert.equal(ll.length, 2);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(removed_element, front_value);
        });
    });

    describe('push', function () {
        it('should add an element to the front', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var back_value = 345;

            ll.add(back_value);
            ll.push(front_value);

            assert.equal(ll.length, 2);
            assert.equal(ll._front, ll._front.next.prev);
            assert.equal(ll._front.prev, null);
            assert.equal(ll._front.next.next, null);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(ll._front.value, front_value);
            assert.equal(ll._back.value, back_value);
        });
    });

    describe('remove', function () {
        it('should not remove from an empty list', function () {
            var ll = new LinkedList();
            var error = false;

            try {
                ll.remove(0);
            } catch (e) {
                error = true;
            }
            assert(error);
        });

        it('should throw an exception if trying to remove from an invalid index', function () {
            var ll = new LinkedList();
            ll.add(123);
            ll.add(456);

            var error = false;

            try {
                ll.remove(2);
            } catch (e) {
                error = true;
            }
            assert(error);
        });

        it('should throw an exception if trying to remove from a negative index', function () {
            var ll = new LinkedList();
            ll.add(123);

            var error = false;

            try {
                ll.remove(-1);
            } catch (e) {
                error = true;
            }
            assert(error);
        });

        it('should remove the element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var removed_element;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            removed_element = ll.remove(1);

            //front - back
            assert.equal(ll.length, 2);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(removed_element, middle_value);
            assert.equal(removed_element.prev, null);
            assert.equal(removed_element.next, null);

            ll.add(middle_value, 1);
            ll.add(back_value, 2);
            ll.add(front_value, 1);
            
            //front - front - middle - back - back
            removed_element = ll.remove(3);
            
            //front - front - middle - back
            assert.equal(removed_element, back_value);
            assert.equal(ll._back.prev.value, middle_value);
            assert.equal(ll._front.next.next.value, middle_value);
            assert.equal(ll._front.next.value, front_value);

            ll.add(removed_element, 3);
            
            //front - front - middle - back - back
            removed_element = ll.remove(1);
            
            //front - middle - back - back
            assert.equal(removed_element, front_value);
            assert.equal(ll._front.next.value, middle_value);
            assert.equal(ll._back.prev.prev.value, middle_value);
            assert.equal(ll._back.prev.value, back_value);
        });

        it('should remove the first element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var removed_element;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            removed_element = ll.remove(0);

            assert.equal(ll.length, 2);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(removed_element, front_value);
        });

        it('should remove the last element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var removed_element;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            removed_element = ll.remove(2);

            assert.equal(ll.length, 2);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(removed_element, back_value);
        });
    });

    describe('removeFirst', function () {
        it('should remove the first element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var removed_element;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            removed_element = ll.removeFirst();

            assert.equal(ll.length, 2);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(removed_element, front_value);
        });
    });

    describe('removeFirstOccurrence', function () {
        it('should remove the first occurrence of the element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);
            ll.add(middle_value);

            ll.removeFirstOccurrence(middle_value);
            assert.equal(ll._front.next.value, back_value);
            assert.equal(ll._back.value, middle_value);
        });

        it('should do nothing if the element does not exist', function () {
            var ll = new LinkedList();
            var value = 123;

            ll.add(value);

            ll.removeFirstOccurrence(5);

            assert.equal(ll.length, 1);
            assert.equal(ll._front.value, value);
        });
    });

    describe('removeLast', function () {
        it('should remove the last element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var removed_element;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            removed_element = ll.removeLast();

            assert.equal(ll.length, 2);
            assert.equal(ll._front.next, ll._back);
            assert.equal(ll._back.prev, ll._front);
            assert.equal(removed_element, back_value);
        });
    });

    describe('removeLastOccurrence', function () {
        it('should remove the last occurrence of the element', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);
            ll.add(middle_value);

            ll.removeLastOccurrence(middle_value);
            assert.equal(ll._front.next.value, middle_value);
            assert.equal(ll._back.value, back_value);
        });

        it('should do nothing if the element does not exist', function () {
            var ll = new LinkedList();
            var value = 123;

            ll.add(value);

            ll.removeFirstOccurrence(5);

            assert.equal(ll.length, 1);
            assert.equal(ll._front.value, value);
        });
    });

    describe('set', function () {
        it('should set the the element at the specified index', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            ll.set(back_value, 0);
            assert.equal(ll._front.value, back_value);

            ll.set(middle_value, 2);
            assert.equal(ll._back.value, middle_value);

            ll.set(front_value, 1);
            assert.equal(ll._front.next.value, front_value);
        });

        it('should throw an exception if trying to set a number at an invalid index', function () {
            var ll = new LinkedList();
            var error = false;
            ll.add(123);

            try {
                ll.set(456, 1);
            } catch (e) {
                error = true;
            }

            assert(error);
        });

        it('should throw an exception if trying to set a number at a negative index', function () {
            var ll = new LinkedList();
            var error = false;
            ll.add(123);

            try {
                ll.set(456, -1);
            } catch (e) {
                error = true;
            }

            assert(error);
        });

        it('should throw an exception if trying to set a number at an empty list', function () {
            var ll = new LinkedList();
            var error = false;

            try {
                ll.set(123, 0);
            } catch (e) {
                error = true;
            }

            assert(error);
        });
    });

    describe('size | length', function () {
        it('should return the length of the list', function () {
            var ll = new LinkedList();
            assert.equal(ll.size(), 0);
            assert.equal(ll.length, 0);
            ll.add(123);
            assert.equal(ll.size(), 1);
            assert.equal(ll.length, 1);
            ll.add(456);
            assert.equal(ll.size(), 2);
            assert.equal(ll.length, 2);
            ll.pop();
            assert.equal(ll.size(), 1);
            assert.equal(ll.length, 1);
            ll.pop();
            assert.equal(ll.size(), 0);
            assert.equal(ll.length, 0);
            ll.pop();
            assert.equal(ll.size(), 0);
            assert.equal(ll.length, 0);
        });
    });

    describe('toArray', function () {
        it('should convert the list to an array', function () {
            var ll = new LinkedList();
            var front_value = 123;
            var middle_value = 345;
            var back_value = 678;
            var array;

            ll.add(front_value);
            ll.add(middle_value);
            ll.add(back_value);

            array = ll.toArray();
            assert.equal(array.length, ll.length);
            assert.equal(array[0], ll.get(0));
            assert.equal(array[1], ll.get(1));
            assert.equal(array[2], ll.get(2));
        });

        it('should convert an empty list to an empty array', function () {
            var ll = new LinkedList();
            var array = ll.toArray();

            assert.equal(array.length, 0);
        });
    });
});