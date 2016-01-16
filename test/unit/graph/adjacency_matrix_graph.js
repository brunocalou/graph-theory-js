var testGraph = require('./testGraph');
var adjacency_matrix = require('../../../index').Graph.DataStructure.ADJACENCY_MATRIX;
var Graph = require('../../../index').Graph.AdjacencyMatrixGraph;
var assert = require('assert');
var util = require('../../../index').Util.Util;

describe('Adjacency Matrix Graph', function () {
    testGraph(adjacency_matrix)();

    describe('addVertex', function () {
        it('should refactor the matrix', function () {
            var g = new Graph();

            g.addVertex(1);

            assert.equal(g.data[0], undefined);
            assert.equal(g.data[1].length, 2);

            g.addVertex(3);

            assert.equal(g.data[0], undefined);
            assert.equal(g.data[2], undefined);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[3].length, 4);
        });
    });

    describe('refactor array', function () {

        it('should add an unsigned 8 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_8 - 1);

            assert.equal(g.ArrayType, Uint8Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.UINT_8);
            assert.equal(g.array_is_signed, false);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 8 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 3, -util.MaxNumberSize.UINT_8 + 1);

            assert.equal(g.ArrayType, Int8Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_8);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
        });

        it('should add an unsigned 16 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_8 + 1);

            assert.equal(g.ArrayType, Uint16Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.UINT_16);
            assert.equal(g.array_is_signed, false);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 16 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.INT_8 - 1);

            assert.equal(g.ArrayType, Int16Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_16);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add an unsigned 32 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_16 + 1);

            assert.equal(g.ArrayType, Uint32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.UINT_32);
            assert.equal(g.array_is_signed, false);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 32 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.INT_16 - 1);

            assert.equal(g.ArrayType, Int32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add an unsigned 64 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_32 + 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, Infinity);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 64 bit integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.INT_32 - 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, Infinity);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add an unsigned 8 bit non-integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_8 - 0.1);

            assert.equal(g.ArrayType, Float32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 8 bit non-integer negative edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.UINT_8 + 0.1);

            assert.equal(g.ArrayType, Float32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add an unsigned 16 bit non-integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_16 - 0.1);

            assert.equal(g.ArrayType, Float32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 16 bit non-integer negative edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.UINT_16 + 0.1);

            assert.equal(g.ArrayType, Float32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });


        it('should add an unsigned 32 bit non-integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_32 - 0.1);

            assert.equal(g.ArrayType, Float32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 32 bit non-integer negative edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.UINT_32 + 0.1);

            assert.equal(g.ArrayType, Float32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });


        it('should add an unsigned 64 bit non-integer edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_32 + 0.1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should add a signed 64 bit non-integer negative edge', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.UINT_32 - 0.1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);
        });

        it('should change the array type in order while adding unsigned numbers', function () {
            var g = new Graph();

            g.addEdge(1, 2, util.MaxNumberSize.UINT_8 - 1);

            assert.equal(g.ArrayType, Uint8Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.UINT_8);
            assert.equal(g.array_is_signed, false);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);

            g.addEdge(1, 3, util.MaxNumberSize.UINT_8 + 1);

            assert.equal(g.ArrayType, Uint16Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.UINT_16);
            assert.equal(g.array_is_signed, false);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[2].length, 4);
            assert.equal(g.data[3].length, 4);

            g.addEdge(2, 3, util.MaxNumberSize.UINT_16 + 1);

            assert.equal(g.ArrayType, Uint32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.UINT_32);
            assert.equal(g.array_is_signed, false);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[2].length, 4);
            assert.equal(g.data[3].length, 4);

            g.addEdge(1, 4, util.MaxNumberSize.UINT_32 + 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 5);
            assert.equal(g.data[2].length, 5);
            assert.equal(g.data[3].length, 5);
            assert.equal(g.data[4].length, 5);
        });

        it('should change the array type in order while adding signed numbers', function () {
            var g = new Graph();

            g.addEdge(1, 2, -util.MaxNumberSize.UINT_8 + 1);

            assert.equal(g.ArrayType, Int8Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_8);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);

            g.addEdge(1, 3, -util.MaxNumberSize.INT_8 - 1);

            assert.equal(g.ArrayType, Int16Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_16);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[2].length, 4);
            assert.equal(g.data[3].length, 4);

            g.addEdge(2, 3, -util.MaxNumberSize.INT_16 - 1);

            assert.equal(g.ArrayType, Int32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[2].length, 4);
            assert.equal(g.data[3].length, 4);

            g.addEdge(1, 4, -util.MaxNumberSize.UINT_32 - 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 5);
            assert.equal(g.data[2].length, 5);
            assert.equal(g.data[3].length, 5);
            assert.equal(g.data[4].length, 5);
        });

        it('should not change the array type to an unsuported one', function () {
            var g = new Graph();
            
            //UINT 8
            g.addEdge(1, 2, -util.MaxNumberSize.UINT_8 + 1);
            g.addEdge(1, 2, 3);

            assert.equal(g.ArrayType, Int8Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_8);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 3);
            assert.equal(g.data[2].length, 3);

            //INT 8
            g.addEdge(1, 3, -util.MaxNumberSize.INT_8 - 1);
            g.addEdge(1, 2, 3);

            assert.equal(g.ArrayType, Int16Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_16);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[2].length, 4);
            assert.equal(g.data[3].length, 4);

            //INT 16
            g.addEdge(2, 3, -util.MaxNumberSize.INT_16 - 1);
            g.addEdge(1, 3, -util.MaxNumberSize.INT_8 - 1);

            assert.equal(g.ArrayType, Int32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);

            g.addEdge(1, 2, 3);

            assert.equal(g.ArrayType, Int32Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.INT_32);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, true);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[2].length, 4);
            assert.equal(g.data[3].length, 4);

            //UINT 32
            g.addEdge(1, 4, -util.MaxNumberSize.UINT_32 - 1);
            g.addEdge(2, 3, -util.MaxNumberSize.INT_16 - 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);

            g.addEdge(1, 3, -util.MaxNumberSize.INT_8 - 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);

            g.addEdge(1, 2, 3);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
            assert.equal(g.array_must_be_refactored, false);
            assert.equal(g.data[1].length, 5);
            assert.equal(g.data[2].length, 5);
            assert.equal(g.data[3].length, 5);
            assert.equal(g.data[4].length, 5);
            
            //FLOAT 64
            g.addEdge(1, 2, -util.MaxNumberSize.UINT_8 + 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);

            g.addEdge(1, 3, -util.MaxNumberSize.INT_8 - 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);

            g.addEdge(2, 3, -util.MaxNumberSize.INT_16 - 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);

            g.addEdge(1, 4, -util.MaxNumberSize.UINT_32 - 1);

            assert.equal(g.ArrayType, Float64Array);
            assert.equal(g.array_max_element_size, util.MaxNumberSize.FLOAT_64);
            assert.equal(g.array_is_signed, true);
            assert.equal(g.array_is_integer, false);
        });
    });
});