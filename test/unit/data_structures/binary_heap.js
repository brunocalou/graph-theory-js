'use strict';

var MinBinaryHeap = require('../../../index').DataStructures.MinBinaryHeap;
var MaxBinaryHeap = require('../../../index').DataStructures.MaxBinaryHeap;
var assert = require('assert');

function testCommonHeapFunctions(BinaryHeap) {
    (function (BinaryHeap) {
        describe('clear', function () {
            it('should empty the heap', function () {
                var heap = new BinaryHeap();

                heap.insert(3);
                heap.insert(9);
                heap.clear();

                assert.equal(heap.size(), 0);
                assert.equal(heap._elements.length, 1);
                assert.equal(heap._elements[0], null);
            });
        });

        describe('isEmpty', function () {
            it('should return true if the heap is empty', function () {
                var heap = new BinaryHeap();

                assert.equal(heap.isEmpty(), true);

                heap.push(1);

                assert.equal(heap.isEmpty(), false);

                heap.pop();

                assert.equal(heap.isEmpty(), true);
            });
        });

        describe('size | length', function () {
            it('should return the size of the heap', function () {
                var heap = new BinaryHeap();

                assert.equal(heap.size(), 0);
                assert.equal(heap.length, 0);

                heap.insert(3);

                assert.equal(heap.size(), 1);
                assert.equal(heap.length, 1);

                heap.insert(2);

                assert.equal(heap.size(), 2);
                assert.equal(heap.length, 2);

                heap.pop();

                assert.equal(heap.size(), 1);
                assert.equal(heap.length, 1);

                heap.pop();

                assert.equal(heap.size(), 0);
                assert.equal(heap.length, 0);

                heap.pop();

                assert.equal(heap.size(), 0);
                assert.equal(heap.length, 0);
            });
        });

        describe('_swap', function () {
            it('should swap two elements', function () {
                var heap = new BinaryHeap();

                heap._elements[1] = 2;
                heap._elements[2] = 1;

                heap._swap(1, 2);

                assert.equal(heap._elements[1], 1);
                assert.equal(heap._elements[2], 2);
            });
        });

    })(BinaryHeap);
};

