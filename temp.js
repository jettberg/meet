'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _testingLibraryReact = require('@testing-library/react');

require('@testing-library/jest-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('../App');

var _App2 = _interopRequireDefault(_App);

describe('<app /> component', function () {

    test('renders list of events', function () {
        var AppDOM = (0, _testingLibraryReact.render)(_react2['default'].createElement(_App2['default'], null)).container.firstChild;
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });
});
