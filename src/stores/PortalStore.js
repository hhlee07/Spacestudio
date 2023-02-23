import { action, makeObservable, observable } from "mobx";

export class PortalStore {
    rootStore;

    portal = null;

    constructor(root) {
        makeObservable(this, {
            portal: observable,
            setPortal: action
        })

        this.rootStore = root;
    }

    setPortal = (name) => {
        this.portal = name;
    }
}