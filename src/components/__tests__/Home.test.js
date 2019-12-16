import React from 'react';
import { mount } from 'enzyme';
import { Root } from '../Root';
import Home from '../Home';

describe('<Home />', function() {
    let wrapper;
    afterEach(function() {
        if (wrapper) {
            wrapper.unmount();
        }
    })

    it('should renders 2 paragraphs', function() {
        wrapper = mount(
            <Root
                initial={{
                    auth: {token: 'token'}
                }}
            >
                <Home/>
            </Root>
        );

        expect(wrapper.find('p').length).toEqual(2);
    });

    it('should redirect if not authenticated', function() {
        let history = [];
        wrapper = mount(
            <Root>
                <Home history={history}/>
            </Root>
        );
        expect(history).toEqual(['/signin']);
    });
});