describe('MinBinaryHeap', function () {
    testCommonHeapFunctions(MinBinaryHeap);

    describe('changeElement', function () {
        it('should change an element', function () {
            var heap = new MinBinaryHeap();

            heap.insert(1);
            heap.insert(8);
            heap.insert(4);
            heap.insert(2);
            heap.insert(5);

            heap.changeElement(2, 9);

            assert.equal(heap.pop(), 1);
            assert.equal(heap.pop(), 4);
            assert.equal(heap.pop(), 5);
            assert.equal(heap.pop(), 8);
            assert.equal(heap.pop(), 9);
            assert.equal(heap.pop(), undefined);
        });

        it('should change an element of an arbitrary type', function () {
            function comparator(a, b) {
                return a[0] - b[0];
            }

            var heap = new MinBinaryHeap(comparator);

            heap.heapify([[1, 5], [2, -4], [3, 2], [4, 0]]);
            heap.changeElement([3, 2], [5, 6]);

            assert.equal(heap.pop()[0], 1);
            assert.equal(heap.pop()[0], 2);
            assert.equal(heap.pop()[0], 4);
            assert.equal(heap.pop()[0], 5);
            assert.equal(heap.pop(), undefined);
        });

        it('should change just one element', function () {
            var heap = new MinBinaryHeap();

            heap.insert(1);
            heap.insert(8);
            heap.insert(4);
            heap.insert(2);
            heap.insert(2);
            heap.insert(2);
            heap.insert(5);

            heap.changeElement(2, 9);

            assert.equal(heap.pop(), 1);
            assert.equal(heap.pop(), 2);
            assert.equal(heap.pop(), 2);
            assert.equal(heap.pop(), 4);
            assert.equal(heap.pop(), 5);
            assert.equal(heap.pop(), 8);
            assert.equal(heap.pop(), 9);
            assert.equal(heap.pop(), undefined);
        });

        it('should change just one element for an arbitrary type', function () {
            function comparator(a, b) {
                return a[0] - b[0];
            }

            var heap = new MinBinaryHeap(comparator);

            heap.heapify([[1, 5], [2, -4], [3, 2], [4, 0], [3, 2], [3, 4], [4, 2]]);
            heap.changeElement([3, 2], [5, 6]);

            assert.equal(heap.pop()[0], 1);
            assert.equal(heap.pop()[0], 2);
            assert.equal(heap.pop()[0], 3);
            assert.equal(heap.pop()[0], 3);
            assert.equal(heap.pop()[0], 4);
            assert.equal(heap.pop()[0], 4);
            assert.equal(heap.pop()[0], 5);
            assert.equal(heap.pop(), undefined);
        });
    });

    describe('every', function () {
        it('should iterate over all the elements in order', function () {
            var heap = new MinBinaryHeap();
            var expected_array = [-8, -2, 0, 3, 5, 9];

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            heap.every(function (element, index, binary_heap) {
                assert.equal(element, expected_array[index]);
                assert.equal(binary_heap, heap);
                if (index > 5) {
                    assert(false);
                }
                return true;
            });
        });

        it('should stop when the callback returns false', function () {
            var heap = new MinBinaryHeap();
            var expected_array = [-8, -2, 0, 3, 5, 9];
            var must_stop = false;

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            heap.every(function (element, index, binary_heap) {
                assert.equal(element, expected_array[index]);
                assert.equal(binary_heap, heap);
                assert.equal(must_stop, false);
                if (element > -1) {
                    must_stop = true;
                    return false;
                }
                return true;
            });
            assert.equal(must_stop, true);
        });
    });

    describe('forEach', function () {
        it('should iterate over all the elements in order', function () {
            var heap = new MinBinaryHeap();
            var expected_array = [-8, -2, 0, 3, 5, 9];

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            heap.forEach(function (element, index, binary_heap) {
                assert.equal(element, expected_array[index]);
                assert.equal(binary_heap, heap);
                if (index > 5) {
                    assert(false);
                }
            });
        });
    });

    describe('heapify', function () {
        it('should transform an array into a min binary heap', function () {
            var heap = new MinBinaryHeap();
            heap.heapify([5, 2, 3, 1, 4, 7, 6]);

            for (var i = 1; i < 3; i += 1) {
                assert(heap._elements[i] < heap._elements[2 * i]);
                assert(heap._elements[i] < heap._elements[2 * i + 1]);
            }
        });
    });

    describe('insert | push', function () {
        it('should insert an element', function () {
            var heap = new MinBinaryHeap();

            heap.insert(1);

            assert.equal(heap._elements[1], 1);

            heap.push(4);

            assert.equal(heap._elements[2], 4);

            heap.push(-1);

            assert.equal(heap._elements[1], -1);
            assert.equal(heap._elements[3], 1);

            heap.push(2);

            assert.equal(heap._elements[2], 2);
            assert.equal(heap._elements[4], 4);
        });
    });

    describe('peek', function () {
        it('should return the minimum element without removing it', function () {
            var heap = new MinBinaryHeap();

            heap.push(1);

            assert.equal(heap.peek(), 1);

            heap.push(5);

            assert.equal(heap.peek(), 1);

            heap.push(-2);

            assert.equal(heap.peek(), -2);

            heap.pop();

            assert.equal(heap.peek(), 1);

            heap.pop();

            assert.equal(heap.peek(), 5);

            heap.pop();

            assert.equal(heap.peek(), undefined);
        });
    });

    describe('pop', function () {

        it('should remove an element from the heap', function () {
            var heap = new MinBinaryHeap();

            heap.push(3);
            assert.equal(heap.pop(), 3);
            assert.equal(heap.size(), 0);
            assert.equal(heap._elements[1], undefined);
            assert.equal(heap._elements[0], null);
        });

        it('should return the minimum element while removing it', function () {
            var heap = new MinBinaryHeap();

            heap.push(1);
            heap.push(4);
            heap.push(-1);
            heap.push(2);

            assert.equal(heap.pop(), -1);
            assert.equal(heap.pop(), 1);
            assert.equal(heap.pop(), 2);
            assert.equal(heap.pop(), 4);
            assert.equal(heap.pop(), undefined);

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            assert.equal(heap.pop(), -8);
            assert.equal(heap.pop(), -2);
            assert.equal(heap.pop(), 0);
            assert.equal(heap.pop(), 3);
            assert.equal(heap.pop(), 5);
            assert.equal(heap.pop(), 9);
            assert.equal(heap.pop(), undefined);

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);
            heap.insert(-1);

            assert.equal(heap.pop(), -8);
            assert.equal(heap.pop(), -2);
            assert.equal(heap.pop(), -1);
            assert.equal(heap.pop(), 0);
            assert.equal(heap.pop(), 3);
            assert.equal(heap.pop(), 5);
            assert.equal(heap.pop(), 9);
            assert.equal(heap.pop(), undefined);
        });

        it('should return undefined if the heap is empty', function () {
            var heap = new MinBinaryHeap();

            assert.equal(heap.pop(), undefined);

            heap.push(1);
            heap.pop();

            assert.equal(heap.pop(), undefined);
        });

    });

    describe('_shiftDown', function () {
        it('should shift the root', function () {
            var heap = new MinBinaryHeap();
            heap._elements = [null, 2, 1, 3];
            heap._length = 3;
            heap._shiftDown();

            assert.equal(heap._elements[1], 1);
            assert.equal(heap._elements[2], 2);
            assert.equal(heap._elements[3], 3);

            heap._elements = [null, 2, 3, 1];
            heap._shiftDown();

            assert.equal(heap._elements[1], 1);
            assert.equal(heap._elements[2], 3);
            assert.equal(heap._elements[3], 2);
        });

        it('should shift down an element', function () {
            var heap = new MinBinaryHeap();
            heap._elements = [null, 1, 2, 6, 4, 5, 3, 7];
            heap._length = 7;
            heap._shiftDown(3);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], i);
            }
        });

        it('should not shift down an element if it is correct', function () {
            var heap = new MinBinaryHeap();
            heap._elements = [null, 1, 2, 3, 4, 5, 6, 7];
            heap._length = 7;
            heap._shiftDown(4);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], i);
            }
        });
    });

    describe('_shiftUp', function () {
        it('should shift the last element', function () {
            var heap = new MinBinaryHeap();
            heap._elements = [null, 2, 3, 1];
            heap._length = 3;
            heap._shiftUp();

            assert.equal(heap._elements[1], 1);
            assert.equal(heap._elements[2], 3);
            assert.equal(heap._elements[3], 2);
        });

        it('should shift up an element', function () {
            var heap = new MinBinaryHeap();
            heap._elements = [null, 1, 2, 6, 4, 5, 3, 7];
            heap._length = 7;
            heap._shiftUp(6);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], i);
            }
        });

        it('should not shift up an element if it is correct', function () {
            var heap = new MinBinaryHeap();
            heap._elements = [null, 1, 2, 3, 4, 5, 6, 7];
            heap._length = 7;
            heap._shiftUp(4);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], i);
            }
        });
    });

    describe('toArray', function () {
        it('should return the converted heap in an ordered array format', function () {
            var heap = new MinBinaryHeap();
            var array;

            heap.push(1);
            heap.push(4);
            heap.push(-1);
            heap.push(2);

            array = heap.toArray();

            assert.equal(array[0], -1);
            assert.equal(array[1], 1);
            assert.equal(array[2], 2);
            assert.equal(array[3], 4);
        });

        it('should return an empty array if the heap is empty', function () {
            var heap = new MinBinaryHeap();

            assert.equal(heap.toArray().length, 0);
        });
    });
});

