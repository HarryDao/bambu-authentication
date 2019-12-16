import React from 'react';
import { mount } from 'enzyme';
import { Root } from '../Root';
import Signin from '../Signin';

describe('Signin', function() {
    let wrapper;

    it('should redirect if token is found', function() {
        const history = [];
        wrapper = mount(
            <Root initial={{
                auth: { token: '111' }
            }}>
                <Signin history={history}/>
            </Root>
        );
        
        expect(history).toEqual(['/']);
    });

    it('render correctly if no token is found', function() {
        wrapper = mount(
            <Root>
                <Signin history={[]}/>
            </Root>
        );
        expect(wrapper.find('input').length).toEqual(2);
        expect(wrapper.find('button').length).toEqual(1);
    });

    describe('upon user input', function() {
        const email = 'email@email.email';
        const password = 'password';
        beforeEach(function() {
            wrapper = mount(
                <Root>
                    <Signin history={[]}/>
                </Root>
            );
            
        });

        it('can type in into email', function() {
            wrapper.find('input').first().simulate('change', {
                target: { value: email }
            });
            wrapper.update();
            expect(wrapper.find('input').first().prop('value')).toEqual(email);
        });

        it('can type in into password', function() {
            wrapper.find('input').at(1).simulate('change', {
                target: { value: password }
            });
            wrapper.update();
            expect(wrapper.find('input').at(1).prop('value')).toEqual(password);
        });

        it('can click on submit', function() {
            const fn = jest.fn();
            wrapper.find('input').first().simulate('change', {
                target: { value: '' }
            });
            wrapper.find('input').at(1).simulate('change', {
                target: { value: password }
            });
            wrapper.find('button').simulate('click', {
                preventDefault: fn
            });
            wrapper.update();
            expect(fn.mock.calls).toEqual([[]]);
        })
    });
});