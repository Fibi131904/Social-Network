import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateUserStatus={() => { }} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('it-kamasutra.com');
    });

    test('after creation <span> shold dont be disablyed', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateUserStatus={() => { }} />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull();
    });
    test('after creation <span> shold contains correct status', () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" updateUserStatus={() => { }} />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.innerText).toBe('it-kamasutra.com');
    });
});
