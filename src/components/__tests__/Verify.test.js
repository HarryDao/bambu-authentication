import React from 'react';
import { mount } from 'enzyme';
import { Root } from '../Root';
import Verify from '../Verify';

describe('Verify', function() {
    let wrapper;

    it('show loading  when neccessary', function() {
        wrapper = mount(
            <Root
                initial={{
                    auth: {
                        verifyLoading: true,
                    }
                }}
            >
                <Verify
                    location={{
                        search: ''
                    }}
                />
            </Root>
        );
        expect(wrapper.find('.loading').length).toEqual(1);
    });

    it('redirect if verified', function() {
        const history = [];
        wrapper = mount(
            <Root
                initial={{
                    auth: { isVerified: true }
                }}
            >
                <Verify
                    location={{
                        search: ''
                    }}
                    history={history} 
                />
            </Root>
        );
        expect(history).toEqual(['/signin']);
    });

});