describe('MaxBinaryHeap', function () {
    testCommonHeapFunctions(MaxBinaryHeap);

    describe('changeElement', function () {
        it('should change an element', function () {
            var heap = new MaxBinaryHeap();

            heap.insert(1);
            heap.insert(8);
            heap.insert(4);
            heap.insert(2);
            heap.insert(5);
            heap.changeElement(2, 9);

            assert.equal(heap.pop(), 9);
            assert.equal(heap.pop(), 8);
            assert.equal(heap.pop(), 5);
            assert.equal(heap.pop(), 4);
            assert.equal(heap.pop(), 1);
        });

        it('should change an element of an arbitrary type', function () {
            function comparator(a, b) {
                return a[0] - b[0];
            }

            var heap = new MaxBinaryHeap(comparator);

            heap.heapify([[1, 5], [2, -4], [3, 2], [4, 0]]);
            heap.changeElement([3, 2], [5, 6]);

            assert.equal(heap.pop()[0], 5);
            assert.equal(heap.pop()[0], 4);
            assert.equal(heap.pop()[0], 2);
            assert.equal(heap.pop()[0], 1);
        });
    });

    describe('every', function () {
        it('should iterate over all the elements in order', function () {
            var heap = new MaxBinaryHeap();
            var expected_array = [9, 5, 3, 0, -2, -8];

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            heap.every(function (element, index, binary_heap) {
                assert.equal(element, expected_array[index]);
                assert.equal(binary_heap, heap);
                if (index > 5) {
                    assert(false);
                }
                return true;
            });
        });

        it('should stop when the callback returns false', function () {
            var heap = new MaxBinaryHeap();
            var expected_array = [9, 5, 3, 0, -2, -8];
            var must_stop = false;

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            heap.every(function (element, index, binary_heap) {
                assert.equal(element, expected_array[index]);
                assert.equal(binary_heap, heap);
                assert.equal(must_stop, false);
                if (element > -1) {
                    must_stop = true;
                    return false;
                }
                return true;
            });
            assert.equal(must_stop, true);
        });
    });

    describe('forEach', function () {
        it('should iterate over all the elements in order', function () {
            var heap = new MaxBinaryHeap();
            var expected_array = [9, 5, 3, 0, -2, -8];

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            heap.forEach(function (element, index, binary_heap) {
                assert.equal(element, expected_array[index]);
                assert.equal(binary_heap, heap);
                if (index > 5) {
                    assert(false);
                }
            });
        });
    });

    describe('heapify', function () {
        it('should transform an array into a min binary heap', function () {
            var heap = new MaxBinaryHeap();
            heap.heapify([5, 2, 3, 1, 4, 7, 6]);

            for (var i = 1; i < 3; i += 1) {
                assert(heap._elements[i] > heap._elements[2 * i]);
                assert(heap._elements[i] > heap._elements[2 * i + 1]);
            }
        });
    });

    describe('insert | push', function () {
        it('should insert an element', function () {
            var heap = new MaxBinaryHeap();

            heap.insert(1);

            assert.equal(heap._elements[1], 1);

            heap.push(4);

            assert.equal(heap._elements[1], 4);
            assert.equal(heap._elements[2], 1);

            heap.push(-1);

            assert.equal(heap._elements[1], 4);
            assert.equal(heap._elements[2], 1);
            assert.equal(heap._elements[3], -1);

            heap.push(2);

            assert.equal(heap._elements[1], 4);
            assert.equal(heap._elements[2], 2);
            assert.equal(heap._elements[3], -1);
            assert.equal(heap._elements[4], 1);
        });
    });

    describe('peek', function () {
        it('should return the maximum element without removing it', function () {
            var heap = new MaxBinaryHeap();

            heap.push(1);

            assert.equal(heap.peek(), 1);

            heap.push(5);

            assert.equal(heap.peek(), 5);

            heap.push(-2);

            assert.equal(heap.peek(), 5);

            heap.push(6);

            assert.equal(heap.peek(), 6);

            heap.pop();

            assert.equal(heap.peek(), 5);

            heap.pop();

            assert.equal(heap.peek(), 1);

            heap.pop();

            assert.equal(heap.peek(), -2);

            heap.pop();

            assert.equal(heap.peek(), undefined);
        });
    });

    describe('pop', function () {

        it('should remove an element from the heap', function () {
            var heap = new MaxBinaryHeap();

            heap.push(3);
            assert.equal(heap.pop(), 3);
            assert.equal(heap.size(), 0);
            assert.equal(heap._elements[1], undefined);
            assert.equal(heap._elements[0], null);
        });

        it('should return the maximum element while removing it', function () {
            var heap = new MaxBinaryHeap();

            heap.push(1);
            heap.push(4);
            heap.push(-1);
            heap.push(2);

            assert.equal(heap.pop(), 4);
            assert.equal(heap.pop(), 2);
            assert.equal(heap.pop(), 1);
            assert.equal(heap.pop(), -1);
            assert.equal(heap.pop(), undefined);

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);

            assert.equal(heap.pop(), 9);
            assert.equal(heap.pop(), 5);
            assert.equal(heap.pop(), 3);
            assert.equal(heap.pop(), 0);
            assert.equal(heap.pop(), -2);
            assert.equal(heap.pop(), -8);
            assert.equal(heap.pop(), undefined);

            heap.insert(3);
            heap.insert(-2);
            heap.insert(5);
            heap.insert(-8);
            heap.insert(9);
            heap.insert(0);
            heap.insert(-1);

            assert.equal(heap.pop(), 9);
            assert.equal(heap.pop(), 5);
            assert.equal(heap.pop(), 3);
            assert.equal(heap.pop(), 0);
            assert.equal(heap.pop(), -1);
            assert.equal(heap.pop(), -2);
            assert.equal(heap.pop(), -8);
            assert.equal(heap.pop(), undefined);
        });

        it('should return undefined if the heap is empty', function () {
            var heap = new MaxBinaryHeap();

            assert.equal(heap.pop(), undefined);

            heap.push(1);
            heap.pop();

            assert.equal(heap.pop(), undefined);
        });
    });

    describe('_shiftDown', function () {
        it('should shift the root', function () {
            var heap = new MaxBinaryHeap();
            heap._elements = [null, 2, 1, 3];
            heap._length = 3;
            heap._shiftDown();

            assert.equal(heap._elements[1], 3);
            assert.equal(heap._elements[2], 1);
            assert.equal(heap._elements[3], 2);

            heap._elements = [null, 2, 3, 1];
            heap._shiftDown();

            assert.equal(heap._elements[1], 3);
            assert.equal(heap._elements[2], 2);
            assert.equal(heap._elements[3], 1);
        });

        it('should shift down an element', function () {
            var heap = new MaxBinaryHeap();
            heap._elements = [null, 7, 6, 1, 4, 3, 2, 5];
            heap._length = 7;
            heap._shiftDown(3);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], 8 - i);
            }
        });

        it('should not shift down an element if it is correct', function () {
            var heap = new MaxBinaryHeap();
            heap._elements = [null, 7, 6, 5, 4, 3, 2, 1];
            heap._length = 7;
            heap._shiftDown(4);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], 8 - i);
            }
        });
    });

    describe('_shiftUp', function () {
        it('should shift the last element', function () {
            var heap = new MaxBinaryHeap();
            heap._elements = [null, 2, 3, 1];
            heap._length = 3;
            heap._shiftUp();

            assert.equal(heap._elements[1], 2);
            assert.equal(heap._elements[2], 3);
            assert.equal(heap._elements[3], 1);
        });

        it('should shift up an element', function () {
            var heap = new MaxBinaryHeap();
            heap._elements = [null, 7, 6, 1, 4, 3, 2, 5];
            heap._length = 7;
            heap._shiftUp(7);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], 8 - i);
            }
        });

        it('should not shift up an element if it is correct', function () {
            var heap = new MaxBinaryHeap();
            heap._elements = [null, 7, 6, 5, 4, 3, 2, 1];
            heap._length = 7;
            heap._shiftUp(4);

            for (var i = 1; i < heap._length; i += 1) {
                assert.equal(heap._elements[i], 8 - i);
            }
        });
    });

    describe('toArray', function () {
        it('should return the converted heap in an ordered array format', function () {
            var heap = new MaxBinaryHeap();
            var array;

            heap.push(1);
            heap.push(4);
            heap.push(-1);
            heap.push(2);

            array = heap.toArray();

            assert.equal(array[0], 4);
            assert.equal(array[1], 2);
            assert.equal(array[2], 1);
            assert.equal(array[3], -1);
        });

        it('should return an empty array if the heap is empty', function () {
            var heap = new MaxBinaryHeap();

            assert.equal(heap.toArray().length, 0);
        });
    });
});