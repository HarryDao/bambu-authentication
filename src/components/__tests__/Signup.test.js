import React from 'react';
import { mount } from 'enzyme';
import { Root } from '../Root';
import Signup from '../Signup';

describe('SignUp', function() {
    let wrapper;

    afterEach(function() {
        if (wrapper) {
            wrapper.unmount();
        }
    });

    it('should have 2 inputs and 1 button', function() {
        wrapper = mount(
            <Root>
                <Signup/>
            </Root>
        );
        expect(wrapper.find('input').length).toEqual(2);
        expect(wrapper.find('button').length).toEqual(1);
    });

    it('should render success on success', function() {
        wrapper = mount(
            <Root initial={{ auth: { isSignedUp: true } }}>
                <Signup/>
            </Root>
        );
        expect(wrapper.find('.success').length).toEqual(1);
    });

    it('can accept input for email and password', function() {
        wrapper = mount(
            <Root>
                <Signup/>
            </Root>
        );
        const email = 'email';
        const password = 'password';
        wrapper.find('input').first().simulate('change', {
            target: { value: email }
        });
        wrapper.find('input').at(1).simulate('change', {
            target: { value: password }
        });
        wrapper.update();

        expect(wrapper.find('input').first().prop('value')).toEqual(email);
        expect(wrapper.find('input').at(1).prop('value')).toEqual(password);
    });

    it('can click on submit', function() {
        wrapper = mount(
            <Root>
                <Signup/>
            </Root>
        );
        const email = 'email';
        const password = 'password';
        const fn = jest.fn();
        wrapper.find('input').first().simulate('change', {
            target: { value: email }
        });
        wrapper.find('input').at(1).simulate('change', {
            target: { value: password }
        });   
        wrapper.find('button').simulate('click', {
            preventDefault: fn
        });
        wrapper.update();
        expect(fn.mock.calls).toEqual([[]]);
    });
});