'use strict';

jest.autoMockOff();

var fs = require('fs'),
    babel = require('babel-core'),
    transpileNewTarget = require('../index');

describe('models.js', function () {
    it('should pass', function () {

        var s = babel.transformFileSync(__dirname + '/models.js.input', {
            presets: ['es2015', 'stage-1'],
            plugins: [transpileNewTarget]
        });

        expect(s.code).not.toContain('new.target');
        expect(s.code.match(/\bthis\.constructor\b/g).length).toEqual(2);
        expect(eval(s.code)).toEqual({title: 'Nice day'})

    })
});

describe('chrome-sample.js', function () {
    it('should pass', function () {

        var s = babel.transformFileSync(__dirname + '/chrome-sample.js.input', {
            presets: ['es2015', 'stage-1'],
            plugins: [transpileNewTarget]
        });

        expect(s.code.match(/\bnew\.target\b/g).length).toEqual(3);
        expect(s.code.match(/\bthis\.constructor\b/g).length).toEqual(2);
        expect(eval(s.code)).toEqual([
            'Hello from Parent! I was constructed via new Parent()',
            'Hello from Parent! I was constructed via new FirstChild()',
            'Hello from Parent! I was constructed via new SecondChild()'
        ]);

    })
});
