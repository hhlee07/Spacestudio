import { action, makeObservable, observable } from "mobx";

export class ControlStore {
    rootStore;

    controls = null;

    constructor(root) {
        makeObservable(this, {
            controls : observable,
        })

        this.rootStore = root;

        //this.controls = null;

    }

}
